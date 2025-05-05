import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Note } from './note'
import Link from 'next/link'
import { Stack } from '@/components/layouts'
import { Event } from './event'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: events } = await supabase.from('events').select()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <Stack direction='col' align='center' className='m-auto max-w-2xl'>
      <Link href='/protected/create-event'>
        <h1 className='text-2xl font-bold'>Create Event</h1>
      </Link>
      {events && (
        <div className='flex w-full flex-col gap-2'>
          {events.map((event) => (
            <Event key={event.id} {...event} />
          ))}
        </div>
      )}
    </Stack>
  )
}
