import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/layout/LoadingScreen'
import CustomCursor from './components/layout/CustomCursor'

// Background
import AnimatedBackground from './components/ui/AnimatedBackground'

// Section Components
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Profiles from './components/sections/Profiles'
import Contact from './components/sections/Contact'

function App() {
    const [showLanding, setShowLanding] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const handleLandingComplete = useCallback(() => {
        console.log('Landing complete - hiding landing page')
        setShowLanding(false)
    }, [])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    return (
        <>
            {/* Portfolio content - ALWAYS VISIBLE underneath */}
            <motion.div
                style={{ minHeight: '100vh' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: showLanding ? 0 : 1 }}
                transition={{ duration: 1, ease: 'easeInOut', delay: showLanding ? 0 : 0.3 }}
            >
                {/* Fixed full-page animated background */}
                <AnimatedBackground fixed={true} className="full-page-animated-bg" />

                {/* Noise overlay for texture */}
                <div className="noise-overlay" aria-hidden="true" />

                {/* Custom cursor - only on desktop */}
                {!isMobile && <CustomCursor />}

                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: showLanding ? 0 : 1,
                        y: showLanding ? 20 : 0
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: showLanding ? 0 : 0.5 }}
                >
                    <Navbar />
                </motion.div>

                <main className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: showLanding ? 0 : 1,
                            y: showLanding ? 30 : 0
                        }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: showLanding ? 0 : 0.6 }}
                    >
                        <Hero />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showLanding ? 0 : 1 }}
                        transition={{ duration: 0.6, delay: showLanding ? 0 : 0.8 }}
                    >
                        <About />
                        <Projects />
                        <Experience />
                        <Profiles />
                        <Contact />
                    </motion.div>
                </main>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showLanding ? 0 : 1 }}
                    transition={{ duration: 0.6, delay: showLanding ? 0 : 1 }}
                >
                    <Footer />
                </motion.div>
            </motion.div>

            {/* Landing page overlay on top - fades out */}
            <AnimatePresence mode="wait">
                {showLanding && (
                    <LoadingScreen key="landing" onComplete={handleLandingComplete} />
                )}
            </AnimatePresence>
        </>
    )
}

export default App
