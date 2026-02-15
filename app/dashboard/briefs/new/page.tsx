import { MeetingTypeCard } from '@/components/meeting-type-card';
import { Briefcase, Phone } from 'lucide-react';

const meetingTypes = [
  {
    type: 'job-interview',
    title: 'Job Interview',
    description: 'Prepare for your upcoming job interview with company research and smart questions',
    icon: Briefcase,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
  },
  {
    type: 'sales-call',
    title: 'Sales Call',
    description: 'Get ready for your sales call with prospect insights and talk tracks',
    icon: Phone,
    color: 'bg-green-50 hover:bg-green-100 border-green-200',
  },
];

export default function NewBriefPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Create a New Brief
        </h1>
        <p className="mt-2 text-gray-600">
          Select the type of meeting you're preparing for
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {meetingTypes.map((meetingType) => (
          <MeetingTypeCard key={meetingType.type} {...meetingType} />
        ))}
      </div>
    </div>
  );
}
