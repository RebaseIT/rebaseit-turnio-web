import { useState, useEffect } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('md')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      
      let newBreakpoint: Breakpoint = 'xs'
      if (width >= breakpoints['2xl']) newBreakpoint = '2xl'
      else if (width >= breakpoints.xl) newBreakpoint = 'xl'
      else if (width >= breakpoints.lg) newBreakpoint = 'lg'
      else if (width >= breakpoints.md) newBreakpoint = 'md'
      else if (width >= breakpoints.sm) newBreakpoint = 'sm'
      
      setBreakpoint(newBreakpoint)
      setIsMobile(width < breakpoints.md)
      setIsTablet(width >= breakpoints.md && width < breakpoints.lg)
      setIsDesktop(width >= breakpoints.lg)
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmall: breakpoint === 'sm' || breakpoint === 'xs',
    isMedium: breakpoint === 'md',
    isLarge: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  }
} 