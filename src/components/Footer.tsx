interface FooterProps {
  t: any
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-zinc-800 py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">{t.footer.rights}</p>
        <p className="text-sm text-zinc-600">{t.footer.built}</p>
      </div>
    </footer>
  )
}
