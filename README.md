# Meet&Brief

AI-powered meeting preparation briefs for job interviews, sales calls, and more. Never walk into a meeting unprepared again.

## Features

- 🎯 **Job Interview Briefs**: Company research, smart questions, salary insights
- 💼 **Sales Call Briefs**: Prospect intel, talk tracks, objection handlers
- 📄 **Resume Parsing**: Upload your resume for personalized insights
- 🌐 **Web Scraping**: Automatic company research
- 🤖 **AI-Powered**: Uses Moonshot Kimi K2.5 for intelligent brief generation
- 🔐 **Google OAuth**: Secure authentication
- 📱 **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: Next.js 16, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Auth**: NextAuth.js with Google OAuth
- **AI**: Moonshot Kimi K2.5 API
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or Neon account)
- Google OAuth credentials
- Moonshot API key

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**

   Create `.env.local` with:
   ```bash
   # Database
   DATABASE_URL="postgresql://..."

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"

   # AI
   MOONSHOT_API_KEY="sk-..."
   ```

3. **Database Setup**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Make First User Admin

After signing in for the first time:

```bash
npm run seed
```

This promotes your email to ADMIN role.

## Deployment to Vercel

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/meet-and-brief.git
   git push -u origin main
   ```

2. **Deploy to Vercel**

   Visit [vercel.com/new](https://vercel.com/new) and import your repository.

3. **Environment Variables in Vercel**

   Add these in Vercel Project Settings → Environment Variables:

   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://meet-and-brief.vercel.app`)
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `GOOGLE_CLIENT_ID` - From Google Cloud Console
   - `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
   - `MOONSHOT_API_KEY` - From Moonshot platform

4. **Update Google OAuth**

   In Google Cloud Console, add authorized redirect URI:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```

5. **Make First User Admin**

   After signing in to production, use Prisma Studio to update user role:

   ```bash
   npx prisma studio
   ```

   Then manually set the user's role to `ADMIN`.

## Project Structure

```
meetingprep-ai/
├── app/
│   ├── (auth)/login/           # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Dashboard layout with nav
│   │   ├── page.tsx            # Dashboard home
│   │   └── briefs/
│   │       ├── [id]/           # View brief
│   │       └── new/
│   │           ├── page.tsx    # Select meeting type
│   │           └── [type]/     # Dynamic form
│   └── api/briefs/             # Brief CRUD endpoints
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── brief-card.tsx
│   ├── brief-display.tsx       # Markdown renderer
│   ├── delete-brief-button.tsx
│   └── meeting-type-card.tsx
├── lib/
│   ├── ai.ts                   # Moonshot AI client
│   ├── auth.ts                 # NextAuth config
│   ├── db.ts                   # Prisma client
│   ├── pdf-parser.ts           # Resume parsing
│   ├── scraper.ts              # Web scraping
│   └── utils.ts
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Admin setup
└── middleware.ts               # Route protection
```

## How It Works

1. **Sign In**: Authenticate with your Google account
2. **Select Type**: Choose Job Interview or Sales Call
3. **Fill Form**: Enter meeting details, upload resume (optional)
4. **AI Generation**: AI researches the company and generates a comprehensive brief
5. **View & Use**: Read your personalized brief before the meeting

## Features Roadmap

### V1 (Current)
- ✅ Job Interview briefs
- ✅ Sales Call briefs
- ✅ Resume upload & parsing
- ✅ Company research scraping
- ✅ Google OAuth
- ✅ Brief history
- ✅ Delete briefs

### V2 (Future)
- ⏳ Admin panel (user management, invites)
- ⏳ More meeting types (HR Review, Networking, Social Events)
- ⏳ Google Calendar integration
- ⏳ PDF export
- ⏳ Email briefs
- ⏳ Chrome extension

## Troubleshooting

### Common Issues

**"Failed to parse PDF"**
- Ensure PDF is text-based (not scanned image)
- Try a different PDF format
- Check file size (<5MB recommended)

**"Web scraping failed"**
- Some websites block scrapers
- The app will still generate a brief with available data

**"Authentication error"**
- Verify Google OAuth redirect URIs match exactly
- Check environment variables are set correctly
- Ensure `NEXTAUTH_SECRET` is set

**"Database connection failed"**
- Check `DATABASE_URL` is correct
- Ensure Neon database is active

## License

MIT License

## Support

For issues: aimonepitacco@gmail.com

## Credits

Built with Next.js, Prisma, NextAuth.js, shadcn/ui, Moonshot Kimi, and Tailwind CSS.
