import OpenAI from 'openai';

// Moonshot API is OpenAI-compatible
const moonshot = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY!,
  baseURL: 'https://api.moonshot.ai/v1', // Global endpoint
});

export async function generateJobInterviewBrief(data: {
  companyName: string;
  role: string;
  resumeText: string;
  jobPosting: string;
  format: string;
  concerns: string;
  researchData: string;
}): Promise<string> {
  const prompt = `You are an expert interview coach. Generate a comprehensive pre-interview brief.

COMPANY: ${data.companyName}
ROLE: ${data.role}
CANDIDATE RESUME: ${data.resumeText}
JOB POSTING: ${data.jobPosting}
INTERVIEW FORMAT: ${data.format}
CANDIDATE CONCERNS: ${data.concerns}

COMPANY RESEARCH DATA:
${data.researchData}

Generate a structured brief with these exact sections:

## EXECUTIVE SUMMARY
- 3 key insights about this opportunity

## COMPANY OVERVIEW
- Size, stage, funding status
- Recent news (last 6 months)
- Culture indicators (from reviews if available)

## ROLE CONTEXT
- What they're looking for
- How candidate's experience matches
- Gap analysis

## 5 SMART QUESTIONS TO ASK
Questions that show deep research and interest

## SALARY EXPECTATIONS
- Range if researchable, otherwise "Research needed"

## TALKING POINTS
3 specific experiences from resume to highlight

## RED FLAGS TO WATCH
Any concerning patterns from research

## LOGISTICS
Dress code, what to bring, timing

Format: Use markdown headers. Be specific, actionable, and concise.`;

  const response = await moonshot.chat.completions.create({
    model: 'moonshot-v1-32k',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content || '';
}

export async function generateSalesCallBrief(data: {
  companyName: string;
  contactName: string;
  contactRole: string;
  product: string;
  dealStage: string;
  painPoints: string;
  competitors: string;
  researchData: string;
}): Promise<string> {
  const prompt = `You are a senior sales strategist. Generate a pre-call brief.

PROSPECT COMPANY: ${data.companyName}
CONTACT: ${data.contactName}, ${data.contactRole}
YOUR PRODUCT: ${data.product}
DEAL STAGE: ${data.dealStage}
KNOWN PAIN POINTS: ${data.painPoints}
COMPETITORS: ${data.competitors}

PROSPECT RESEARCH:
${data.researchData}

Generate structured brief:

## EXECUTIVE SUMMARY
Call objective and key strategic insight

## PROSPECT PROFILE
Company overview and recent initiatives

## CONTACT INTEL
Background and communication style

## SUGGESTED OPENING
Personalized hook (2-3 sentences)

## PAIN POINT HYPOTHESES
3 likely problems they have based on industry/role

## TALK TRACK
Key points to hit in order (bullet list)

## OBJECTION HANDLERS
For likely pushbacks (price, timing, competitors)

## COMPETITOR POSITIONING
How to differentiate from ${data.competitors || 'competitors'}

## NEXT STEPS
What to close for in this call

Format: Actionable, confident tone, specific details only.`;

  const response = await moonshot.chat.completions.create({
    model: 'moonshot-v1-32k',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content || '';
}
