import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram, FaGlobe } from 'react-icons/fa'
import { socialLinks as socialLinksData, siteConfig } from '../../data/config'

const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    email: FaEnvelope,
    instagram: FaInstagram,
}

const socialLinks = Object.entries(socialLinksData).map(([key, href]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    icon: iconMap[key] || FaGlobe, // Fallback to FaGlobe if icon not found
    href,
}))

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-border bg-primary-50/50">
            <div className="section-container py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <motion.a
                            href="#"
                            className="text-xl font-bold text-text-primary"
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => {
                                e.preventDefault()
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                        >
                            portfolio<span className="text-slate">.</span>
                        </motion.a>
                        <p className="text-sm text-text-muted">
                            © {currentYear} {siteConfig.name}. All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon || FaGlobe
                            return (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg border border-border text-text-secondary 
                         hover:text-text-primary hover:border-border-light hover:bg-accent-darker
                         transition-all duration-300"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    aria-label={social.name}
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* Back to Top */}
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
                        whileHover={{ y: -2 }}
                    >
                        Back to top ↑
                    </motion.button>
                </div>

                {/* Built with */}
                <div className="mt-8 pt-8 border-t border-border/50 text-center">
                    <p className="text-xs text-text-muted">
                        Built with React, Tailwind CSS, and Framer Motion.
                        Deployed with ❤️
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
