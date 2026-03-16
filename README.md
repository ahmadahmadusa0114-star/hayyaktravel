# HAYYAK Travel & Tourism

<div align="center">

**حياك للسياحة والسفر**

A modern, bilingual (Arabic/English) travel agency web application built with Next.js 14, TypeScript, Prisma, and Tailwind CSS.

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Admin Panel](#admin-panel) • [Deployment](#deployment)

</div>

---

## Features

### 🌍 Core Features
- **Bilingual Support**: Full Arabic (RTL) and English (LTR) support
- **Trip Management**: Browse, search, and filter travel packages
- **Booking System**: Complete booking request workflow with email notifications
- **Admin Dashboard**: Full CRUD operations for trips, destinations, blog posts
- **Blog System**: Content management with categories and tags
- **Contact Forms**: Multiple contact points with email notifications
- **WhatsApp Integration**: Direct messaging with pre-filled templates
- **Newsletter**: Email subscription management

### 🎨 Design & UX
- Modern, premium travel brand aesthetics
- Fully responsive (mobile-first design)
- Smooth animations and transitions
- Skeleton loaders and empty states
- RTL/LTR layout switching
- Accessibility (WCAG basics)

### 🔧 Technical Features
- Server-side rendering (SSR) with Next.js App Router
- Type-safe database with Prisma ORM
- Authentication with NextAuth v5
- Email notifications with nodemailer
- SEO optimized (meta tags, sitemap, robots.txt, JSON-LD)
- SQLite database (easily switchable to PostgreSQL)

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with RTL support
- **Database**: Prisma ORM + SQLite (production: PostgreSQL)
- **Authentication**: NextAuth v5 (Auth.js)
- **Email**: Nodemailer
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel (recommended)

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\Users\DELL\OneDrive - Sadan Travel\Desktop\hayyak travel and toruism\hayyak-travel"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file is already created with default values. For production, update these values:
   
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Email Configuration (Optional)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   
   # Company Information
   COMPANY_EMAIL="info@hayyakgroup.com"
   COMPANY_PHONE="+962790000000"
   WHATSAPP_NUMBER="+962790000000"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database**
   ```bash
   npm run db:seed
   ```
   
   This creates:
   - Admin user (email: `admin@hayyakgroup.com`, password: `admin123`)
   - 12 realistic trips across all categories
   - 8 destinations
   - 6 blog posts
   - Site settings

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Admin Panel

### Accessing the Admin Dashboard

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Login with default credentials:
   - **Email**: `admin@hayyakgroup.com`
   - **Password**: `admin123`

### Admin Features

- **Trips Management**: Create, edit, delete, and publish/unpublish trips
- **Destinations Management**: Manage destination pages
- **Booking Requests**: View and manage customer booking requests
  - Update status (New, Contacted, Confirmed, Cancelled)
  - Export to CSV
- **Blog Posts**: Create and manage blog content
- **Site Settings**: Update company information, social links, hero text

### Creating a New Admin User

You can create additional admin users by running a script or directly in the database:

```typescript
// Using Prisma Studio
npm run db:studio

// Or create via seed script (modify prisma/seed.ts)
```

---

## Project Structure

```
hayyak-travel/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalized routes
│   │   ├── page.tsx            # Home page
│   │   ├── trips/              # Trips pages
│   │   ├── destinations/       # Destinations pages
│   │   ├── services/           # Services pages
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog pages
│   │   ├── contact/            # Contact page
│   │   └── policies/           # Policy pages
│   ├── admin/                   # Admin dashboard
│   ├── api/                     # API routes
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── layout/                 # Header, Footer, Navigation
│   ├── ui/                     # Reusable UI components
│   ├── home/                   # Home page sections
│   ├── trips/                  # Trip-related components
│   └── forms/                  # Form components
├── lib/                         # Utilities
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # NextAuth config
│   ├── email.ts               # Email service
│   ├── i18n.ts                # Internationalization
│   ├── whatsapp.ts            # WhatsApp integration
│   └── utils.ts               # Helper functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
└── public/                     # Static assets
```

---

## Database Schema

### Main Models

- **User**: Admin authentication
- **Trip**: Travel packages with bilingual content
- **Destination**: Destination pages
- **BookingRequest**: Customer booking inquiries
- **BlogPost**: Blog articles
- **ContactMessage**: Contact form submissions
- **Newsletter**: Email subscriptions
- **SiteSettings**: Configurable site settings

### Viewing the Database

```bash
npm run db:studio
```

This opens Prisma Studio at [http://localhost:5555](http://localhost:5555)

---

## Email Configuration

### Gmail Setup (Recommended for Testing)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Create a new app password
3. Update `.env`:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-16-char-app-password"
   ```

### Email Fallback

If SMTP is not configured, emails will be logged to the console for development purposes.

---

## Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   - Add all variables from `.env` to Vercel project settings
   - Update `NEXTAUTH_URL` to your production URL
   - Generate a secure `NEXTAUTH_SECRET`:
     ```bash
     openssl rand -base64 32
     ```

4. **Set up Database**
   - For production, use a managed PostgreSQL database:
     - Vercel Postgres
     - Supabase
     - Railway
     - Neon
   
   - Update `DATABASE_URL` in Vercel environment variables
   - Update `prisma/schema.prisma` datasource to `postgresql`
   - Run migrations:
     ```bash
     npx prisma migrate deploy
     ```

5. **Deploy**
   - Vercel will automatically deploy on push to main branch

### Alternative: Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio
```

---

## Features Walkthrough

### 1. Home Page
- Hero section with search bar
- Featured trips carousel
- Popular destinations grid
- Why choose us section
- Testimonials
- Newsletter subscription

### 2. Trips Listing
- Advanced filtering (destination, category, price, duration, amenities)
- Sorting options
- Pagination
- Trip cards with key information

### 3. Trip Details
- Image gallery
- Detailed itinerary (day-by-day)
- Inclusions/exclusions
- Price options (single/double/triple)
- Available dates
- Booking request form
- WhatsApp quick contact

### 4. Booking System
- Complete booking form
- Email confirmation to customer
- Email notification to company
- Admin dashboard for managing requests
- Status tracking

### 5. Admin Dashboard
- Secure authentication
- Full CRUD for all content
- Booking request management
- CSV export functionality
- Site settings management

---

## Customization

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your brand colors
  },
}
```

### Adding New Languages

1. Update `lib/i18n.ts` with new translations
2. Add locale to `locales` array
3. Update components to use new locale

### Modifying Email Templates

Edit `lib/email.ts` to customize email HTML templates.

---

## Troubleshooting

### Database Issues

```bash
# Reset database
rm prisma/dev.db
npx prisma db push
npm run db:seed
```

### Port Already in Use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## Support

For issues or questions:
- Email: info@hayyakgroup.com
- WhatsApp: +962790000000

---

## License

© 2026 HAYYAK Travel & Tourism. All rights reserved.
