import { z } from 'zod'

export enum Colour {
  Amber = 'amber',
  Lime = 'lime',
  Emerald = 'emerald',
  Sky = 'sky',
  Indigo = 'indigo',
  Violet = 'violet',
  Fuchsia = 'fuchsia',
  Rose = 'rose',
}

export const createEventSchema = z.object({
  title: z.string().trim().min(1),
  colour: z.nativeEnum(Colour),
  isGood: z.string(),
})
export type CreateEventSchema = z.infer<typeof createEventSchema>
