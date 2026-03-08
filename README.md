# Personal Portfolio Website

A modern, high-performance portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

![Portfolio Preview](./preview.png)

## ✨ Features

- **Modern Design**: Dark-first, minimal, premium aesthetic inspired by Apple/Vercel
- **Smooth Animations**: Page transitions, scroll animations, and micro-interactions with Framer Motion
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **SEO Ready**: Meta tags, Open Graph, and semantic HTML
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Custom Cursor**: Subtle interactive cursor effect on desktop
- **Contact Form**: Client-side email delivery via EmailJS (no backend needed)
- **Dynamic GitHub Stats**: Real-time GitHub profile and repository data
- **Certificate Viewer**: Hover preview and modal view for certificates

## 🛠️ Tech Stack

- React 18 with Vite
- Tailwind CSS
- Framer Motion
- EmailJS (for contact form)
- React Router
- React Intersection Observer
- React Type Animation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

Your site will be running at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## ⚙️ Configuration

### 1. Personalize Your Content

Edit `src/data/config.js` to update:

- **Personal Information**: Name, title, email, location, website
- **Social Links**: GitHub, LinkedIn, Twitter, Instagram
- **Navigation**: Menu items
- **Hero Content**: Greeting, roles, description
- **About Section**: Bio paragraphs, stats, traits
- **Certificates**: Add your certificates with images
- **Tech Stack**: Technologies you use
- **Projects**: Your portfolio projects
- **Experience**: Work history
- **Profiles**: Coding profiles (LeetCode, HackerRank, etc.)

### 2. Configure EmailJS (Contact Form)

To enable the contact form to send messages to your email:

