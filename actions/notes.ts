'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'
import { createNoteSchema } from '@/schemas/notes'

export const saveNote = actionClient.schema(createNoteSchema).action(async ({ parsedInput: { title } }) => {
  if (!title || title === 'error') throw new Error('Title is required')
  const supabase = await createClient()

  const { data, error } = await supabase.from('notes').insert([{ title, user_id: (await supabase.auth.getUser()).data.user?.id }])
  if (error) throw new Error('Error saving note')

  revalidatePath('')
})

type Previous = {
  data: any
  error: any
}

export const deleteNote = async (_: Previous, queryData: FormData) => {
  const supabase = await createClient()

  const id = queryData.get('id')?.toString()

  if (!id) {
    return { data: null, error: 'ID is required' }
  }

  // Delete note from the database
  const { data, error } = await supabase.from('notes').delete().eq('id', id)

  revalidatePath('')
  return { data, error }
}

export const editNote = async (_: Previous, queryData: FormData) => {
  const supabase = await createClient()

  const id = queryData.get('id')?.toString()
  const title = queryData.get('title')?.toString()

  if (!id || !title) {
    return { data: null, error: 'ID and title are required' }
  }

  // Update note in the database
  const { data, error } = await supabase.from('notes').update({ title }).eq('id', id)

  console.log(data, error)

  revalidatePath('')
  return { data: title, error }
}
