import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { parsePDF } from '@/lib/pdf-parser';
import { scrapeCompanyWebsite } from '@/lib/scraper';
import {
  generateJobInterviewBrief,
  generateSalesCallBrief,
} from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const meetingType = formData.get('meetingType') as string;
    const dataString = formData.get('data') as string;
    const resumeFile = formData.get('resume') as File | null;
    const jobDescFile = formData.get('jobDescription') as File | null;

    if (!meetingType || !dataString) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = JSON.parse(dataString);

    // Parse resume if file is provided (for job interviews)
    let resumeText = '';
    if (resumeFile && meetingType === 'job-interview') {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      resumeText = await parsePDF(buffer);
    }

    // Parse job description PDF if provided
    let jobPostingText = data.jobPosting || '';
    if (jobDescFile && meetingType === 'job-interview') {
      const buffer = Buffer.from(await jobDescFile.arrayBuffer());
      const pdfText = await parsePDF(buffer);
      jobPostingText = pdfText || jobPostingText;
    }

    // Scrape company website
    const companyName = data.companyName;
    const researchData = await scrapeCompanyWebsite(companyName);

    // Generate brief based on meeting type
    let content: string;
    let title: string;

    if (meetingType === 'job-interview') {
      content = await generateJobInterviewBrief({
        companyName: data.companyName,
        role: data.role,
        resumeText: resumeText || 'No resume provided',
        jobPosting: jobPostingText || 'No job posting provided',
        format: data.format,
        concerns: data.concerns || 'None specified',
        researchData,
      });
      title = `${data.role} at ${data.companyName}`;
    } else if (meetingType === 'sales-call') {
      content = await generateSalesCallBrief({
        companyName: data.companyName,
        contactName: data.contactName,
        contactRole: data.contactRole,
        product: data.product,
        dealStage: data.dealStage,
        painPoints: data.painPoints || 'Not specified',
        competitors: data.competitors || 'Not specified',
        researchData,
      });
      title = `Sales Call: ${data.companyName} - ${data.contactName}`;
    } else {
      return NextResponse.json(
        { error: 'Invalid meeting type' },
        { status: 400 }
      );
    }

    // Save to database
    const brief = await db.brief.create({
      data: {
        userId: session.user.id,
        meetingType:
          meetingType === 'job-interview' ? 'JOB_INTERVIEW' : 'SALES_CALL',
        title,
        inputs: data,
        content,
      },
    });

    return NextResponse.json(brief);
  } catch (error) {
    console.error('Error creating brief:', error);
    return NextResponse.json(
      { error: 'Failed to create brief' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const briefs = await db.brief.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(briefs);
  } catch (error) {
    console.error('Error fetching briefs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch briefs' },
      { status: 500 }
    );
  }
}
