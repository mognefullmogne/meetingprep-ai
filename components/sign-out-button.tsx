'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: '/login' })}
      variant="outline"
      size="sm"
    >
      Sign Out
    </Button>
  );
}
