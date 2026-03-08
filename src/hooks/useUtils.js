import { useState, useEffect, useCallback } from 'react'

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handler = (event) => setPrefersReducedMotion(event.matches)
        mediaQuery.addEventListener('change', handler)

        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return prefersReducedMotion
}

/**
 * Hook to detect screen size
 */
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        setMatches(mediaQuery.matches)

        const handler = (event) => setMatches(event.matches)
        mediaQuery.addEventListener('change', handler)

        return () => mediaQuery.removeEventListener('change', handler)
    }, [query])

    return matches
}

/**
 * Hook to track scroll position
 */
export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollPosition
}

/**
 * Hook for scroll progress (0 to 1)
 */
export const useScrollProgress = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollProgress = scrollTop / docHeight
            setProgress(Math.min(Math.max(scrollProgress, 0), 1))
        }

        window.addEventListener('scroll', updateProgress, { passive: true })
        updateProgress()

        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return progress
}

/**
 * Hook for local storage with state sync
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    return [storedValue, setValue]
}

/**
 * Hook for debouncing values
 */
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

/**
 * Hook for detecting clicks outside an element
 */
export const useClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handler(event)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}

/**
 * Hook for keyboard shortcuts
 */
export const useKeyPress = (targetKey, handler) => {
    useEffect(() => {
        const keyHandler = (event) => {
            if (event.key === targetKey) {
                handler(event)
            }
        }

        window.addEventListener('keydown', keyHandler)
        return () => window.removeEventListener('keydown', keyHandler)
    }, [targetKey, handler])
}
