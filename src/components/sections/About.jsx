import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiOutlineRocketLaunch, HiOutlineCodeBracket, HiOutlineBolt } from 'react-icons/hi2'
import { aboutContent } from '../../data/config'

const iconMap = [HiOutlineRocketLaunch, HiOutlineCodeBracket, HiOutlineBolt]

const About = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    })

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

    const statVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    }

    return (
        <section id="about" className="section-padding">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="section-container"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="section-label">About</span>
                    <h2 className="section-title">
                        {aboutContent.title.split(' ')[0]} <span className="section-title-accent">{aboutContent.title.split(' ')[1]}</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Text Content */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {aboutContent.paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="text-lg text-text-secondary leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        {aboutContent.stats.map((stat, index) => {
                            const Icon = iconMap[index]
                            return (
                                <motion.div
                                    key={stat.label}
                                    variants={statVariants}
                                    custom={index}
                                    className="card group"
                                    whileHover={{ scale: 1.02, x: 10 }}
                                >
                                    <div className="flex items-center gap-6">
                                        {/* Icon */}
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-darker flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                                            <Icon className="w-6 h-6 text-slate" />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <motion.span
                                                className="text-3xl sm:text-4xl font-bold text-text-primary"
                                                initial={{ opacity: 0 }}
                                                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                                                transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                                            >
                                                {stat.value}
                                            </motion.span>
                                            <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>

                {/* Additional Info Cards */}
                <motion.div
                    variants={containerVariants}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
                >
                    {aboutContent.traits.map((item, index) => (
                        <motion.div
                            key={item.title}
                            variants={itemVariants}
                            className="card"
                            whileHover={{ y: -5 }}
                        >
                            <h3 className="text-lg font-semibold text-text-primary mb-3">{item.title}</h3>
                            <p className="text-sm text-text-secondary">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

export default About
