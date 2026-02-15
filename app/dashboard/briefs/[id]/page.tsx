import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BriefDisplay } from '@/components/brief-display';
import { DeleteBriefButton } from '@/components/delete-brief-button';
import { ArrowLeft } from 'lucide-react';

export default async function BriefPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const { id } = await params;

  const brief = await db.brief.findUnique({
    where: { id },
  });

  if (!brief || brief.userId !== session.user.id) {
    redirect('/dashboard');
  }

  const meetingTypeLabels = {
    JOB_INTERVIEW: 'Job Interview',
    SALES_CALL: 'Sales Call',
    HR_REVIEW: 'HR Review',
    NETWORKING: 'Networking',
    SOCIAL_EVENT: 'Social Event',
    GENERIC: 'Meeting',
  };

  const formattedDate = new Date(brief.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">
                  {meetingTypeLabels[brief.meetingType]}
                </Badge>
                <span className="text-sm text-gray-500">{formattedDate}</span>
              </div>
              <CardTitle className="text-2xl">{brief.title}</CardTitle>
            </div>
            <DeleteBriefButton briefId={brief.id} />
          </div>
        </CardHeader>
        <CardContent>
          <BriefDisplay content={brief.content} />
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center gap-4">
        <Link href="/dashboard/briefs/new">
          <Button>Create Another Brief</Button>
        </Link>
      </div>
    </div>
  );
}
