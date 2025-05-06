import { z } from 'zod'

export const createEventSchema = z.object({
  name: z.string().trim().min(1),
  desirable: z.boolean().optional(),
  description: z.string().optional(),
})
export type CreateEventSchema = z.infer<typeof createEventSchema>

export const deleteEventSchema = z.object({ id: z.number() })
export type DeleteEventSchema = z.infer<typeof deleteEventSchema>

export const updateEventSchema = z.object({ title: z.string().trim().min(1), id: z.number() })
export type UpdateEventSchema = z.infer<typeof updateEventSchema>

export const createOccurrenceSchema = z.object({
  event_id: z.string().trim().min(1),
  notes: z.string().optional(),
})
export type CreateOccurrenceSchema = z.infer<typeof createOccurrenceSchema>
