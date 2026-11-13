import type { LucideIcon } from 'lucide-react'

export type BlockId = 'instituciones' | 'economia' | 'sociedad'
export type ViaId = 'A' | 'B' | 'C' | 'D'

export interface Block {
  id: BlockId
  label: string
  short: string
  description: string
  icon: LucideIcon
}

export interface PillarAction {
  vias: ViaId[]
  text: string
}

export interface Pillar {
  number: number
  block: BlockId
  title: string
  icon: LucideIcon
  promise: string
  actions: PillarAction[]
  notes: { title: string; text: string }[]
  keywords: string[]
}

export interface Via {
  id: ViaId
  name: string
  instrument: string
  scope: string
  start: string
  icon: LucideIcon
}

export interface TimelineStage {
  range: string
  headline: string
  byVia: Record<ViaId, string>
}

export interface Province {
  code: string
  name: string
  col: number
  row: number
}

export type ParticipationType = 'fiscal' | 'voluntario' | 'propuesta'
