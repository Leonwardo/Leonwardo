import { Moon, Sun, Globe } from 'lucide-react'
import { cn } from '../lib/utils'
import type { Lang } from '../i18n/translations'

interface HeaderProps {
  lang: Lang
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onToggleLang: () => void
  t: any
  scrolled: boolean
}

export default function Header({ lang, theme, onToggleTheme, onToggleLang, t, scrolled }: HeaderProps) {
  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#work', label: t.nav.work },
    { href: '#xdc', label: t.nav.xdc },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'py-3 glass' : 'py-5 bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="group flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-white group-hover:text-accent transition-colors">
            Leonwardo
          </span>
          <span className="hidden sm:inline text-[10px] tracking-widest uppercase text-zinc-500 border border-zinc-700 px-1.5 py-0.5 rounded">
            XDC
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:border-accent hover:text-white transition-all"
            aria-label="Toggle language"
          >
            <Globe size={14} />
            {lang.toUpperCase()}
          </button>
          <button
            onClick={onToggleTheme}
            className="rounded-full border border-zinc-700 p-2 text-zinc-300 hover:border-accent hover:text-white transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  )
}
