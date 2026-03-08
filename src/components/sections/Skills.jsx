import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillCategories, additionalSkills } from '../../data/config'

const SkillBar = ({ skill, index, inView }) => {
    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                <span className="text-xs font-mono text-slate">{skill.level}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-accent-darker rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-slate to-silver-muted rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{
                        duration: 1,
                        delay: index * 0.1,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                />
            </div>
        </div>
    )
}

const Skills = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
        <section id="skills" className="section-padding bg-primary-100/30">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="section-container"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="section-label">Skills</span>
                    <h2 className="section-title">
                        Tech{' '}
                        <span className="section-title-accent">stack</span>
                    </h2>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            variants={itemVariants}
                            className="card"
                        >
                            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-text-muted mb-6">
                                {category.title}
                            </h3>

                            <div className="space-y-6">
                                {category.skills.map((skill, skillIndex) => (
                                    <SkillBar
                                        key={skill.name}
                                        skill={skill}
                                        index={categoryIndex * 4 + skillIndex}
                                        inView={inView}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Skills Tags */}
                <motion.div variants={itemVariants} className="mt-12">
                    <h3 className="text-sm font-medium text-text-muted mb-4">Also experienced with:</h3>
                    <div className="flex flex-wrap gap-2">
                        {additionalSkills.map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ delay: 0.8 + index * 0.05 }}
                                whileHover={{ scale: 1.1 }}
                                className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-accent-darker border border-border rounded-full hover:border-slate hover:text-text-primary transition-all duration-300 cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Skills
