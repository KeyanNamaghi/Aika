import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Stack } from '@/components/layouts'
import Events from './client'

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
      <Events events={events ?? []} />
    </Stack>
  )
}
