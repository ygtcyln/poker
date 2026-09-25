import merdoPhoto from '../assets/merdo.png'
import type { PlayerIconProps } from '../types'

export function IconMerdoPhoto({ className }: PlayerIconProps) {
  return (
    <img
      src={merdoPhoto}
      alt=""
      className={`shrink-0 rounded-full object-cover ${className ?? ''}`}
    />
  )
}
