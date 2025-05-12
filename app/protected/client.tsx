'use client'
import Link from 'next/link'
import { Stack } from '@/components/layouts'
import { Event } from './event'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import type { Database } from '../../database.types'
import { useState } from 'react'
type Event = Database['public']['Tables']['events']['Row']

export default function Client({ events }: { events: Event[] }) {
  const [search, setSearch] = useState('')
  return (
    <>
      <Stack direction='row' gap='2' className='w-full'>
        <Input type='text' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button asChild variant='default'>
          <Link href='/protected/create-event'>Create new</Link>
        </Button>
      </Stack>
      {events.length > 0 && (
        <div className='flex w-full flex-col gap-2'>
          {events
            .filter((e) => e.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
            .map((event) => (
              <Event key={event.id} {...event} />
            ))}
        </div>
      )}
    </>
  )
}
