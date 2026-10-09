import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Server, Layout, Database, Bot } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const icons = [Server, Layout, Database, Bot]
const techs = ['PHP', 'SQL', 'React', 'HTML', 'Lua', 'APIs', 'XAMPP', 'Automation']

interface SkillsProps {
  t: any
}

export default function Skills({ t }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-card',
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
    <section id="skills" ref={sectionRef} className="section-padding relative bg-surface-elevated/50">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
          {t.skills.label}
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-16">
          {t.skills.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {t.skills.items.map((item: any, i: number) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className="skill-card group p-6 rounded-2xl border border-zinc-800 bg-surface-card/50 hover:border-accent/40 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div>
          <p className="text-sm text-zinc-500 mb-5 tracking-wide uppercase">{t.skills.tech}</p>
          <div className="flex flex-wrap gap-3">
            {techs.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-zinc-700 text-sm text-zinc-300 hover:border-accent hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
