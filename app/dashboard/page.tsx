import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BriefCard } from '@/components/brief-card';
import { PlusCircle } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const briefs = await db.brief.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>
        <Link href="/dashboard/briefs/new">
          <Button size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Brief
          </Button>
        </Link>
      </div>

      {briefs.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No briefs yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating your first meeting brief
          </p>
          <Link href="/dashboard/briefs/new">
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Your First Brief
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Recent Briefs
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {briefs.map((brief) => (
              <BriefCard key={brief.id} brief={brief} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
