'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

import { actionClient } from '@/lib/safe-action'
import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from '@/schemas/notes'

export const createNote = actionClient.schema(createNoteSchema).action(async ({ parsedInput: { title } }) => {
  if (!title || title === 'error') throw new Error('Title is required')
  const supabase = await createClient()
  const { error } = await supabase
    .from('notes')
    .insert([{ title, user_id: (await supabase.auth.getUser()).data.user?.id, created_date: new Date().toString() }])
  if (error) throw new Error('Error saving note')
  revalidatePath('')
})

export const deleteNote = actionClient.schema(deleteNoteSchema).action(async ({ parsedInput: { id } }) => {
  if (!id) throw new Error('Title is required')
  const supabase = await createClient()
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) throw new Error('Error deleting note')
  revalidatePath('')
})

export const updateNote = actionClient.schema(updateNoteSchema).action(async ({ parsedInput: { id, title } }) => {
  if (!title || !id || title === 'error') throw new Error('Title is required')
  const supabase = await createClient()
  const { error } = await supabase.from('notes').update({ title }).eq('id', id)
  if (error) throw new Error('Error saving note')
  revalidatePath('')
})
