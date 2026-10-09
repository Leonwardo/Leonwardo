import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface WorkProps {
  t: any
}

export default function Work({ t }: WorkProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
          {t.work.label}
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          {t.work.title}
        </h2>
        <p className="text-zinc-400 max-w-xl mb-14">{t.work.note}</p>

        <div className="grid sm:grid-cols-2 gap-5">
          {t.work.cards.map((card: any, i: number) => (
            <div
              key={i}
              className="work-card group relative p-8 rounded-2xl border border-zinc-800 bg-surface-card/40 hover:border-accent/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
              <span className="inline-block text-[11px] tracking-widest uppercase text-accent mb-4 font-medium">
                {card.tag}
              </span>
              <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                {card.title}
                <ArrowUpRight
                  size={18}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent"
                />
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
