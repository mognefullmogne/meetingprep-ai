import { Brief } from '@prisma/client';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Phone, Users, Calendar } from 'lucide-react';

const meetingTypeConfig = {
  JOB_INTERVIEW: {
    label: 'Job Interview',
    icon: Briefcase,
    color: 'bg-blue-100 text-blue-800',
  },
  SALES_CALL: {
    label: 'Sales Call',
    icon: Phone,
    color: 'bg-green-100 text-green-800',
  },
  HR_REVIEW: {
    label: 'HR Review',
    icon: Users,
    color: 'bg-purple-100 text-purple-800',
  },
  NETWORKING: {
    label: 'Networking',
    icon: Users,
    color: 'bg-yellow-100 text-yellow-800',
  },
  SOCIAL_EVENT: {
    label: 'Social Event',
    icon: Calendar,
    color: 'bg-pink-100 text-pink-800',
  },
  GENERIC: {
    label: 'Meeting',
    icon: Calendar,
    color: 'bg-gray-100 text-gray-800',
  },
};

interface BriefCardProps {
  brief: Brief;
}

export function BriefCard({ brief }: BriefCardProps) {
  const config = meetingTypeConfig[brief.meetingType];
  const Icon = config.icon;

  const formattedDate = new Date(brief.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/dashboard/briefs/${brief.id}`}>
      <Card className="cursor-pointer transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="mb-2 flex items-center justify-between">
            <Badge className={config.color} variant="secondary">
              <Icon className="mr-1 h-3 w-3" />
              {config.label}
            </Badge>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
          <CardTitle className="line-clamp-2 text-lg">{brief.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {brief.content.substring(0, 100)}...
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
