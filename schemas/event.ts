import { z } from 'zod'

export const createEventSchema = z.object({ title: z.string().trim().min(1) })
export type CreateEventSchema = z.infer<typeof createEventSchema>

export const deleteEventSchema = z.object({ id: z.number() })
export type DeleteEventSchema = z.infer<typeof deleteEventSchema>

export const updateEventSchema = z.object({ title: z.string().trim().min(1), id: z.number() })
export type UpdateEventSchema = z.infer<typeof updateEventSchema>
