import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaHackerrank, FaInstagram } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { profiles as profilesData } from '../../data/config'

const iconMap = {
    'GitHub': FaGithub,
    'LinkedIn': FaLinkedin,
    'LeetCode': SiLeetcode,
    'HackerRank': FaHackerrank,
    'Email': FaEnvelope,
    'Instagram': FaInstagram,
}

const colorMap = {
    'GitHub': 'hover:border-[#6e5494]',
    'LinkedIn': 'hover:border-[#0077B5]',
    'LeetCode': 'hover:border-[#FFA116]',
    'HackerRank': 'hover:border-[#2EC866]',
    'Email': 'hover:border-slate',
    'Instagram': 'hover:border-[#E4405F]',
}

const profiles = profilesData.map(profile => ({
    ...profile,
    icon: iconMap[profile.name] || FaCode, // Fallback to FaCode if icon not found
    color: colorMap[profile.name] || 'hover:border-slate',
}))

const ProfileCard = ({ profile, index }) => {
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    })

    const Icon = profile.icon || FaCode // Safety check

    return (
        <motion.a
            ref={ref}
            href={profile.url}
            target={profile.url.startsWith('mailto') ? undefined : '_blank'}
            rel={profile.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`card group transition-all duration-300 ${profile.color}`}
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-darker flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                    <Icon className="w-6 h-6 text-text-secondary group-hover:text-text-primary transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary group-hover:text-white transition-colors duration-300">
                        {profile.name}
                    </h3>
                    <p className="text-sm text-slate truncate">{profile.username}</p>
                    <p className="text-xs text-text-muted mt-1">{profile.description}</p>
                </div>
            </div>
        </motion.a>
    )
}

const GitHubStats = ({ username }) => {
    const [stats, setStats] = useState(null)
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch(`https://api.github.com/users/${username}`)

                if (!userResponse.ok) {
                    throw new Error(`GitHub API Error: ${userResponse.status}`)
                }

                const userData = await userResponse.json()

                // Fetch pinned/starred repos
                const reposResponse = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=updated&per_page=3`
                )

                if (!reposResponse.ok) {
                    throw new Error(`GitHub Repos API Error: ${reposResponse.status}`)
                }

                const reposData = await reposResponse.json()

                setStats({
                    publicRepos: userData.public_repos || 0,
                    followers: userData.followers || 0,
                    following: userData.following || 0,
                })
                setRepos(Array.isArray(reposData) ? reposData.slice(0, 3) : [])
                setError(null)
            } catch (error) {
                console.error('Failed to fetch GitHub data:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (username && username !== 'yourusername') {
            fetchGitHubData()
        } else {
            setLoading(false)
        }
    }, [username])

    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true,
    })

    if (loading) {
        return (
            <div className="card animate-pulse">
                <div className="h-4 bg-accent-darker rounded w-1/3 mb-4" />
                <div className="space-y-3">
                    <div className="h-3 bg-accent-darker rounded w-full" />
                    <div className="h-3 bg-accent-darker rounded w-2/3" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="card col-span-full lg:col-span-2"
            >
                <div className="flex items-center gap-3 mb-4">
                    <FaGithub className="w-6 h-6 text-text-secondary" />
                    <h3 className="font-semibold text-text-primary">GitHub Activity</h3>
                </div>
                <p className="text-sm text-text-muted">Unable to load GitHub stats. Please check the username or try again later.</p>
            </motion.div>
        )
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="card col-span-full lg:col-span-2"
        >
            <div className="flex items-center gap-3 mb-6">
                <FaGithub className="w-6 h-6 text-text-secondary" />
                <h3 className="font-semibold text-text-primary">GitHub Activity</h3>
            </div>

            {stats && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <span className="text-2xl font-bold text-text-primary">{stats.publicRepos}</span>
                        <p className="text-xs text-text-muted mt-1">Repositories</p>
                    </div>
                    <div className="text-center">
                        <span className="text-2xl font-bold text-text-primary">{stats.followers}</span>
                        <p className="text-xs text-text-muted mt-1">Followers</p>
                    </div>
                    <div className="text-center">
                        <span className="text-2xl font-bold text-text-primary">{stats.following}</span>
                        <p className="text-xs text-text-muted mt-1">Following</p>
                    </div>
                </div>
            )}

            {repos.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-text-muted mb-3">Top Repositories</h4>
                    <div className="space-y-3">
                        {repos.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-accent-darker rounded-lg hover:bg-accent transition-colors duration-300"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <FaCode className="w-4 h-4 text-slate flex-shrink-0" />
                                    <span className="text-sm text-text-primary truncate">{repo.name}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-text-muted">
                                    {repo.language && <span>{repo.language}</span>}
                                    <span>⭐ {repo.stargazers_count}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    )
}

const Profiles = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    // Extract GitHub username from profiles
    const githubProfile = profiles.find(p => p.name === 'GitHub')
    const githubUsername = githubProfile?.username?.replace('@', '') || 'navjot0079'

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        <section id="profiles" className="section-padding">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="section-container"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="section-label">Profiles</span>
                    <h2 className="section-title">
                        Find me{' '}
                        <span className="section-title-accent">online</span>
                    </h2>
                </motion.div>

                {/* Profiles Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((profile, index) => (
                        <ProfileCard key={profile.name} profile={profile} index={index} />
                    ))}

                    {/* GitHub Stats Card */}
                    <GitHubStats username={githubUsername} />
                </div>
            </motion.div>
        </section>
    )
}

export default Profiles
