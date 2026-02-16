import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SignOutButton } from '@/components/sign-out-button';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen">
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/dashboard" className="group flex items-center gap-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-400 group-hover:shadow-[0_0_10px_rgba(250,244,61,0.5)] transition-all" />
                  <span className="text-2xl font-black tracking-tighter text-white">
                    MEET<span className="text-yellow-400">&</span>BRIEF
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-8">
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  DASHBOARD
                </Link>
                <Link
                  href="/dashboard/briefs/new"
                  className="text-sm font-semibold text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  NEW BRIEF
                </Link>
                {session.user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="text-sm font-semibold text-yellow-400 cursor-pointer"
                  >
                    ADMIN
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-sm font-bold text-black">
                  {session.user.email?.[0].toUpperCase()}
                </div>
                <span className="text-sm text-gray-300">
                  {session.user.email}
                </span>
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>
      <main className="relative z-10">{children}</main>
    </div>
  );
}
