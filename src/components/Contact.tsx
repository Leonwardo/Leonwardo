import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  t: any
}

export default function Contact({ t }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-anim',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Mailto fallback for simplicity + Hostinger compatibility
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:fleonwardo@gmail.com?subject=${subject}&body=${body}`
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    }, 800)
  }

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative bg-surface-elevated/40">
      <div className="max-w-5xl mx-auto">
        <div className="contact-anim">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">
            {t.contact.label}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-zinc-400 max-w-xl mb-14">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <form onSubmit={handleSubmit} className="contact-anim space-y-5">
            <div>
              <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                {t.contact.form.name}
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-surface-card border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                {t.contact.form.email}
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-surface-card border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                {t.contact.form.message}
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-surface-card border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto bg-accent hover:bg-accent-light disabled:opacity-60 text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all"
            >
              {status === 'sending'
                ? t.contact.form.sending
                : status === 'success'
                ? t.contact.form.success
                : t.contact.form.send}
            </button>
          </form>

          <div className="contact-anim space-y-8">
            <p className="text-sm text-zinc-500 uppercase tracking-wider">{t.contact.or}</p>
            <div className="space-y-4">
              <a
                href="mailto:fleonwardo@gmail.com"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl border border-zinc-700 flex items-center justify-center group-hover:border-accent transition-colors">
                  <Mail size={18} />
                </div>
                <span>fleonwardo@gmail.com</span>
              </a>
              <a
                href="mailto:operations@xdeltacore.com"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl border border-zinc-700 flex items-center justify-center group-hover:border-gold transition-colors">
                  <Mail size={18} />
                </div>
                <span>operations@xdeltacore.com</span>
              </a>
              <a
                href="https://github.com/Leonwardo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl border border-zinc-700 flex items-center justify-center group-hover:border-accent transition-colors">
                  <Github size={18} />
                </div>
                <span>github.com/Leonwardo</span>
              </a>
              <a
                href="https://www.linkedin.com/in/leonwardo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl border border-zinc-700 flex items-center justify-center group-hover:border-accent transition-colors">
                  <Linkedin size={18} />
                </div>
                <span>linkedin.com/in/leonwardo</span>
              </a>
              <a
                href="https://xdeltacore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl border border-zinc-700 flex items-center justify-center group-hover:border-gold transition-colors">
                  <ExternalLink size={18} />
                </div>
                <span>xdeltacore.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