1. **Sign up at [EmailJS](https://www.emailjs.com/)** (free tier: 200 emails/month)

2. **Add an Email Service:**
   - Go to Email Services → Add New Service
   - Choose Gmail (or your preferred email provider)
   - Connect your email account: `navjotsinghaini718@email.com`
   - Copy the **Service ID** (e.g., `service_xxxxxxx`)

3. **Create an Email Template:**
   - Go to Email Templates → Create New Template
   - Use these variables in your template:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
   - Example template:
     ```
     New message from {{from_name}} ({{from_email}}):
     
     {{message}}
     ```
   - Copy the **Template ID** (e.g., `template_xxxxxxx`)

4. **Get your Public Key:**
   - Go to Account → API Keys
   - Copy your **Public Key** (e.g., `XXXXXXXXXXXXXXX`)

5. **Update `src/data/config.js`:**
```javascript
export const emailjsConfig = {
    serviceId: 'service_xxxxxxx',    // Your Service ID
    templateId: 'template_xxxxxxx',  // Your Template ID
    publicKey: 'XXXXXXXXXXXXXXX',     // Your Public Key
}
```

### 3. Add Your Resume

Place your resume PDF in the `public/` folder as `updated_resume.pdf`, or update the link in `src/components/sections/Hero.jsx`

### 4. Add Certificate Images

Create a `public/certificates/` folder and add your certificate images matching the filenames in `src/data/config.js`:
- `full-stack-web-development.jpg`
- `basic-javascript.jpg`
- etc.

## 🌐 Deployment

### Option 1: Vercel (Recommended ⭐)

**Vercel is the easiest and fastest way to deploy:**

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your portfolio repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Done!** Your site will be live at `https://your-project.vercel.app`

**Custom Domain (Optional):**
- Go to Project Settings → Domains
- Add your custom domain and follow DNS instructions

### Option 2: Netlify

1. **Push code to GitHub** (same as above)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

3. **Configure redirects** (for client-side routing):
   - Create `public/_redirects` file:
     ```
     /* /index.html 200
     ```

4. **Done!** Your site will be live at `https://your-site.netlify.app`

### Option 3: GitHub Pages

1. **Install gh-pages package:**
```bash
npm install --save-dev gh-pages
```

2. **Update `vite.config.js`:**
```javascript
export default defineConfig({
    base: '/portfolio/', // Replace with your repo name
    plugins: [react()],
    // ... rest of config
})
```

3. **Add deploy script to `package.json`:**
```json
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
}
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Source: Deploy from a branch → `gh-pages` branch
   - Save

6. **Access your site:** `https://yourusername.github.io/portfolio/`

### Option 4: Other Platforms

**Cloudflare Pages:**
- Build command: `npm run build`
- Build output: `dist`

**Render:**
- Build command: `npm run build`
- Publish directory: `dist`

**AWS Amplify / Azure Static Web Apps:**
- Build command: `npm run build`
- Output directory: `dist`

## 📋 Pre-Deployment Checklist

- [ ] Update all personal information in `src/data/config.js`
- [ ] Configure EmailJS credentials for contact form
- [ ] Add your resume PDF to `public/`
- [ ] Add certificate images to `public/certificates/`
- [ ] Update social media links
- [ ] Test contact form functionality
- [ ] Test responsive design on mobile
- [ ] Run `npm run build` to verify no errors
- [ ] Test built site with `npm run preview`
- [ ] Update README with your GitHub username
- [ ] Add custom domain (optional)
- [ ] Set up analytics (Google Analytics, Plausible, etc.) - optional

## 🔧 Troubleshooting

**Build fails:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for TypeScript/ESLint errors

**Contact form not working:**
- Verify EmailJS credentials in `config.js`
- Check browser console for errors
- Ensure you're using correct template variables

**Images not loading:**
- Ensure all images are in `public/` folder
- Use paths starting with `/` (e.g., `/certificates/cert.jpg`)

**404 on page refresh (SPA routing):**
- Add proper redirects for your hosting platform
- Netlify: `public/_redirects` file
- Vercel: Handles automatically
- GitHub Pages: May need `404.html` workaround

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Navjot Singh Saini**
- GitHub: [@navjot0079](https://github.com/navjot0079)
- LinkedIn: [navjotfrontend](https://linkedin.com/in/navjotfrontend/)

---

⭐ If you like this project, give it a star on GitHub!
   - Proficiency levels

4. **Projects Section** (`src/components/sections/Projects.jsx`):
   - Project details, descriptions, and links
   - Technologies used

5. **Experience Section** (`src/components/sections/Experience.jsx`):
   - Work history
   - Education

6. **Profiles Section** (`src/components/sections/Profiles.jsx`):
   - Social media links
   - GitHub username for stats

7. **Contact Section** (`src/components/sections/Contact.jsx`):
   - Contact information
   - Social links

### Adding Your Resume

Place your resume PDF in the `public/` directory as `resume.pdf`.

### Email Configuration

For the contact form to work, configure SMTP settings in your `.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

**Note**: For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy

### Railway / Render (Full-Stack)

For deploying with the backend:

1. Push your code to GitHub
2. Create a new project in Railway/Render
3. Connect your repository
4. Set environment variables
5. Deploy

The server will serve both the API and the built frontend in production.

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server/index.js"]
```

Build and run:
```bash
docker build -t portfolio .
docker run -p 5000:5000 --env-file .env portfolio
```

## Project Structure

```
portfolio/
├── public/              # Static assets
│   ├── favicon.svg
│   └── resume.pdf
├── server/              # Backend
│   └── index.js
├── src/
│   ├── components/
│   │   ├── layout/      # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── CustomCursor.jsx
│   │   └── sections/    # Page sections
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Skills.jsx
│   │       ├── Projects.jsx
│   │       ├── Experience.jsx
│   │       ├── Profiles.jsx
│   │       └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Customization

### Colors

The color palette is defined in `tailwind.config.js`. Key colors:

- `primary`: Deep blacks and dark grays
- `accent`: Graphite and charcoal tones
- `slate`: Muted blue-gray accent
- `silver`: Light gray for text
- `text`: Text color variants

### Fonts

Default fonts:
- **Sans**: Inter
- **Mono**: JetBrains Mono

Update in `tailwind.config.js` and `index.css`.

### Animations

Animation configurations are in `tailwind.config.js` under `animation` and `keyframes`. Framer Motion animations are defined in each component.

## Performance Tips

1. **Images**: Optimize and use WebP format
2. **Fonts**: Preload critical fonts
3. **Code Splitting**: Already configured with Vite
4. **Lazy Loading**: Images and sections load on scroll

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion.
