import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MeetingTypeCardProps {
  type: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export function MeetingTypeCard({
  type,
  title,
  description,
  icon: Icon,
  color,
}: MeetingTypeCardProps) {
  return (
    <Link href={`/dashboard/briefs/new/${type}`}>
      <Card
        className={cn(
          'cursor-pointer transition-all hover:shadow-lg',
          color
        )}
      >
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
