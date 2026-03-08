import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HiCode, HiUser, HiGlobeAlt } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { socialLinks, siteConfig } from '../../data/config'

const FLOATING_COUNT = 28

const generateFloatingData = (count) =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 88 + 6,
        y: Math.random() * 88 + 6,
        size: Math.random() * 28 + 8,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 4,
        isCircle: i % 3 === 1,
        isDiamond: i % 3 === 2,
    }))

const FloatingElement = ({ data }) => {
    const borderRadius = data.isCircle ? '50%' : data.isDiamond ? '3px' : '6px'
    const baseRotate = data.isDiamond ? 45 : 0

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                width: data.size,
                height: data.size,
                left: `${data.x}%`,
                top: `${data.y}%`,
                borderRadius,
                border: '1px solid rgba(168,85,247,0.15)',
                background: 'rgba(168,85,247,0.03)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow:
                    '0 0 25px rgba(168,85,247,0.12), 0 0 50px rgba(168,85,247,0.06), 0 4px 20px rgba(0,0,0,0.2), inset 0 0 15px rgba(255,255,255,0.03)',
            }}
            initial={{ opacity: 0, scale: 0, rotate: baseRotate }}
            animate={{
                opacity: [0, 0.6, 0.3, 0.6, 0],
                scale: [0.6, 1, 0.8, 1.05, 0.6],
                y: [0, -30, 15, -22, 0],
                x: [0, 14, -10, 12, 0],
                rotate: [
                    baseRotate,
                    baseRotate + 20,
                    baseRotate - 12,
                    baseRotate + 18,
                    baseRotate,
                ],
            }}
            transition={{
                duration: data.duration,
                delay: data.delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    )
}

const iconLinks = [
    { Icon: HiCode, href: socialLinks.github, label: 'Code' },
    { Icon: HiUser, href: socialLinks.linkedin, label: 'LinkedIn' },
    { Icon: FaGithub, href: socialLinks.github, label: 'GitHub' },
]

