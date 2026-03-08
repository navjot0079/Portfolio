import { memo } from 'react'

/**
 * AnimatedBackground Component
 * 
 * A subtle, performant floating squares animation optimized for dark themes.
 * Uses CSS animations with GPU-accelerated transforms for smooth performance.
 * 
 * Features:
 * - Low-opacity blurry squares that float and rotate smoothly
 * - Staggered animation delays for organic movement
 * - Will-change hints for GPU acceleration
 * - Responsive sizing
 * - Z-index layering to stay behind content
 */

// Floating squares configuration - fewer squares, positioned at bottom to rise up
const floatingShapes = [
    { size: 'w-32 h-32 sm:w-48 sm:h-48', position: 'bottom-[5%] left-[10%]', delay: '0s', duration: '20s', type: 'square' },
    { size: 'w-24 h-24 sm:w-36 sm:h-36', position: 'bottom-[10%] right-[15%]', delay: '-4s', duration: '25s', type: 'square' },
    { size: 'w-40 h-40 sm:w-52 sm:h-52', position: 'bottom-[0%] left-[45%]', delay: '-8s', duration: '22s', type: 'square' },
    { size: 'w-20 h-20 sm:w-28 sm:h-28', position: 'bottom-[15%] right-[35%]', delay: '-12s', duration: '18s', type: 'square' },
    { size: 'w-28 h-28 sm:w-40 sm:h-40', position: 'bottom-[5%] left-[70%]', delay: '-6s', duration: '24s', type: 'square' },
]

const AnimatedBackground = memo(({
    className = '',
    variant = 'default', // 'default' | 'subtle' | 'intense'
    showGrid = false,
    showGradient = true,
    fixed = false, // When true, uses fixed positioning for full-page background
}) => {
    // Opacity variants for different intensity levels
    const opacityVariants = {
        subtle: 'opacity-[0.04]',
        default: 'opacity-[0.08]',
        intense: 'opacity-[0.12]',
    }

    const shapeOpacity = opacityVariants[variant] || opacityVariants.default
    const positionClass = fixed ? 'fixed' : 'absolute'

    return (
        <div
            className={`animated-bg-container ${positionClass} inset-0 overflow-hidden pointer-events-none ${className}`}
            aria-hidden="true"
        >
            {/* Base gradient overlay */}
            {showGradient && (
                <div className="absolute inset-0 bg-primary" />
            )}

            {/* Floating shapes */}
            <div className="animated-shapes-wrapper absolute inset-0">
                {floatingShapes.map((shape, index) => (
                    <div
                        key={index}
                        className={`
              animated-square absolute
              ${shape.size} ${shape.position} ${shapeOpacity}
              ${shape.type === 'triangle' ? 'animated-triangle' : ''}
            `}
                        style={{
                            animationDelay: shape.delay,
                            animationDuration: shape.duration,
                            backgroundColor: 'rgba(120, 120, 130, 0.6)',
                            borderRadius: shape.type === 'triangle' ? '0' : '15%',
                            filter: 'blur(2px)',
                        }}
                    />
                ))}
            </div>

            {/* Optional grid pattern overlay */}
            {showGrid && (
                <div
                    className="absolute inset-0 opacity-[0.01]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
                        backgroundSize: '100px 100px',
                    }}
                />
            )}

            {/* Subtle vignette effect for depth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(11,11,11,0.3) 100%)',
                }}
            />
        </div>
    )
})

AnimatedBackground.displayName = 'AnimatedBackground'

export default AnimatedBackground
