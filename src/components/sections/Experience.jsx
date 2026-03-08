import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { experiences, education } from '../../data/config'

const TimelineItem = ({ experience, index, isLast }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative pl-8 sm:pl-12"
        >
            {/* Timeline Line */}
            {!isLast && (
                <div className="absolute left-[5px] sm:left-[9px] top-8 bottom-0 w-px bg-border" />
            )}

            {/* Timeline Dot */}
            <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
                className="absolute left-0 sm:left-1 top-2 w-3 h-3 rounded-full bg-slate border-2 border-primary"
            />

            {/* Content */}
            <div className="pb-12">
                {/* Period */}
                <span className="text-xs font-mono text-text-muted">
                    {experience.period}
                </span>

                {/* Title & Company */}
                <h3 className="text-xl font-semibold text-text-primary mt-2">
                    {experience.title}
                </h3>
                <p className="text-sm text-slate mt-1">{experience.company}</p>

                {/* Description */}
                <p className="text-sm text-text-secondary mt-3">
                    {experience.description}
                </p>

                {/* Expand Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 mt-4 text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
                >
                    Details
                    {isExpanded ? (
                        <HiChevronUp className="w-4 h-4" />
                    ) : (
                        <HiChevronDown className="w-4 h-4" />
                    )}
                </button>

                {/* Expandable Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 space-y-4">
                                {/* Details List */}
                                <ul className="space-y-2">
                                    {experience.details.map((detail, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-2 text-sm text-text-secondary"
                                        >
                                            <span className="w-1.5 h-1.5 mt-2 bg-slate rounded-full flex-shrink-0" />
                                            {detail}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {experience.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs font-medium text-text-muted bg-accent-darker border border-border rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

const Experience = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
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

    return (
        <section id="experience" className="section-padding bg-primary-100/30">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="section-container"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="section-label">Experience</span>
                    <h2 className="section-title">
                        My{' '}
                        <span className="section-title-accent">journey</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-3xl">
                    {experiences.map((experience, index) => (
                        <TimelineItem
                            key={experience.id}
                            experience={experience}
                            index={index}
                            isLast={index === experiences.length - 1}
                        />
                    ))}
                </div>

                {/* Education Section */}
                <motion.div variants={itemVariants} className="mt-16 max-w-3xl">
                    <h3 className="text-lg font-semibold text-text-primary mb-6">Education</h3>
                    <div className="space-y-4">
                        <div className="card">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                <div>
                                    <h4 className="font-medium text-text-primary">
                                        Bachelor's Degree in Computer Science
                                    </h4>
                                    <p className="text-sm text-slate">Chitkara University</p>
                                </div>
                                <span className="text-xs font-mono text-text-muted">2023 — 2027</span>
                            </div>
                            <p className="text-sm text-text-secondary mt-3">
                                Focused on software engineering, algorithms, and web technologies.
                                Graduated with honors and completed multiple capstone projects.
                            </p>
                        </div>

                        <div className="card">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                <div>
                                    <h4 className="font-medium text-text-primary">
                                        High School Diploma
                                    </h4>
                                    <p className="text-sm text-slate">Lord Mahavir Jain Public School</p>
                                </div>
                                <span className="text-xs font-mono text-text-muted">2009 — 2023</span>
                            </div>
                            <p className="text-sm text-text-secondary mt-3">
                                Completed secondary education with focus on science and mathematics.
                                Participated in various coding competitions and technical activities.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Experience
