'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Body, Caption } from '@/components/typography'
import { Database } from '@/database.types'
import { Stack } from '@/components/layouts'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { CircleAlert, EllipsisVertical } from 'lucide-react'
import { createOccurrence, deleteEvent, deleteEventAction } from '@/actions/event'
import { useAction } from 'next-safe-action/hooks'
import { createOccurrenceSchema, CreateOccurrenceSchema, deleteEventSchema, DeleteEventSchema } from '@/schemas/event'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { timeSince } from '@/lib/time'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'

export const Event = ({
  created_at,
  description,
  id,
  last_occurred_at,
  name,
  updated_at,
  user_id,
}: Database['public']['Tables']['events']['Row']) => {
  const [drawerOpen, setdrawerOpen] = useState(false)

  const { executeAsync, hasErrored, isPending } = useAction(createOccurrence, {
    onSuccess: () => {
      setdrawerOpen(false)
      resetForm()
    },
  })
  const {
    handleSubmit,
    reset: resetForm,
    control,
    formState: { errors },
  } = useForm<CreateOccurrenceSchema>({
    resolver: zodResolver(createOccurrenceSchema),
    defaultValues: { notes: '', event_id: id, occurred_at: new Date() },
  })

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
        <Stack gap='2'>
          {description && <Body>{description}</Body>}
          {created_at && <Caption>Created {timeSince(created_at)}</Caption>}
          {last_occurred_at && <Caption>Last occurred {timeSince(last_occurred_at)}</Caption>}
          <Drawer open={drawerOpen} onOpenChange={setdrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant='outline'>Create occurrence</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className='mx-auto w-full max-w-sm'>
                <DrawerHeader>
                  <DrawerTitle>Log occurrence</DrawerTitle>
                  <DrawerDescription>{name}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <form className='flex flex-col gap-2' onSubmit={handleSubmit(executeAsync)}>
                    <Controller
                      control={control}
                      name='notes'
                      render={({ field: { name, onChange, onBlur, value } }) => (
                        <Input
                          type='text'
                          name={name}
                          placeholder='Notes'
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      )}
                    />
                    {errors.notes && <p className='text-sm text-red-500'>{errors.notes.message}</p>}
                    <Button disabled={isPending}>Log</Button>
                    {hasErrored && (
                      <Alert variant='destructive'>
                        <CircleAlert className='h-4 w-4' />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Something went wrong...</AlertDescription>
                      </Alert>
                    )}
                  </form>
                  <Link href={`/protected/occurrence/${id}`}>
                    <Button className='w-full' variant='outline'>
                      Advanced
                    </Button>
                  </Link>
                  <DrawerClose asChild>
                    <Button variant='ghost'>Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </Stack>
      </CardContent>
    </Card>
  )
}
