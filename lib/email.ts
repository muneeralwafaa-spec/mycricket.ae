// Email via Resend — https://resend.com

const RESEND_API = 'https://api.resend.com/emails'

interface EmailPayload {
  to: string | string[]
  subject: string
  html: string
  from?: string
  reply_to?: string
}

async function sendEmail(payload: EmailPayload): Promise<{ id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — email not sent')
    return { error: 'Email service not configured' }
  }

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: payload.from ?? process.env.EMAIL_FROM ?? 'MyCricket.ae <hello@mycricket.ae>',
        to: Array.isArray(payload.to) ? payload.to : [payload.to],
        subject: payload.subject,
        html: payload.html,
        reply_to: payload.reply_to,
      }),
    })
    const data = await res.json()
    if (!res.ok) return { error: data.message ?? 'Failed to send email' }
    return { id: data.id }
  } catch (err) {
    return { error: String(err) }
  }
}

// ── Email templates ────────────────────────────────────────

const baseStyle = `
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #faf8f3;
  color: #0d1f0f;
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
`

const headerHtml = (title: string) => `
  <div style="background: #0d1f0f; padding: 28px 32px; border-bottom: 3px solid #c8961e;">
    <div style="font-family: Impact, Arial Black, sans-serif; font-size: 22px; letter-spacing: 3px; color: #fff;">
      MY<span style="color: #c8961e;">CRICKET</span>.AE
    </div>
    <div style="font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 6px;">${title}</div>
  </div>
`

const footerHtml = `
  <div style="background: #070e08; padding: 20px 32px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.3);">
    MyCricket.ae — UAE's Home of Cricket<br>
    <a href="https://mycricket.ae" style="color: #c8961e; text-decoration: none;">mycricket.ae</a>
  </div>
`

export async function sendTourRegistrationConfirmation(opts: {
  to: string
  teamName: string
  contactName: string
  direction: string
  destination: string
  dates: string
  teamSize: number
}) {
  const isOutbound = opts.direction === 'uae-outbound'
  const dirLabel = isOutbound ? 'Touring Abroad' : 'Touring UAE'

  return sendEmail({
    to: opts.to,
    subject: `Tour Registration Confirmed — ${opts.teamName} | MyCricket.ae`,
    html: `
      <div style="${baseStyle}">
        ${headerHtml('Cricket Tours Connect')}
        <div style="padding: 32px;">
          <p style="font-size: 15px; margin-bottom: 16px;">Hi ${opts.contactName},</p>
          <p style="font-size: 14px; color: #5a7060; line-height: 1.7; margin-bottom: 24px;">
            Your tour registration has been received! Our team will review and connect you with matching teams within <strong style="color: #0d1f0f;">48 hours</strong>.
          </p>
          <div style="background: #e8f5ee; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(26,122,74,0.15);">
            <div style="font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #1a7a4a; margin-bottom: 12px;">Registration Summary</div>
            ${[
              ['Team Name', opts.teamName],
              ['Tour Type', dirLabel],
              ['Destination / Location', opts.destination],
              ['Travel Dates', opts.dates],
              ['Team Size', `${opts.teamSize} players`],
            ].map(([k, v]) => `
              <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(26,122,74,0.1); font-size: 13px;">
                <span style="color: #5a7060;">${k}</span>
                <span style="font-weight: 600; color: #0d1f0f;">${v}</span>
              </div>
            `).join('')}
          </div>
          <p style="font-size: 13px; color: #5a7060; line-height: 1.7;">
            We'll be in touch shortly. If you have any questions, reply to this email or WhatsApp us.
          </p>
        </div>
        ${footerHtml}
      </div>
    `,
  })
}

