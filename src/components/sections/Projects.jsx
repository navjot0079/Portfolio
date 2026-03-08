import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
    HiArrowRight, HiExternalLink, HiCode, HiAcademicCap,
    HiChip, HiChevronDown, HiArrowLeft, HiX
} from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import {
    SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
    SiNodedotjs, SiExpress, SiTailwindcss, SiMongodb, SiPostgresql,
    SiRedis, SiDocker, SiGit, SiGithub, SiPython, SiFirebase, SiVercel,
    SiVite, SiFramer
} from 'react-icons/si'
import { projects, certificates, techStackItems } from '../../data/config'

const techIconMap = {
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'Tailwind CSS': SiTailwindcss,
    'Vite': SiVite,
    'Framer Motion': SiFramer,
    'Node.js': SiNodedotjs,
    'Express': SiExpress,
    'MongoDB': SiMongodb,
    'PostgreSQL': SiPostgresql,
    'Redis': SiRedis,
    'Firebase': SiFirebase,
    'Docker': SiDocker,
    'Git': SiGit,
    'GitHub': SiGithub,
    'Python': SiPython,
    'Vercel': SiVercel,
}

const tabs = [
    { id: 'projects', label: 'Projects', icon: HiCode },
    { id: 'certificates', label: 'Certificates', icon: HiAcademicCap },
    { id: 'techstack', label: 'Tech Stack', icon: HiChip },
]

const ProjectCard = ({ project, onDetails, index }) => (
    <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -5 }}
        className="card group"
    >
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-slate transition-colors duration-300">
            {project.title}
        </h3>
        <p className="text-sm text-text-secondary mb-6 line-clamp-2">
            {project.shortDescription}
        </p>
        <div className="flex items-center justify-between mt-auto">
            <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-slate-light transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                Live Demo <HiExternalLink className="w-4 h-4" />
            </a>
            <button
                onClick={() => onDetails(project)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-300"
            >
                Details <HiArrowRight className="w-4 h-4" />
            </button>
        </div>
    </motion.article>
)

const CertificateCard = ({ certificate, index, onView }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -5 }}
        className="card group text-center relative overflow-hidden cursor-pointer"
        onClick={() => certificate.image && onView(certificate)}
    >
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-darker border border-border flex items-center justify-center">
            <HiAcademicCap className="w-6 h-6 text-slate" />
        </div>
        <h3 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-slate transition-colors duration-300">
            {certificate.title}
        </h3>
        <p className="text-xs text-text-muted mb-2">{certificate.issuer}</p>
        <p className="text-xs text-text-muted">{certificate.date}</p>

        {/* Hover overlay with certificate preview */}
        {certificate.image && (
            <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-4/5 max-h-28 object-contain rounded-lg border border-border/50"
                />
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate">
                    <HiExternalLink className="w-3.5 h-3.5" />
                    View Certificate
                </span>
            </div>
        )}
    </motion.div>
)

const TechStackGrid = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {techStackItems.map((item, index) => {
            const IconComponent = techIconMap[item.name]
            return (
                <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.08 }}
                    className="card flex flex-col items-center justify-center py-6 px-4 text-center"
                >
                    {IconComponent && (
                        <IconComponent
                            className="w-10 h-10 mb-3"
                            style={{ color: item.color }}
                        />
                    )}
                    <span className="text-xs font-medium text-text-secondary">
                        {item.name}
                    </span>
                </motion.div>
            )
        })}
    </div>
)

