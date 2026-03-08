import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for development
    crossOriginEmbedderPolicy: false,
}))

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
}))

// Body parser
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Rate limiting
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
})

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 contact form submissions per hour
    message: { error: 'Too many contact requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
})

app.use('/api/', generalLimiter)

// Email transporter configuration
const createTransporter = () => {
    // For production, use real SMTP credentials
    if (process.env.NODE_ENV === 'production') {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })
    }

    // For development, use Ethereal (fake SMTP)
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: process.env.ETHEREAL_USER || 'test@ethereal.email',
            pass: process.env.ETHEREAL_PASS || 'testpassword',
        },
    })
}

// Validation middleware for contact form
const contactValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .escape(),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10, max: 5000 })
        .withMessage('Message must be between 10 and 5000 characters')
        .escape(),
]

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    })
})

// Contact form endpoint
app.post('/api/contact', contactLimiter, contactValidation, async (req, res) => {
    try {
        // Check validation results
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array().map(err => ({ field: err.path, message: err.msg }))
            })
        }

        const { name, email, message } = req.body

        // Create email content
        const mailOptions = {
            from: `"Portfolio Contact Form" <${process.env.SMTP_USER || 'noreply@portfolio.com'}>`,
            to: process.env.CONTACT_EMAIL || 'navjotsinghaini718@email.com',
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from your portfolio contact form.
      `,
            html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0b0b0b; color: #fff; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 5px; }
    .message-box { background: #fff; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0; }
    .footer { margin-top: 20px; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="footer">
        This email was sent from your portfolio contact form.
      </div>
    </div>
  </div>
</body>
</html>
      `,
        }

        // Send email
        const transporter = createTransporter()
        const info = await transporter.sendMail(mailOptions)

        console.log('Contact email sent:', info.messageId)

        // In development, log the preview URL
        if (process.env.NODE_ENV !== 'production') {
            console.log('Preview URL:', nodemailer.getTestMessageUrl(info))
        }

        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully!'
        })
    } catch (error) {
        console.error('Contact form error:', error)
        res.status(500).json({
            error: 'Failed to send message. Please try again later.'
        })
    }
})

// Resume download endpoint
app.get('/api/download/resume', (req, res) => {
    const resumePath = path.join(__dirname, '../public/updated_resume.pdf')

    res.download(resumePath, 'Navjot_Singh_Resume.pdf', (err) => {
        if (err) {
            console.error('Resume download error:', err)
            res.status(404).json({ error: 'Resume not found' })
        }
    })
})

// Projects API (optional - for dynamic content)
app.get('/api/projects', (req, res) => {
    // This could fetch from a database in production
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution',
            tech: ['React', 'Node.js', 'PostgreSQL'],
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Collaborative project management tool',
            tech: ['React', 'TypeScript', 'Supabase'],
        },
        {
            id: 3,
            title: 'AI Content Generator',
            description: 'AI-powered content generation platform',
            tech: ['Next.js', 'Python', 'FastAPI'],
        },
    ]

    res.json({ projects })
})

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../dist')
    console.log('Serving static files from:', distPath)

    app.use(express.static(distPath))

    // Handle React routing - must be last
    app.get('*', (req, res) => {
        const indexPath = path.join(distPath, 'index.html')
        console.log('Sending index.html from:', indexPath)
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error('Error sending index.html:', err)
                res.status(500).send('Error loading application')
            }
        })
    })
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err)
    res.status(500).json({
        error: 'An unexpected error occurred',
        ...(process.env.NODE_ENV !== 'production' && { details: err.message })
    })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' })
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