export async function sendTourAdminNotification(opts: {
  teamName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  direction: string
  destination: string
  dates: string
  teamSize: number
  notes?: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@mycricket.ae'

  return sendEmail({
    to: adminEmail,
    reply_to: opts.contactEmail,
    subject: `New Tour Registration: ${opts.teamName} — ${opts.direction}`,
    html: `
      <div style="${baseStyle}">
        ${headerHtml('New Tour Registration')}
        <div style="padding: 32px;">
          <p style="font-size: 14px; color: #5a7060; margin-bottom: 20px;">A new cricket tour registration has been submitted.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            ${[
              ['Team', opts.teamName],
              ['Contact', opts.contactName],
              ['Email', opts.contactEmail],
              ['Phone', opts.contactPhone],
              ['Direction', opts.direction],
              ['Destination', opts.destination],
              ['Dates', opts.dates],
              ['Team Size', String(opts.teamSize)],
              ['Notes', opts.notes ?? '—'],
            ].map(([k, v]) => `
              <tr>
                <td style="padding: 8px 12px; background: #f5f3ee; font-weight: 600; width: 140px;">${k}</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e0ddd5;">${v}</td>
              </tr>
            `).join('')}
          </table>
          <div style="margin-top: 24px;">
            <a href="https://mycricket.ae/admin/tours" style="background: #c8961e; color: #0d1f0f; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
              Review in Admin Dashboard →
            </a>
          </div>
        </div>
        ${footerHtml}
      </div>
    `,
  })
}

export async function sendOrderConfirmation(opts: {
  to: string
  customerName: string
  orderNumber: string
  items: Array<{ name: string; qty: number; price: number }>
  total: number
}) {
  return sendEmail({
    to: opts.to,
    subject: `Order Confirmed — ${opts.orderNumber} | MyCricket.ae`,
    html: `
      <div style="${baseStyle}">
        ${headerHtml('Order Confirmation')}
        <div style="padding: 32px;">
          <h2 style="font-size: 22px; margin-bottom: 8px;">Thanks for your order, ${opts.customerName.split(' ')[0]}! 🏏</h2>
          <p style="font-size: 13px; color: #5a7060; margin-bottom: 24px;">
            Order <strong>${opts.orderNumber}</strong> has been confirmed and will be processed shortly.
          </p>
          <div style="background: #e8f5ee; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            ${opts.items.map(i => `
              <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid rgba(26,122,74,0.1);">
                <span>${i.name} × ${i.qty}</span>
                <span style="font-weight: 600;">AED ${(i.price * i.qty).toLocaleString()}</span>
              </div>
            `).join('')}
            <div style="display: flex; justify-content: space-between; padding: 10px 0 0; font-size: 15px; font-weight: 700;">
              <span>Total</span>
              <span style="color: #1a7a4a;">AED ${opts.total.toLocaleString()}</span>
            </div>
          </div>
          <a href="https://mycricket.ae/account/orders" style="background: #1a7a4a; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
            Track Your Order →
          </a>
        </div>
        ${footerHtml}
      </div>
    `,
  })
}

export async function sendWelcomeEmail(opts: { to: string; name: string }) {
  return sendEmail({
    to: opts.to,
    subject: 'Welcome to MyCricket.ae — UAE\'s Home of Cricket 🏏',
    html: `
      <div style="${baseStyle}">
        ${headerHtml('Welcome!')}
        <div style="padding: 32px;">
          <h2 style="font-size: 22px; margin-bottom: 8px;">Welcome aboard, ${opts.name.split(' ')[0]}! 🏏</h2>
          <p style="font-size: 14px; color: #5a7060; line-height: 1.7; margin-bottom: 24px;">
            You're now part of UAE's cricket community. Explore academies, find coaches, shop for gear, or list your own cricket business — all in one place.
          </p>
          <div style="display: grid; gap: 10px; margin-bottom: 24px;">
            ${[
              ['🏟️ Find Academies', '/academies'],
              ['👤 Find Coaches', '/coaches'],
              ['🛒 Cricket Shop', '/shop'],
              ['✈️ Cricket Tours', '/tours'],
            ].map(([label, href]) => `
              <a href="https://mycricket.ae${href}" style="display: block; background: #e8f5ee; color: #0d1f0f; padding: 12px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;">
                ${label}
              </a>
            `).join('')}
          </div>
        </div>
        ${footerHtml}
      </div>
    `,
  })
}
