import { Heading } from '@/components/typography'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Create } from './create'

export default async function Track() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data?.user) return redirect('/sign-in')

  return (
    <div className='grid w-full max-w-2xl grid-cols-1 justify-center p-5'>
      <Heading className='mb-8'>Track something new</Heading>
      <Create />
    </div>
  )
}
