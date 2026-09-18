import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface ThemeToggleProps {
  compact?: boolean
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative flex items-center rounded-full border transition-all duration-300 ${
        compact
          ? 'w-9 h-9 justify-center border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)]'
          : 'w-14 h-7 px-1 border-[var(--border-md)] ' + (isDark ? 'bg-[#1E293B]' : 'bg-[#E2E8F0]')
      }`}
    >
      {compact ? (
        isDark ? <Sun size={15} /> : <Moon size={15} />
      ) : (
        <>
          {/* Track icons */}
          <Moon size={12} className={`absolute left-1.5 transition-opacity duration-200 ${isDark ? 'opacity-100 text-[#94A3B8]' : 'opacity-0'}`} />
          <Sun size={12} className={`absolute right-1.5 transition-opacity duration-200 ${!isDark ? 'opacity-100 text-[#D97706]' : 'opacity-0'}`} />
          {/* Thumb */}
          <span
            className={`w-5 h-5 rounded-full shadow-sm flex items-center justify-center transition-all duration-300 ${
              isDark
                ? 'translate-x-0 bg-[#334155]'
                : 'translate-x-7 bg-white'
            }`}
          >
            {isDark
              ? <Moon size={10} className="text-[#94A3B8]" />
              : <Sun size={10} className="text-[#D97706]" />
            }
          </span>
        </>
      )}
    </button>
  )
}
