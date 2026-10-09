import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import XDC from './components/XDC'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const { lang, t, toggle: toggleLang } = useLanguage()
  const { theme, toggle: toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        <Header
          lang={lang}
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleLang={toggleLang}
          t={t}
          scrolled={scrolled}
        />
        <main>
          <Hero t={t} />
          <About t={t} />
          <Skills t={t} />
          <Work t={t} />
          <XDC t={t} />
          <Contact t={t} />
        </main>
        <Footer t={t} />
      </div>
    </>
  )
}
