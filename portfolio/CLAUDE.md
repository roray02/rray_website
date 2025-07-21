# Rohan Ray Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Styled Components, and Framer Motion.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **Icons**: SVG icons
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── projects/          # Projects page
│   │   ├── work/              # Work experience page
│   │   ├── education/         # Education page
│   │   └── contact/           # Contact page
│   ├── components/            # Reusable components
│   │   ├── Navigation.tsx     # Navigation bar
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Timeline.tsx      # Timeline component
│   │   ├── ProjectCard.tsx   # Project card component
│   │   └── StyledComponentsRegistry.tsx
│   ├── data/                 # JSON data files
│   │   ├── personal.json     # Personal information
│   │   ├── experiences.json  # Work experiences
│   │   ├── education.json    # Education history
│   │   ├── projects.json     # Projects data
│   │   └── skills.json       # Skills data
│   ├── styles/               # Global styles
│   │   └── globals.css       # CSS variables and global styles
│   └── types/                # TypeScript types
│       └── index.ts          # Shared type definitions
├── public/                   # Static assets
│   ├── resume.pdf           # Downloadable resume
│   └── robots.txt           # SEO robots file
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── CLAUDE.md              # This documentation file
```

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme with CSS variables
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Framer Motion for scroll-based and hover animations
- **Typography**: Inter font with proper font weights and hierarchy
- **Color System**: CSS custom properties for consistent theming
- **Gradient Accents**: Blue gradient for headings and highlights

## 🧩 Components

### Navigation
- Fixed header with backdrop blur
- Mobile hamburger menu
- Active page highlighting
- Smooth scroll animations

### Hero Section
- Prominent name and title display
- Gradient text effects
- Profile placeholder with initials
- Call-to-action buttons

### Timeline
- Animated timeline for experiences and education
- Color-coded badges for different types (work, research, leadership, education)
- Intersection observer for scroll animations
- Responsive card layouts

### Project Cards
- Grid layout with hover animations
- Technology tags
- Featured project highlighting
- External links to GitHub and live demos

### Contact Form
- Functional contact form with validation
- Social media links
- Resume download functionality
- Success/error messaging

## 📊 Data Management

All content is stored in JSON files for easy updates:

- **Personal Info**: Name, title, description, contact details
- **Experiences**: Work history with descriptions and dates
- **Education**: Academic background with coursework and achievements
- **Projects**: Portfolio projects with technologies and links
- **Skills**: Categorized technical skills

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

## 📝 Content Updates

### Adding New Experiences
Edit `src/data/experiences.json`:
```json
{
  "id": "unique-id",
  "company": "Company Name",
  "position": "Job Title",
  "location": "City, State",
  "startDate": "Month Year",
  "endDate": "Month Year",
  "type": "work|research|leadership",
  "description": ["Bullet point 1", "Bullet point 2"]
}
```

### Adding New Projects
Edit `src/data/projects.json`:
```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["Tech1", "Tech2"],
  "category": "bioinformatics|computer-science",
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://example.com",
  "featured": true
}
```

### Updating Personal Information
Edit `src/data/personal.json` to update contact details, bio, etc.

### Adding New Education
Edit `src/data/education.json` following the same pattern as experiences.

## 🎯 Features

- **Smooth Animations**: Scroll-triggered animations using Framer Motion
- **Responsive Design**: Works on desktop, tablet, and mobile
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Optimized images and code splitting
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **TypeScript**: Full type safety throughout the application

## 🔧 Customization

### Colors
Update CSS variables in `src/styles/globals.css`:
```css
:root {
  --primary-bg: #0a0a0a;
  --accent: #3b82f6;
  /* Add more variables */
}
```

### Animations
Modify animation variants in component files or create new ones using Framer Motion.

### Layout
Adjust component layouts using Styled Components for responsive design.

## 📱 Pages

1. **Home**: Hero section + combined timeline of experiences and education
2. **Work**: Detailed work experience timeline
3. **Education**: Academic background and achievements
4. **Projects**: Categorized project showcase with filtering
5. **Contact**: Contact form, social links, and resume download

## 🔗 External Integrations

- **Resume Download**: Static PDF file served from public directory
- **Social Links**: GitHub, LinkedIn, email contact
- **Contact Form**: Frontend-only (backend integration needed for production)

## 📈 Future Enhancements

- Add blog functionality
- Implement backend for contact form
- Add project detail pages
- Include testimonials section
- Add analytics integration
- Implement dark/light mode toggle

## 🛠️ Development Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

This portfolio website provides a solid foundation for showcasing professional experience and projects with modern web technologies and smooth user experience.