import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Note } from './note'
import Link from 'next/link'
import { Stack } from '@/components/layouts'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('events').select()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <Stack direction='col'>
      <Link href='/protected/create-event'>
        <h1 className='text-2xl font-bold'>Create Event</h1>
      </Link>
      {notes && (
        <div className='flex w-full flex-col gap-2'>
          {notes.map((note) => (
            <div key={note.id} className='w-full'>
              {note.name}
            </div>
          ))}
        </div>
      )}
    </Stack>
  )
}
