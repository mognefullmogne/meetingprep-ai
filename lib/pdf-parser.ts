export async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    // Use require for CommonJS compatibility in API route
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (error) {
    console.error('PDF parsing failed (continuing without PDF content):', error);
    // Return empty string instead of throwing - let the AI work without the PDF content
    return '';
  }
}
