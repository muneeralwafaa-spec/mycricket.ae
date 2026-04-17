import Link from 'next/link'
import { GOVERNING_BODIES } from '@/lib/utils'

export default function CouncilsSection() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--green)' }}>
            Official Bodies
          </div>
          <h2 className="font-display text-5xl tracking-wide" style={{ color: 'var(--ink)' }}>
            Councils & Governing Boards
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-light)' }}>
            Official contacts, resources and links for UAE cricket's governing bodies.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {GOVERNING_BODIES.map(body => (
            <a key={body.id}
              href={body.website ?? '#'}
              target={body.website ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="no-underline rounded-xl p-5 text-center block transition-all duration-200 hover:-translate-y-1 group"
              style={{ background: '#fff', border: '1px solid var(--border)' }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{ background: 'var(--green-light)' }}>
                {body.icon}
              </div>
              <div className="text-xs font-medium leading-tight mb-1 group-hover:text-[var(--green)] transition-colors"
                style={{ color: 'var(--ink)' }}>
                {body.name}
              </div>
              <div className="text-xs font-mono-dm" style={{ color: 'var(--ink-light)' }}>
                {body.short_name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
