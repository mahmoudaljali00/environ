# ENVIRON - Integrated Engineering Solutions

A modern, bilingual (English/Arabic) corporate website for ENVIRON, an engineering company specializing in MEP, energy solutions, and contracting services.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui, Radix UI
- **Animations:** Framer Motion
- **3D Graphics:** React Three Fiber, Three.js
- **File Upload:** Cloudinary
- **Analytics:** Vercel Analytics

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Variables

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# NextAuth.js Authentication
NEXTAUTH_SECRET="your-secret-key-min-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (Image Upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Optional Variables

```env
# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL="https://environ.sd"

# Node Environment
NODE_ENV="development"
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string from Neon |
| `NEXTAUTH_SECRET` | Yes | Secret key for NextAuth.js session encryption (min 32 chars) |
| `NEXTAUTH_URL` | Yes | Base URL of your application |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name for image uploads |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL for SEO metadata |
| `NODE_ENV` | No | Environment mode (development/production) |

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

### 3. Set Up Database

Generate Prisma client and push schema to database:

```bash
pnpm prisma generate
pnpm prisma db push
```

### 4. Seed Database (Optional)

Run the SQL scripts in the `/scripts` folder to seed initial data.

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard pages
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── services/           # Services pages
│   ├── products/           # Products pages
│   ├── projects/           # Projects pages
│   ├── blog/               # Blog pages
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   └── home/               # Homepage components
├── lib/                    # Utility functions
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # NextAuth configuration
│   └── utils.ts            # Helper functions
├── prisma/                 # Database schema
│   └── schema.prisma       # Prisma schema
├── public/                 # Static assets
└── scripts/                # Database scripts
```

## Database Schema

The application uses the following main models:

- **User** - Admin users with authentication
- **Service** - Engineering services offered
- **Product** - Products catalog
- **Project** - Portfolio projects
- **BlogPost** - Blog articles
- **Contact** - Contact form submissions
- **TeamMember** - Team members
- **Client** - Client logos/info
- **Testimonial** - Customer testimonials
- **Stat** - Homepage statistics (editable)
- **SiteSettings** - Global site settings

## Admin Panel

Access the admin panel at `/admin` with the following features:

- Dashboard with analytics
- Services management (CRUD)
- Products management (CRUD)
- Projects management (CRUD)
- Blog posts management (CRUD)
- Team members management
- Clients management
- Testimonials management
- Stats management (homepage numbers)
- Contact submissions
- Site settings (company info, SEO, social links, theme color)

## Features

- Bilingual support (English/Arabic) with RTL
- Dark/Light theme with customizable primary color
- Responsive design
- SEO optimized
- Image optimization with Cloudinary
- Animated UI with Framer Motion
- 3D elements with React Three Fiber
- Glass morphism design
- WhatsApp integration
- PDF company profile download

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database Setup on Vercel

1. Create a Neon database
2. Add `DATABASE_URL` to Vercel environment variables
3. Run `prisma db push` or use Vercel's build command

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm prisma generate` | Generate Prisma client |
| `pnpm prisma db push` | Push schema to database |
| `pnpm prisma studio` | Open Prisma Studio |

## License

Private - ENVIRON Engineering Solutions
