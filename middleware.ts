import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/briefs/:path*',
    '/admin/:path*',
    '/api/briefs/:path*',
    '/api/admin/:path*',
  ],
};
