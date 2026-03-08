import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { HiArrowDown, HiDownload, HiMail } from 'react-icons/hi'
import { heroContent, siteConfig } from '../../data/config'

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
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

    const scrollToProjects = () => {
        const element = document.getElementById('projects')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scrollToContact = () => {
        const element = document.getElementById('contact')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="section-container relative z-10 text-center pt-20"
            >
                {/* Welcome Badge */}
                <motion.div variants={itemVariants} className="mb-8">
                    <span className="inline-flex items-center px-4 py-2 rounded-full border border-border text-xs sm:text-sm font-medium text-text-muted tracking-wider uppercase">
                        {heroContent.greeting}
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.div variants={itemVariants} className="mb-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Hi, I'm{' '}
                        <span className="text-gradient-subtle bg-gradient-to-r from-slate to-silver-muted bg-clip-text text-transparent">
                            {heroContent.name}
                        </span>
                    </h1>
                </motion.div>

                {/* Rotating Titles */}
                <motion.div variants={itemVariants} className="mb-8">
                    <div className="text-lg sm:text-xl md:text-2xl font-mono text-text-muted">
                        <TypeAnimation
                            sequence={heroContent.roles.flatMap(role => [role, 3000])}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="text-slate"
                        />
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary leading-relaxed mb-12"
                >
                    {heroContent.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.button
                        onClick={scrollToProjects}
                        className="btn-secondary group flex items-center gap-2 min-w-[180px]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {heroContent.cta.projects}
                        <motion.span
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <HiArrowDown className="w-4 h-4" />
                        </motion.span>
                    </motion.button>

                    <motion.a
                        href="/updated_resume.pdf"
                        download
                        className="btn-primary group flex items-center gap-2 min-w-[180px]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HiDownload className="w-4 h-4" />
                        {heroContent.cta.resume}
                    </motion.a>

                    <motion.button
                        onClick={scrollToContact}
                        className="btn-secondary flex items-center gap-2 min-w-[180px]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HiMail className="w-4 h-4" />
                        {heroContent.cta.contact}
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                
            </motion.div>
        </section>
    )
}

export default Hero