const LoadingScreen = ({ onComplete }) => {
    const [typedText, setTypedText] = useState('')
    const [showCursor, setShowCursor] = useState(false)
    const floatingElements = useMemo(() => generateFloatingData(FLOATING_COUNT), [])
    const onCompleteRef = useRef(onComplete)
    const hasCompletedRef = useRef(false)
    onCompleteRef.current = onComplete
    const websiteUrl = siteConfig.website || 'navjotsingh.dev'

    const handleComplete = useCallback(() => {
        console.log('LoadingScreen: handleComplete called')
        if (!hasCompletedRef.current && onCompleteRef.current) {
            hasCompletedRef.current = true
            console.log('LoadingScreen: Calling onComplete callback')
            onCompleteRef.current()
        }
    }, [])

    useEffect(() => {
        console.log('LoadingScreen mounted')
        const timers = []

        // Simplified: just call complete after 5 seconds
        const autoComplete = setTimeout(() => {
            console.log('LoadingScreen: Auto-complete triggered')
            handleComplete()
        }, 5000)
        timers.push(autoComplete)

        // Start typing animation
        const typingStart = setTimeout(() => {
            console.log('LoadingScreen: Starting typing')
            setShowCursor(true)
            let idx = 0
            const interval = setInterval(() => {
                idx++
                setTypedText(websiteUrl.slice(0, idx))
                if (idx >= websiteUrl.length) {
                    clearInterval(interval)
                    console.log('LoadingScreen: Typing done')
                }
            }, 70)
            timers.push(interval)
        }, 2500)
        timers.push(typingStart)

        return () => {
            console.log('LoadingScreen unmounting')
            timers.forEach((t) => {
                clearTimeout(t)
                clearInterval(t)
            })
        }
    }, [websiteUrl, handleComplete])

    const iconVariants = {
        hidden: { opacity: 0, scale: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                delay: 0.2 + i * 0.15,
                type: 'spring',
                stiffness: 180,
                damping: 14,
            },
        }),
    }

    const textVariants = {
        hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
        visible: (delay) => ({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                delay,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    }

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 0.95,
                filter: 'blur(10px)',
                transition: {
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96]
                },
            }}
            onClick={handleComplete}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer"
            style={{ background: '#000000' }}
            title="Click anywhere to skip"
        >
            {/* Ambient gradient orbs */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    left: '15%',
                    top: '20%',
                    background:
                        'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                    x: [-30, 30, -30],
                    y: [-15, 20, -15],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full"
                style={{
                    right: '10%',
                    bottom: '15%',
                    background:
                        'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{
                    scale: [1.2, 0.9, 1.2],
                    opacity: [0.3, 0.6, 0.3],
                    x: [20, -20, 20],
                    y: [15, -15, 15],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute w-[350px] h-[350px] rounded-full"
                style={{
                    left: '50%',
                    top: '5%',
                    transform: 'translateX(-50%)',
                    background:
                        'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            {/* Floating elements with light box shadows */}
            <div className="absolute inset-0 pointer-events-none">
                {floatingElements.map((el) => (
                    <FloatingElement key={el.id} data={el} />
                ))}
            </div>

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Main content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-4"
                exit={{
                    y: -50,
                    opacity: 0,
                    transition: { duration: 0.5, ease: 'easeIn' }
                }}
            >
                {/* Icon links */}
                <motion.div
                    className="flex items-center gap-6 mb-14"
                    exit={{
                        scale: 0.8,
                        opacity: 0,
                        transition: { duration: 0.4, ease: 'easeIn' }
                    }}
                >
                    {iconLinks.map(({ Icon, href, label }, i) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            custom={i}
                            variants={iconVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{
                                scale: 0,
                                rotate: 180,
                                opacity: 0,
                                transition: { duration: 0.3, delay: i * 0.05 }
                            }}
                            whileHover={{
                                scale: 1.2,
                                boxShadow:
                                    '0 0 40px rgba(168,85,247,0.4), 0 0 80px rgba(168,85,247,0.2), inset 0 0 30px rgba(255,255,255,0.05)',
                                borderColor: 'rgba(168,85,247,0.6)',
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white/70 cursor-pointer transition-all duration-300 hover:text-white glass-morph icon-white-glow"
                        >
                            <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: i * 0.5,
                                }}
                            >
                                <Icon size={24} />
                            </motion.div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Welcome To My */}
                <motion.div
                    custom={0.7}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                        y: -30,
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 0.4, delay: 0.1 }
                    }}
                    className="px-8 py-4 rounded-3xl mb-2"
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 0 20px rgba(168,85,247,0.06), inset 0 0 20px rgba(255,255,255,0.02)',
                    }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wider leading-tight">
                        Welcome To My
                    </h1>
                </motion.div>

                {/* Portfolio Website — purple gradient */}
                <motion.div
                    custom={1.1}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                        y: -30,
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 0.4, delay: 0.15 }
                    }}
                    className="px-8 py-4 rounded-3xl mb-14"
                    style={{
                        background: 'rgba(168,85,247,0.05)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(168,85,247,0.2)',
                        boxShadow: '0 0 30px rgba(168,85,247,0.15), 0 0 60px rgba(168,85,247,0.08), inset 0 0 20px rgba(255,255,255,0.02)',
                    }}
                >
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider leading-tight"
                        style={{
                            background:
                                'linear-gradient(135deg, #c084fc, #a855f7, #7c3aed)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Portfolio Website
                    </h1>
                </motion.div>

                {/* URL with single-run typing animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        y: 30,
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 0.4, delay: 0.2 }
                    }}
                    transition={{ delay: 2.0, duration: 0.6, ease: 'easeOut' }}
                    className="flex items-center gap-2.5 px-6 py-3 rounded-full glass-morph"
                >
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        <HiGlobeAlt className="text-purple-400 text-xl flex-shrink-0" />
                    </motion.div>
                    <span className="text-purple-300/90 font-medium text-sm sm:text-base tracking-wide font-mono min-w-[160px] text-left">
                        {typedText}
                        {showCursor && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                }}
                                className="text-purple-400 ml-0.5"
                            >
                                |
                            </motion.span>
                        )}
                    </span>
                </motion.div>
            </motion.div>

            {/* Click to skip hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.3 }
                }}
                transition={{ delay: 3, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
            >
                <p className="text-xs sm:text-sm text-white/30 font-light tracking-wider">
                    Click anywhere to skip
                </p>
            </motion.div>

            {/* Vignette effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                }}
            />
        </motion.div>
    )
}

export default LoadingScreen
