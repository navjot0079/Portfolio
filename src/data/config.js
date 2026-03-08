/**
 * Portfolio Configuration
 * Update this file to personalize your portfolio
 */

export const siteConfig = {
    name: 'Navjot Singh Saini',
    title: 'Full-Stack Developer',
    description: 'I build performant, scalable applications with clean architecture and thoughtful design.',
    email: 'navjotsinghaini718@email.com',
    location: 'Ambala Cantt, India',
    available: true, // Show "Available for work" badge
    website: 'www.navjotsingh.dev',
}

// EmailJS configuration — sign up at https://www.emailjs.com/
// 1. Create a service (connect your Gmail/email)
// 2. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 3. Get your Public Key from Account > API Keys
export const emailjsConfig = {
    serviceId: 'service_p2oln92',     // e.g. 'service_xxxxxxx'
    templateId: 'template_6dvulsu',   // e.g. 'template_xxxxxxx'
    publicKey: 'ZvDJFOnEPt9RIrRkA',      // e.g. 'XXXXXXXXXXXXXXX'
}

export const socialLinks = {
    github: 'https://github.com/navjot0079',
    linkedin: 'https://linkedin.com/in/navjotfrontend/',
    twitter: 'https://twitter.com/NavjotS70127790',
    email: 'mailto:navjotsinghaini718@email.com',
    instagram: 'https://instagram.com/navjot_singh_24',
}

export const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Showcase', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Profiles', href: '#profiles' },
    { name: 'Contact', href: '#contact' },
]

export const heroContent = {
    greeting: 'Welcome to my portfolio',
    name: 'Navjot Singh Saini',
    roles: [
        'Full-Stack Developer',
        'Backend Engineer',
        'React Specialist',
        'System Architect',
        'Problem Solver',
    ],
    description: 'I build performant, scalable applications with clean architecture and thoughtful design. Let\'s create something remarkable.',
    cta: {
        projects: 'View Projects',
        resume: 'Download Resume',
        contact: 'Contact Me',
    },
}

export const aboutContent = {
    title: 'Building with purpose',
    paragraphs: [
        'I\'m a developer who thrives at the intersection of design and engineering. I don\'t just write code — I craft solutions that are performant, maintainable, and delightful to use.',
        'With a strong foundation in both frontend and backend technologies, I approach every project with a product mindset: understanding the problem deeply before writing a single line of code.',
        'My work spans from interactive web applications to scalable backend systems, always prioritizing clean architecture and real-world impact.',
    ],
    stats: [
        { value: '7+', label: 'Projects Completed' },
        { value: '10+', label: 'Technologies' },
        { value: '1', label: 'Years Experience' },
    ],
    traits: [
        {
            title: 'Problem Solver',
            description: 'I approach challenges analytically, breaking down complex problems into manageable solutions.',
        },
        {
            title: 'Continuous Learner',
            description: 'Always exploring new technologies and methodologies to stay at the cutting edge.',
        },
        {
            title: 'Team Leader',
            description: 'I believe in collaborative development and clear communication for project success.',
        },
    ],
}

export const certificates = [
    {
        id: 1,
        title: 'Full Stack Web Development',
        issuer: 'Udemy',
        date: '2025',
        image: '/certificates/Full-Stack.jpg',
    },
    {
        id: 2,
        title: 'Introductory to C Programming',
        issuer: 'Coursera',
        date: '2023',
        image: '/certificates/C-Programming.png',
    },
    {
        id: 3,
        title: 'Basic JavaScript',
        issuer: 'HackerRank',
        date: '2024',
        image: '/certificates/Javascript basic.png',
    },
    {
        id: 4,
        title: 'Introduction to UI/UX Design',
        issuer: 'Alison',
        date: '2024',
        image: '/certificates/UI_UX.jpeg',
    },
    {
        id: 5,
        title: 'Apply AI Analyze Customer Reviews',
        issuer: 'Cisco Networking Academy',
        date: '2025',
        image: '/certificates/apply-ai.png',
    },
    {
        id: 6,
        title: 'YUVA AI for All',
        issuer: 'TCS ion',
        date: '2026',
        image: '/certificates/Yuva_ai.png',
    },
    {
        id: 7,
        title: 'Prompt Engineering',
        issuer: 'Infosys Springboard',
        date: '2026',
        image: '/certificates/prompt.png',
    },
    {
        id: 8,
        title: 'Introduction to Modern AI',
        issuer: 'Cisco Networking Academy',
        date: '2025',
        image: '/certificates/modern-ai.png',
    },
    {
        id: 9,
        title: 'Ethical Hacking',
        issuer: 'Great Learning',
        date: '2023',
        image: '/certificates/ethical-hacking.png',
    },
]

