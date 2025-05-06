'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

import { actionClient } from '@/lib/safe-action'
import { createOccurrenceSchema, createEventSchema, deleteEventSchema, updateEventSchema } from '@/schemas/event'
import { redirect } from 'next/navigation'

export const createEvent = actionClient
  .schema(createEventSchema)
  .action(async ({ parsedInput: { name, description } }) => {
    if (!name || name === 'error') throw new Error('Name is required')

    const supabase = await createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user?.id) {
      throw new Error('User is not authenticated')
    }

    const { error } = await supabase.from('events').insert([
      {
        user_id: userData.user.id,
        name,
        description,
      },
    ])

    if (error) {
      console.error({ error })
      throw new Error('Error saving Event')
    }

    redirect('/protected')
  })

export const deleteEvent = actionClient.schema(deleteEventSchema).action(async ({ parsedInput: { id } }) => {
  if (!id) throw new Error('Title is required')
  const supabase = await createClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw new Error('Error deleting Event')
  revalidatePath('')
})

export const deleteEventAction = async (formData: FormData) => {
  const id = formData.get('id')
  if (!id) throw new Error('Title is required')
  const supabase = await createClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw new Error('Error deleting Event')
  revalidatePath('')
}

// export const updateEvent = actionClient.schema(updateEventSchema).action(async ({ parsedInput: { id, title } }) => {
//   if (!title || !id || title === 'error') throw new Error('Title is required')
//   const supabase = await createClient()
//   const { error } = await supabase.from('events').update({ title }).eq('id', id)
//   if (error) throw new Error('Error saving Event')
//   revalidatePath('')
// })

export const createOccurrence = actionClient
  .schema(createOccurrenceSchema)
  .action(async ({ parsedInput: { event_id, notes } }) => {
    if (!event_id) throw new Error('event_id is required')
    const supabase = await createClient()
    const { error } = await supabase.from('event_occurrences').insert([{ event_id, notes }])
    if (error) {
      console.error({ error })
      throw new Error('Error saving occurrence')
    }
    revalidatePath('')
  })
