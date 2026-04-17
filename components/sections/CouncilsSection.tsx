import { GOVERNING_BODIES } from '@/lib/utils'

export default function CouncilsSection() {
  return (
    <section style={{ background: 'var(--white)', padding: '4rem 0' }}>
      <div className="container-uae">
        <div className="mb-8">
          <div className="font-mono-dm text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--red)' }}>Official Bodies</div>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--black)' }}>Councils & Governing Boards</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-light)' }}>Official contacts, resources and links for UAE cricket's governing bodies.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {GOVERNING_BODIES.map(body => (
            <a key={body.id} href={body.website ?? '#'} target={body.website ? '_blank' : undefined} rel="noopener noreferrer"
              className="rounded-2xl p-5 text-center block card-hover group"
              style={{ background: 'var(--off-white)', border: '1px solid var(--border)' }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{ background: 'var(--green-light)', transition: 'background 0.2s' }}>
                {body.icon}
              </div>
              <div className="text-xs font-medium leading-tight mb-1 group-hover:text-[var(--red)] transition-colors"
                style={{ color: 'var(--black)' }}>
                {body.name}
              </div>
              <div className="font-mono-dm text-xs" style={{ color: 'var(--ink-light)' }}>{body.short_name}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
