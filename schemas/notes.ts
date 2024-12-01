import { z } from 'zod'

export const createNoteSchema = z.object({ title: z.string().trim().min(1) })
export type CreateNoteSchema = z.infer<typeof createNoteSchema>
