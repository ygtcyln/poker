import type { ReactNode, SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  )
}

// --- Sistem / arayüz ikonları -------------------------------------------

export function IconArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="11 18 5 12 11 6" />
    </Icon>
  )
}

export function IconChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  )
}

export function IconChevronUp(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="6 15 12 9 18 15" />
    </Icon>
  )
}

export function IconTrophy(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H5a2 2 0 0 0 0 4h2" />
      <path d="M17 6h2a2 2 0 0 1 0 4h-2" />
      <line x1="12" y1="14" x2="12" y2="17" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="17" x2="9" y2="20" />
      <line x1="12" y1="17" x2="15" y2="20" />
    </Icon>
  )
}

export function IconMedal(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 3l3 6" />
      <path d="M16 3l-3 6" />
      <circle cx="12" cy="15" r="6" />
      <path d="M12 12v3l2 1.5" />
    </Icon>
  )
}

export function IconCards(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="12" height="16" rx="2" transform="rotate(-8 9 13)" />
      <rect x="8" y="4" width="13" height="17" rx="2" />
      <line x1="12" y1="9" x2="17" y2="9" />
      <line x1="12" y1="13" x2="17" y2="13" />
    </Icon>
  )
}

// --- Oyuncu karakter ikonları --------------------------------------------

export function IconYinYang(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path
        d="M12 3a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 9A9 9 0 0 0 12 3Z"
        fill="currentColor"
        stroke="none"
      />
      <circle cx="12" cy="7.5" r="1.3" fill="#0f1115" stroke="none" />
      <circle cx="12" cy="16.5" r="1.3" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconNinja(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 10a7 7 0 0 1 14 0v3a7 7 0 0 1-14 0v-3Z" />
      <path d="M9 3.5C10 2.7 14 2.7 15 3.5" />
      <path d="M4.5 9.5h15" />
      <path d="M4.5 12.5h15" />
      <circle cx="9.3" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="11" r="1" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconBriefcase(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="8" width="18" height="11" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="3" y1="13" x2="21" y2="13" />
    </Icon>
  )
}

export function IconJesterHat(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 19c1-5.5 2.5-7.5 3-8-2 0-3.5-1.8-3.5-4C5.5 8 7.5 10 9 10c0-3 1-5.5 3-7.5C14 4.5 15 7 15 10c1.5 0 3.5-2 5.5-3 0 2.2-1.5 4-3.5 4 .5.5 2 2.5 3 8Z" />
      <circle cx="6.5" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="8" r="1" fill="currentColor" stroke="none" />
      <line x1="4" y1="19" x2="20" y2="19" />
    </Icon>
  )
}

export function IconClover(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 12c0-3.3-2.4-5.5-4.8-5.5a2.8 2.8 0 1 0 0 5.6c1 0 2-.4 2.8-1.1" />
      <path d="M12 12c0-3.3 2.4-5.5 4.8-5.5a2.8 2.8 0 1 1 0 5.6c-1 0-2-.4-2.8-1.1" />
      <path d="M12 12c-3.3 0-5.5 2.4-5.5 4.8a2.8 2.8 0 1 0 5.6 0c0-1-.4-2-1.1-2.8" />
      <path d="M12 12c3.3 0 5.5 2.4 5.5 4.8a2.8 2.8 0 1 1-5.6 0c0-1 .4-2 1.1-2.8" />
      <line x1="12" y1="13.5" x2="12" y2="21" />
    </Icon>
  )
}

export function IconPhone(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.5 4.5c0-1 .9-1.8 1.9-1.7l2.3.2 1.6 3.8-1.9 1.5c1 2.3 2.9 4.2 5.2 5.2l1.5-1.9 3.8 1.6.2 2.3c.1 1-.7 1.9-1.7 1.9C10.5 19.4 4.6 13.5 4.5 4.5Z" />
    </Icon>
  )
}
