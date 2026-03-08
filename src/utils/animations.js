/**
 * Reusable Framer Motion animation variants
 */

// Fade animations
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' }
    }
}

export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
}

export const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
}

export const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
}

export const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
}

// Scale animations
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
}

export const scaleInBounce = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.68, -0.55, 0.265, 1.55]
        }
    }
}

// Stagger container
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren,
            delayChildren,
        }
    }
})

// Stagger items
export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
}

// Card hover animations
export const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3, ease: 'easeOut' }
    },
    tap: { scale: 0.98 }
}

// Button hover animations
export const buttonHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: { scale: 0.95 }
}

// Page transition
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: 'easeIn' }
    }
}

// Modal animations
export const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.2 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, delay: 0.1 }
    }
}

export const modalContent = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { duration: 0.2 }
    }
}

// Drawer animations
export const drawerRight = {
    hidden: { x: '100%' },
    visible: {
        x: 0,
        transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: {
        x: '100%',
        transition: { duration: 0.2, ease: 'easeIn' }
    }
}

export const drawerLeft = {
    hidden: { x: '-100%' },
    visible: {
        x: 0,
        transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: {
        x: '-100%',
        transition: { duration: 0.2, ease: 'easeIn' }
    }
}

// Float/hover effect
export const float = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
}

// Pulse effect
export const pulse = {
    animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
}

// Progress bar fill
export const progressFill = (width, delay = 0) => ({
    hidden: { width: 0 },
    visible: {
        width: `${width}%`,
        transition: {
            duration: 1,
            delay,
            ease: [0.4, 0, 0.2, 1]
        }
    }
})

// Text reveal
export const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
        }
    })
}

// Letter by letter reveal
export const letterReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.03,
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
        }
    })
}

// Scroll-triggered reveal
export const scrollReveal = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            bounce: 0.3,
            duration: 0.8
        }
    }
}
