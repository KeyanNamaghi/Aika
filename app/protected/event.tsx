'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Body, Caption } from '@/components/typography'
import { Database } from '@/database.types'
import { Stack } from '@/components/layouts'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { EllipsisVertical } from 'lucide-react'

export const Event = ({
  created_at,
  description,
  id,
  last_occurred_at,
  name,
  updated_at,
  user_id,
}: Database['public']['Tables']['events']['Row']) => {
  return (
    <Card>
      <CardHeader>
        <Stack align='center' justify='between' direction='row'>
          <CardTitle>{name}</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button size='icon' variant='ghost'>
                <EllipsisVertical size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form className='flex'>
                <Button type='submit' variant='destructive'>
                  Sign out
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </Stack>
      </CardHeader>
      <CardContent>
        <Stack>
          {description && <Body>{description}</Body>}
          {created_at && <Caption>Created on {new Date(created_at).toLocaleString()}</Caption>}
          {last_occurred_at && <Caption>last_occurred_at on {new Date(last_occurred_at).toLocaleString()}</Caption>}
        </Stack>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  )
}
