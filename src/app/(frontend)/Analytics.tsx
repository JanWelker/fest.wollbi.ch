// Umami, first-party on the cluster. data-domains is what keeps a local
// `npm run dev` out of the numbers: the tracker checks the page's hostname
// before it sends anything. See homelab-apps/docs/umami.md.
export const Analytics = () => (
  <script
    defer
    src="https://analytics.k8s.wlkr.ch/script.js"
    data-website-id="418dd2de-16aa-43bc-9704-68f3b88fb174"
    data-domains="fest.wollbi.ch"
  />
)
