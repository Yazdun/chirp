import { FiSun } from 'react-icons/fi'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { RiMoonCloudyLine } from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'

const framer_theme = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
}

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const dark_system_theme =
    theme === 'system' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = theme === 'dark' || dark_system_theme

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      className="flex items-center justify-between rounded-md border-2 p-2 dark:border-slate-700"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <div className="sr-only">
          {isDark ? 'activate light mode' : 'activate dark mode'}
        </div>
        <motion.span
          {...framer_theme}
          className="flex"
          key={isDark ? 'dark' : 'light'}
        >
          {isDark ? (
            <RiMoonCloudyLine className="text-[1.2rem]" />
          ) : (
            <FiSun className="text-[1.2rem]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
