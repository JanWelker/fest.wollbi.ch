import { headers } from 'next/headers'

// Umami, first-party on the cluster. data-domains is what keeps a local
// `npm run dev` out of the numbers: the tracker checks the page's hostname
// before it sends anything. See homelab-apps/docs/umami.md. The nonce comes
// from src/proxy.ts; 'strict-dynamic' ignores the host, so the tag needs it.
export const Analytics = async () => {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <script
      defer
      nonce={nonce}
      src="https://analytics.k8s.wlkr.ch/script.js"
      data-website-id="418dd2de-16aa-43bc-9704-68f3b88fb174"
      data-domains="fest.wollbi.ch"
    />
  )
}
