import puppeteer from 'puppeteer';

export async function scrapeCompanyWebsite(
  companyName: string
): Promise<string> {
  let browser;
  try {
    // Launch browser in headless mode
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Try to search for the company's website
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      companyName + ' official website'
    )}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Get the first search result link
    const firstLink = await page.$eval(
      'div.g a',
      (el) => (el as HTMLAnchorElement).href
    );

    if (!firstLink) {
      return `Could not find official website for ${companyName}`;
    }

    // Visit the company website
    await page.goto(firstLink, { waitUntil: 'networkidle2', timeout: 30000 });

    // Extract text content from the page
    const content = await page.evaluate(() => {
      // Remove scripts, styles, and other non-content elements
      const scripts = document.querySelectorAll(
        'script, style, noscript, iframe'
      );
      scripts.forEach((el) => el.remove());

      // Get text from main content areas
      const body = document.body;
      return body.innerText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join('\n')
        .substring(0, 5000); // Limit to first 5000 chars
    });

    // Try to find "About" page
    try {
      const aboutLinks = await page.$$eval('a', (links) =>
        links
          .filter(
            (link) =>
              link.textContent?.toLowerCase().includes('about') ||
              link.getAttribute('href')?.toLowerCase().includes('about')
          )
          .map((link) => (link as HTMLAnchorElement).href)
      );

      if (aboutLinks.length > 0) {
        await page.goto(aboutLinks[0], {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });
        const aboutContent = await page.evaluate(() => {
          const scripts = document.querySelectorAll(
            'script, style, noscript, iframe'
          );
          scripts.forEach((el) => el.remove());
          return document.body.innerText
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .join('\n')
            .substring(0, 3000);
        });

        return `Company Website:\n${content}\n\nAbout Page:\n${aboutContent}`;
      }
    } catch (e) {
      // If about page fails, just return main content
    }

    return `Company Website:\n${content}`;
  } catch (error) {
    console.error('Error scraping website:', error);
    return `Unable to scrape ${companyName} website. Please proceed with available information.`;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
