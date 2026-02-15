'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Geometric decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-20 top-20 h-32 w-32 border border-white/10" />
        <div className="absolute right-40 top-40 h-24 w-24 rotate-45 border border-yellow-400/20" />
        <div className="absolute bottom-32 left-1/4 h-40 w-40 border border-white/5" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="space-y-12">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
              AI-Powered Meeting Prep
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent" />
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-7xl font-black leading-none tracking-tighter text-white">
              MEET
              <br />
              <span className="text-yellow-400">&</span> BRIEF
            </h1>
            <p className="max-w-xl text-xl text-gray-400">
              Never walk into a meeting unprepared. Generate intelligent briefs powered by AI in seconds.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              size="lg"
              className="group relative overflow-hidden border border-yellow-400 bg-yellow-400 px-8 py-6 text-lg font-bold text-black hover:bg-yellow-300 hover:shadow-[0_0_30px_rgba(250,244,61,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </span>
            </Button>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-yellow-400" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-yellow-400" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-yellow-400" />
                <span>2 min setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom geometric element */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 opacity-20">
        <div className="h-full w-full border border-white/20" />
      </div>
    </div>
  );
}