export const techStackItems = [
    { name: 'HTML', color: '#E34F26' },
    { name: 'CSS', color: '#1572B6' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'React', color: '#61DAFB' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'Tailwind CSS', color: '#06B6D4' },
    { name: 'Vite', color: '#646CFF' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Express', color: '#ffffff' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'PostgreSQL', color: '#4169E1' },
    { name: 'Redis', color: '#DC382D' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'Git', color: '#F05032' },
    { name: 'Python', color: '#3776AB' },
    { name: 'Vercel', color: '#ffffff' },
]

export const projects = [
    {
        id: 1,
        title: 'Noor Crochets',
        shortDescription: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
        fullDescription: 'A comprehensive e-commerce platform built from the ground up.',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
        features: [
            'Secure payment processing with Stripe',
            'Real-time inventory management',
            'Admin dashboard with analytics',
            'Responsive product catalog',
        ],
        liveUrl: 'https://demo-ecommerce.com',
        githubUrl: 'https://github.com/navjot0079/noor-crochets',
        featured: true,
    },
    {
        id: 2,
        title: 'TaskSphere',
        shortDescription: 'Collaborative project management tool with real-time updates.',
        fullDescription: 'A Trello-inspired project management application.',
        tech: ['React', 'Node.js', 'MongoDB', 'Framer Motion'],
        features: [
            'Drag-and-drop task management',
            'Real-time collaboration updates',
            'Progress tracking and analytics',
            'Customizable project boards',
        ],
        liveUrl: 'https://demo-taskapp.com',
        githubUrl: 'https://github.com/navjot0079/TaskSphere',
        featured: true,
    },
    {
        id: 3,
        title: 'Eventify',
        shortDescription: 'SaaS platform for managing events and registrations.',
        fullDescription: 'A comprehensive event management platform with user registration, ticketing, and analytics.',
        tech: ['React', 'Node.js', 'MongoDB', 'Framer Motion'],
        features: [
            'Event creation and management',
            'User registration and ticketing',
            'Real-time analytics dashboard',
            'Automated email notifications',
        ],
        liveUrl: 'https://demo-eventmanager.com',
        githubUrl: 'https://github.com/navjot0079/Eventify',
        featured: true,
    },
]

export const experiences = [
    {
        id: 1,
        title: 'Full-Stack Developer',
        company: 'Freelance',
        period: '2023 — Present',
        description: 'Building web applications for startups and small businesses.',
        details: [
            'Developed custom web applications for 10+ clients',
            'Implemented responsive designs optimized for performance',
            'Integrated third-party APIs and payment systems',
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    },
    {
        id: 2,
        title: 'Web Developer',
        company: 'ACM Club, Chitkara University',
        period: '2024 — 2025',
        description: 'Contributed to the frontend of a SaaS analytics platform.',
        details: [
            'Built reusable React components',
            'Implemented complex data visualizations',
            'Improved page load times by 40%',
        ],
        technologies: ['React', 'TypeScript', 'Redux', 'D3.js'],
    },
]

export const education = {
    degree: 'Bachelor\'s Degree in Computer Science',
    school: 'Chitkara University',
    period: '2023 — 2027',
    description: 'Focused on software engineering, algorithms, and web technologies.',
}

export const profiles = [
    {
        name: 'GitHub',
        username: '@navjot0079',
        description: 'Open source contributions & projects',
        url: 'https://github.com/navjot0079',
    },
    {
        name: 'LinkedIn',
        username: 'Navjot Singh Saini',
        description: 'Professional network & experience',
        url: 'https://linkedin.com/in/navjotfrontend/',
    },
    {
        name: 'LeetCode',
        username: '@Navjot171693',
        description: '500+ problems solved',
        url: 'https://leetcode.com/navjot171693',
    },
    {
        name: 'Instagram',
        username: '@navjot_singh_24',
        description: 'Follow me',
        url: 'https://instagram.com/navjot_singh_24',
    },
    {
        name: 'HackerRank',
        username: '@navjotsinghsain1',
        description: '3-star badges in SQL & Problem Solving',
        url: 'https://www.hackerrank.com/profile/navjotsinghsain1',
    },
]
