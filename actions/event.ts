'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

import { actionClient } from '@/lib/safe-action'
import { createEventSchema, deleteEventSchema, updateEventSchema } from '@/schemas/event'

export const createEvent = actionClient.schema(createEventSchema).action(async ({ parsedInput: { title } }) => {
  if (!title || title === 'error') throw new Error('Title is required')

  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user?.id) {
    throw new Error('User is not authenticated')
  }

  const userId = userData.user.id

  const { error } = await supabase.from('events').insert([
    {
      user_id: userId,
      name: title,
      description: 'test',
    },
  ])

  if (error) throw new Error('Error saving Event')
  revalidatePath('')
})

export const deleteEvent = actionClient.schema(deleteEventSchema).action(async ({ parsedInput: { id } }) => {
  if (!id) throw new Error('Title is required')
  const supabase = await createClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw new Error('Error deleting Event')
  revalidatePath('')
})

// export const updateEvent = actionClient.schema(updateEventSchema).action(async ({ parsedInput: { id, title } }) => {
//   if (!title || !id || title === 'error') throw new Error('Title is required')
//   const supabase = await createClient()
//   const { error } = await supabase.from('events').update({ title }).eq('id', id)
//   if (error) throw new Error('Error saving Event')
//   revalidatePath('')
// })

export const createOccurrence = actionClient.schema(createEventSchema).action(async ({ parsedInput: { title } }) => {
  if (!title || title === 'error') throw new Error('Title is required')
  const supabase = await createClient()
  const { error } = await supabase.from('event_occurrences').insert([
    {
      event_id: 'f07ccb50-1e2b-4420-84bb-12432a529b82',
      notes: 'Some notes',
    },
  ])
  if (error) {
    console.error({ error })
    throw new Error('Error saving occurrence')
  }
  revalidatePath('')
})
