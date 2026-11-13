import { cn } from '../lib/utils'

interface LogoProps {
  className?: string
}

/** Isotipo: escudo minimalista con franjas patrias y Sol de Mayo */
export function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 46" className={cn('h-10 w-auto', className)} aria-hidden="true">
      <defs>
        <clipPath id="shield-clip">
          <path d="M20 1.5 37.5 7v15.5c0 10.6-7.4 18.6-17.5 22-10.1-3.4-17.5-11.4-17.5-22V7L20 1.5Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#shield-clip)">
        <rect width="40" height="46" fill="#ffffff" />
        <rect width="40" height="15" fill="#8DB8E8" />
        <rect y="31" width="40" height="15" fill="#8DB8E8" />
      </g>
      <path
        d="M20 1.5 37.5 7v15.5c0 10.6-7.4 18.6-17.5 22-10.1-3.4-17.5-11.4-17.5-22V7L20 1.5Z"
        fill="none"
        stroke="#0B1F42"
        strokeWidth="2.5"
      />
      <g transform="translate(20 23)">
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x="-0.6" y="-7.2" width="1.2" height="2.6" rx="0.6" fill="#C9A45C" transform={`rotate(${i * 22.5})`} />
        ))}
        <circle r="4" fill="#C9A45C" />
      </g>
    </svg>
  )
}
