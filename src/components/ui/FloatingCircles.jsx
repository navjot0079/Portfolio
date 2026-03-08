import { memo, useMemo } from 'react'

/**
 * FloatingCircles Component
 * 
 * A more configurable version of animated circles that can be used
 * standalone or as part of a larger background composition.
 * 
 * Props:
 * - count: Number of circles (default: 8)
 * - minSize: Minimum circle size in rem (default: 10)
 * - maxSize: Maximum circle size in rem (default: 24)
 * - opacity: Base opacity (default: 0.05)
 * - color: Circle color (default: 'white')
 * - blur: Blur amount (default: '3xl')
 */

const FloatingCircles = memo(({
    count = 8,
    minSize = 10,
    maxSize = 24,
    opacity = 0.05,
    color = 'white',
    blur = 'blur-3xl',
}) => {
    // Generate circle configurations
    const circles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const size = minSize + Math.random() * (maxSize - minSize)
            const top = Math.random() * 100
            const left = Math.random() * 100
            const delay = -Math.random() * 20
            const duration = 25 + Math.random() * 15

            return {
                id: i,
                size: `${size}rem`,
                top: `${top}%`,
                left: `${left}%`,
                delay: `${delay}s`,
                duration: `${duration}s`,
                opacity: opacity * (0.5 + Math.random() * 0.5),
            }
        })
    }, [count, minSize, maxSize, opacity])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {circles.map((circle) => (
                <div
                    key={circle.id}
                    className={`animated-circle absolute rounded-full ${blur}`}
                    style={{
                        width: circle.size,
                        height: circle.size,
                        top: circle.top,
                        left: circle.left,
                        backgroundColor: color,
                        opacity: circle.opacity,
                        animationDelay: circle.delay,
                        animationDuration: circle.duration,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}
        </div>
    )
})

FloatingCircles.displayName = 'FloatingCircles'

/**
 * GridPattern Component
 * 
 * Subtle grid overlay for depth and texture
 */
const GridPattern = memo(({
    size = 80,
    opacity = 0.015,
    color = 'rgba(255,255,255,0.08)',
}) => (
    <div
        className="absolute inset-0 pointer-events-none"
        style={{
            opacity,
            backgroundImage: `
        linear-gradient(${color} 1px, transparent 1px),
        linear-gradient(90deg, ${color} 1px, transparent 1px)
      `,
            backgroundSize: `${size}px ${size}px`,
        }}
    />
))

GridPattern.displayName = 'GridPattern'

/**
 * RadialGradient Component
 * 
 * Gradient overlay for vignette/focus effects
 */
const RadialGradient = memo(({
    from = 'transparent',
    to = 'rgba(11,11,11,0.4)',
    position = 'center',
}) => (
    <div
        className="absolute inset-0 pointer-events-none"
        style={{
            background: `radial-gradient(ellipse at ${position}, ${from} 0%, ${to} 100%)`,
        }}
    />
))

RadialGradient.displayName = 'RadialGradient'

/**
 * FullPageBackground Component
 * 
 * Complete full-page animated background suitable for use
 * as a fixed background layer across all sections.
 */
const FullPageBackground = memo(({ className = '' }) => (
    <div
        className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
    >
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-100 to-primary" />

        {/* Floating circles */}
        <FloatingCircles
            count={10}
            minSize={8}
            maxSize={20}
            opacity={0.04}
        />

        {/* Grid pattern */}
        <GridPattern size={100} opacity={0.01} />

        {/* Vignette */}
        <RadialGradient />
    </div>
))

FullPageBackground.displayName = 'FullPageBackground'

export { FloatingCircles, GridPattern, RadialGradient, FullPageBackground }
export default FloatingCircles
