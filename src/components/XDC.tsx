import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface XDCProps {
  t: any
}

export default function XDC({ t }: XDCProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.xdc-content > *',
        { y: 50, opacity: 0 },
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
    <section id="xdc" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-gold/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="xdc-content space-y-10">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium">
            {t.xdc.label}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white max-w-2xl">
            {t.xdc.title}
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
            {t.xdc.subtitle}
          </p>

          <blockquote className="border-l-2 border-gold pl-6 py-2">
            <p className="text-xl md:text-2xl text-white font-medium italic">
              “{t.xdc.vision}”
            </p>
          </blockquote>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            {t.xdc.points.map((p: any, i: number) => (
              <div key={i} className="space-y-2">
                <h4 className="text-white font-medium">{p.title}</h4>
                <p className="text-sm text-zinc-400">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <a
              href="https://xdeltacore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white text-black hover:bg-gold px-8 py-4 rounded-full text-sm font-semibold transition-all"
            >
              {t.xdc.cta}
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
