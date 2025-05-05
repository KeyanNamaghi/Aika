'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Body, Caption } from '@/components/typography'
import { Database } from '@/database.types'
import { Stack } from '@/components/layouts'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { EllipsisVertical } from 'lucide-react'
import { deleteEvent, deleteEventAction } from '@/actions/event'
import { useAction } from 'next-safe-action/hooks'
import { deleteEventSchema, DeleteEventSchema } from '@/schemas/event'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
              <form>
                <Stack gap='2'>
                  <Body>Are you sure?</Body>
                  <Caption>This can not be undone</Caption>
                  <input type='hidden' name='id' value={id} />
                  <Button formAction={deleteEventAction} variant='destructive'>
                    Delete
                  </Button>
                </Stack>
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
