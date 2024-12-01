import { z } from 'zod'

export const createNoteSchema = z.object({ title: z.string().trim().min(1) })
export type CreateNoteSchema = z.infer<typeof createNoteSchema>

export const deleteNoteSchema = z.object({ id: z.number() })
export type DeleteNoteSchema = z.infer<typeof deleteNoteSchema>

export const updateNoteSchema = z.object({ title: z.string().trim().min(1), id: z.number() })
export type UpdateNoteSchema = z.infer<typeof updateNoteSchema>
