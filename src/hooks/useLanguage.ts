import { useState, useCallback, useEffect } from 'react'
import { translations, type Lang } from '../i18n/translations'

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as Lang) || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const t = translations[lang]
  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'pt' : 'en'))
  }, [])

  return { lang, setLang, t, toggle }
}
