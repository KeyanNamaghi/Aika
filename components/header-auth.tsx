import { signOutAction } from '@/actions/auth'
import Link from 'next/link'
import { Button } from './ui/button'
import { createClient } from '@/utils/supabase/server'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { EllipsisVertical } from 'lucide-react'

export default async function AuthButton() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const firstName = user?.user_metadata.name?.split(' ')[0]

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {firstName}!
      <Popover>
        <PopoverTrigger asChild>
          <Button size='icon' variant='ghost'>
            <EllipsisVertical size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='grid gap-4'>
            <form action={signOutAction} className='flex flex-col'>
              <Button type='submit' variant='outline'>
                Sign out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ) : (
    <div className='flex gap-2'>
      <Button asChild size='sm' variant={'outline'}>
        <Link href='/sign-in'>Sign in</Link>
      </Button>
      <Button asChild size='sm' variant={'default'}>
        <Link href='/sign-up'>Sign up</Link>
      </Button>
    </div>
  )
}
