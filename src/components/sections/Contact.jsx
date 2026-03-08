import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiPaperAirplane, HiCheck, HiExclamation } from 'react-icons/hi'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../../data/config'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [errors, setErrors] = useState({})

    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setStatus('loading')

        try {
            // Use EmailJS if configured, otherwise fall back to backend API
            if (emailjsConfig.serviceId && emailjsConfig.serviceId !== 'YOUR_SERVICE_ID') {
                await emailjs.send(
                    emailjsConfig.serviceId,
                    emailjsConfig.templateId,
                    {
                        from_name: formData.name,
                        from_email: formData.email,
                        message: formData.message,
                    },
                    emailjsConfig.publicKey
                )
            } else {
                // Fall back to backend API
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })

                if (!response.ok) {
                    throw new Error('Failed to send message')
                }
            }

            setStatus('success')
            setFormData({ name: '', email: '', message: '' })

            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            console.error('Contact form error:', error)
            setStatus('error')

            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    }

    return (
        <section id="contact" className="section-padding bg-primary-100/30">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="section-container"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="section-label">Contact</span>
                    <h2 className="section-title">
                        Let's{' '}
                        <span className="section-title-accent">connect</span>
                    </h2>
                    <p className="max-w-xl text-text-secondary mt-4">
                        Have a project in mind or want to collaborate? Drop me a message and I'll get back to you promptly.
                    </p>
                </motion.div>

                <div className="max-w-2xl">
                    {/* Contact Form */}
                    <motion.form
                        variants={itemVariants}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Your name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className={`input-field ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                    disabled={status === 'loading'}
                                />
                                <AnimatePresence>
                                    {errors.name && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute -bottom-6 left-0 text-xs text-red-400"
                                        >
                                            {errors.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="mt-8">
                            <label htmlFor="email" className="sr-only">
                                Your email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                    className={`input-field ${errors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                    disabled={status === 'loading'}
                                />
                                <AnimatePresence>
                                    {errors.email && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute -bottom-6 left-0 text-xs text-red-400"
                                        >
                                            {errors.email}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="mt-8">
                            <label htmlFor="message" className="sr-only">
                                Your message
                            </label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message"
                                    rows={6}
                                    className={`input-field resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : ''}`}
                                    disabled={status === 'loading'}
                                />
                                <AnimatePresence>
                                    {errors.message && (
                                        <motion.span
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute -bottom-6 left-0 text-xs text-red-400"
                                        >
                                            {errors.message}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className={`btn-primary w-full sm:w-auto mt-8 ${status === 'success' ? 'bg-green-500 hover:bg-green-500' : ''
                                } ${status === 'error' ? 'bg-red-500 hover:bg-red-500' : ''}`}
                            whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                            whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                        >
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.span
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <HiPaperAirplane className="w-4 h-4" />
                                        Send Message
                                    </motion.span>
                                )}
                                {status === 'loading' && (
                                    <motion.span
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                                        />
                                        Sending...
                                    </motion.span>
                                )}
                                {status === 'success' && (
                                    <motion.span
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <HiCheck className="w-4 h-4" />
                                        Message Sent!
                                    </motion.span>
                                )}
                                {status === 'error' && (
                                    <motion.span
                                        key="error"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <HiExclamation className="w-4 h-4" />
                                        Failed to Send
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.form>

                    {/* Alternative Contact Methods */}
                    <motion.div variants={itemVariants} className="mt-16 pt-16 border-t border-border">
                        <p className="text-sm text-text-muted mb-4">Or reach out directly:</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="mailto:you@email.com"
                                className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                            >
                                you@email.com
                            </a>
                            <span className="hidden sm:inline text-text-muted">•</span>
                            <a
                                href="https://linkedin.com/in/yourname"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                            >
                                LinkedIn
                            </a>
                            <span className="hidden sm:inline text-text-muted">•</span>
                            <a
                                href="https://twitter.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                            >
                                Twitter
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default Contact
