import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AboutProps {
  t: any
}

export default function About({ t }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div ref={contentRef} className="space-y-8">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
            {t.about.label}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white max-w-2xl">
            {t.about.title}
          </h2>
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 mt-12">
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
            <div className="space-y-6">
              <p className="text-zinc-300 leading-relaxed text-lg">{t.about.p3}</p>
              <div className="pt-6 border-t border-zinc-800">
                <p className="text-sm text-zinc-500 mb-1">Leonardo Charraz Forte</p>
                <p className="text-white font-medium">Leonwardo · Founder & Full-stack Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