const ProjectDetail = ({ project, onClose }) => {
    if (!project) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-primary/95 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.4 }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-6xl mx-auto"
                >
                    {/* Navigation */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={onClose}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary bg-primary-50 border border-border rounded-lg transition-colors duration-300"
                        >
                            <HiArrowLeft className="w-4 h-4" /> Back
                        </button>
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                            <span>Projects</span>
                            <span>›</span>
                            <span className="text-text-primary">{project.title}</span>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-3">
                            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                                {project.title}
                            </h1>
                            <div className="w-16 h-1 bg-slate rounded-full mb-6" />

                            <p className="text-text-secondary leading-relaxed mb-8">
                                {project.fullDescription}
                            </p>

                            {/* Stats */}
                            <div className="flex gap-4 mb-8">
                                <div className="flex items-center gap-3 px-5 py-3 bg-primary-50 border border-border rounded-xl">
                                    <HiCode className="w-5 h-5 text-slate" />
                                    <div>
                                        <div className="text-lg font-bold text-text-primary">
                                            {project.tech.length}
                                        </div>
                                        <div className="text-xs text-text-muted">Technologies</div>
                                    </div>
                                </div>
                                {project.features && (
                                    <div className="flex items-center gap-3 px-5 py-3 bg-primary-50 border border-border rounded-xl">
                                        <HiChip className="w-5 h-5 text-slate" />
                                        <div>
                                            <div className="text-lg font-bold text-text-primary">
                                                {project.features.length}
                                            </div>
                                            <div className="text-xs text-text-muted">Key Features</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mb-8">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    <HiExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                </a>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    <FaGithub className="w-4 h-4 mr-2" />
                                    GitHub
                                </a>
                            </div>

                            {/* Technologies Used */}
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-4">
                                    <HiCode className="w-4 h-4 text-slate" />
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 text-xs font-medium text-text-primary bg-accent-darker border border-border rounded-lg"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Key Features */}
                        {project.features && project.features.length > 0 && (
                            <div className="lg:col-span-2">
                                <div className="bg-primary-50 border border-border rounded-2xl p-6 sticky top-8">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-6">
                                        <HiChip className="w-4 h-4 text-slate" />
                                        Key Features
                                    </h3>
                                    <div className="space-y-4">
                                        {project.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <span className="w-2 h-2 mt-1.5 rounded-full bg-slate flex-shrink-0" />
                                                <span className="text-sm text-text-secondary">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

const Projects = () => {
    const [activeTab, setActiveTab] = useState('projects')
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedCertificate, setSelectedCertificate] = useState(null)
    const [showAll, setShowAll] = useState(false)
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        },
    }

    const displayedProjects = showAll ? projects : projects.slice(0, 6)
    const displayedCerts = showAll ? certificates : certificates.slice(0, 6)

    return (
        <>
            <section id="projects" className="section-padding">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="section-container"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold italic gradient-text mb-4">
                            Portfolio Showcase
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            Explore my journey through projects, certifications, and technical expertise.
                            Each section represents a milestone in my continuous learning path.
                        </p>
                    </motion.div>

                    {/* Tab Bar */}
                    <motion.div variants={itemVariants} className="flex justify-center mb-12">
                        <div className="inline-flex w-full max-w-3xl bg-primary-50 border border-border rounded-full p-1.5">
                            {tabs.map((tab) => {
                                const Icon = tab.icon
                                const isActive = activeTab === tab.id
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id)
                                            setShowAll(false)
                                        }}
                                        className={`relative flex-1 flex flex-col items-center gap-1.5 py-3 px-4 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'bg-accent-light text-text-primary shadow-glow'
                                            : 'text-text-muted hover:text-text-secondary'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'projects' && (
                            <motion.div
                                key="projects"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayedProjects.map((project, index) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            index={index}
                                            onDetails={setSelectedProject}
                                        />
                                    ))}
                                </div>
                                {projects.length > 6 && !showAll && (
                                    <div className="mt-8">
                                        <button
                                            onClick={() => setShowAll(true)}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary bg-primary-50 border border-border rounded-lg transition-colors duration-300"
                                        >
                                            See More <HiChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'certificates' && (
                            <motion.div
                                key="certificates"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayedCerts.map((cert, index) => (
                                        <CertificateCard
                                            key={cert.id}
                                            certificate={cert}
                                            index={index}
                                            onView={setSelectedCertificate}
                                        />
                                    ))}
                                </div>
                                {certificates.length > 6 && !showAll && (
                                    <div className="mt-8">
                                        <button
                                            onClick={() => setShowAll(true)}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary bg-primary-50 border border-border rounded-lg transition-colors duration-300"
                                        >
                                            See More <HiChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'techstack' && (
                            <motion.div
                                key="techstack"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TechStackGrid />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* Project Detail Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetail
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Certificate Viewer Modal */}
            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedCertificate(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative max-w-3xl w-full bg-primary-50 border border-border rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <div>
                                    <h3 className="font-semibold text-text-primary">{selectedCertificate.title}</h3>
                                    <p className="text-xs text-text-muted">{selectedCertificate.issuer} &middot; {selectedCertificate.date}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedCertificate(null)}
                                    className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-accent-darker transition-colors"
                                >
                                    <HiX className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-4 flex items-center justify-center bg-black/30">
                                <img
                                    src={selectedCertificate.image}
                                    alt={selectedCertificate.title}
                                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                                />
                            </div>
                            <div className="p-4 border-t border-border flex justify-end">
                                <a
                                    href={selectedCertificate.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary bg-accent-darker border border-border rounded-lg hover:bg-accent transition-colors duration-300"
                                >
                                    <HiExternalLink className="w-4 h-4" />
                                    Open Full Size
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Projects
