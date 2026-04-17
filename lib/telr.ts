// Telr Payment Gateway Integration
// Docs: https://telr.com/support/article/hosted-payment-page-integration/

export interface TelrOrder {
  order_id: string          // your internal order reference
  amount: number            // AED amount
  description: string       // shown on payment page
  customer_name: string
  customer_email: string
  customer_phone?: string
  return_url: string        // redirect after success
  decline_url: string       // redirect after failure
  cancel_url: string        // redirect on cancel
  billing_address?: {
    address_1?: string
    city?: string
    country?: string        // ISO 2-letter, e.g. "AE"
  }
}

export interface TelrResponse {
  order: {
    ref: string             // Telr transaction reference
    url: string             // redirect user to this URL
  }
}

export interface TelrVerification {
  order: {
    ref: string
    status: { code: string; text: string }
    transaction: {
          ref: string
      type: string
      class: string
          status: string
          amount: string
      currency: string
        }
    }
  }

const TELR_API_URL = 'https://secure.telr.com/gateway/order.json'

/**
 * Create a Telr hosted payment page and get the redirect URL
 */
export async function createTelrPayment(order: TelrOrder): Promise<{ url: string; ref: string } | { error: string }> {
  const storeId = process.env.TELR_STORE_ID
  const authKey = process.env.TELR_AUTH_KEY

  if (!storeId || !authKey) {
    return { error: 'Telr credentials not configured' }
  }

  const isTest = process.env.NODE_ENV !== 'production'

  const payload = {
    ivp_method: 'create',
    ivp_store: storeId,
    ivp_authkey: authKey,
    ivp_cart: order.order_id,
    ivp_test: isTest ? 1 : 0,
    ivp_amount: order.amount.toFixed(2),
    ivp_currency: 'AED',
    ivp_desc: order.description,
    return_auth: order.return_url,
    return_decl: order.decline_url,
    return_can: order.cancel_url,
    bill_fname: order.customer_name.split(' ')[0] ?? order.customer_name,
    bill_sname: order.customer_name.split(' ').slice(1).join(' ') || '-',
    bill_email: order.customer_email,
    bill_tel: order.customer_phone ?? '',
    bill_addr1: order.billing_address?.address_1 ?? '',
    bill_city: order.billing_address?.city ?? 'Dubai',
    bill_country: order.billing_address?.country ?? 'AE',
  }

  try {
    const res = await fetch(TELR_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json() as TelrResponse

    if (!data.order?.url) {
      return { error: 'Failed to get payment URL from Telr' }
    }

    return { url: data.order.url, ref: data.order.ref }
  } catch (err) {
    return { error: `Telr API error: ${String(err)}` }
  }
}

/**
 * Verify a Telr transaction after redirect
 */
export async function verifyTelrPayment(ref: string): Promise<TelrVerification | { error: string }> {
  const storeId = process.env.TELR_STORE_ID
  const authKey = process.env.TELR_AUTH_KEY

  if (!storeId || !authKey) return { error: 'Telr credentials not configured' }

  try {
    const res = await fetch(TELR_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ivp_method: 'check',
        ivp_store: storeId,
        ivp_authkey: authKey,
        order_ref: ref,
      }),
    })

    return await res.json() as TelrVerification
  } catch (err) {
    return { error: `Telr verify error: ${String(err)}` }
  }
}

/**
 * Map Telr status codes to readable status
 */
export function getTelrStatus(code: string): 'success' | 'pending' | 'failed' | 'cancelled' {
  switch (code) {
    case '3': return 'success'     // Authorised
    case '2': return 'pending'     // Pending
    case '-1': return 'cancelled'  // Cancelled
    default: return 'failed'
  }
}
