// Bunting hung along a gentle curve, the flyer's three colours in turn. The
// SVG keeps its proportions and is cropped from the middle on a narrow
// screen, so the pennants never stretch.

const COLORS = ['var(--sun)', 'var(--meadow)', 'var(--berry)']

type Props = { offset?: number; className?: string }

export const Garland = ({ offset = 0, className }: Props) => {
  const width = 1440
  const height = 96
  const top = 8
  const sag = 34
  const count = 26
  const pw = 36
  const ph = 44
  const y = (x: number) => {
    const t = x / width
    return top + sag * 4 * t * (1 - t)
  }
  const line = Array.from({ length: width / 20 + 1 }, (_, i) => `${i * 20},${y(i * 20).toFixed(1)}`).join(' ')
  const step = width / count
  const flags = Array.from({ length: count }, (_, i) => {
    const x0 = i * step + (step - pw) / 2
    const x1 = x0 + pw
    const xm = (x0 + x1) / 2
    const points = `${x0.toFixed(1)},${y(x0).toFixed(1)} ${x1.toFixed(1)},${y(x1).toFixed(1)} ${xm.toFixed(1)},${(y(xm) + ph).toFixed(1)}`
    return <polygon key={i} points={points} fill={COLORS[(i + offset) % COLORS.length]} />
  })

  return (
    <svg
      className={className ? `garland ${className}` : 'garland'}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      focusable="false"
    >
      <polyline points={line} fill="none" stroke="var(--string)" strokeWidth="2" />
      {flags}
    </svg>
  )
}
