'use client'
import { Controller, useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { CircleAlert } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createOccurrence } from '@/actions/event'
import { CreateOccurrenceSchema, createOccurrenceSchema } from '@/schemas/event'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Stack } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { TimestampSelector } from '@/components/timestamp-selector'
import { Input } from '@/components/ui/input'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OccurrencePage() {
  const { id } = useParams()
  const router = useRouter()
  const { executeAsync, hasErrored, isPending } = useAction(createOccurrence, {
    onSuccess: () => {
      router.push('/protected')
    },
  })
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateOccurrenceSchema>({
    resolver: zodResolver(createOccurrenceSchema),
    defaultValues: { notes: '', event_id: id?.toString(), occurred_at: new Date() },
  })

  return (
    <Stack direction='col' className='mx-auto max-w-xl'>
      <TimestampSelector value={watch('occurred_at')} onChange={(val) => setValue('occurred_at', val)} />
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(executeAsync)}>
        <Controller
          control={control}
          name='notes'
          render={({ field: { name, onChange, onBlur, value } }) => (
            <Input type='text' name={name} placeholder='Notes' onChange={onChange} onBlur={onBlur} value={value} />
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
      <Button asChild disabled={isPending} variant='outline'>
        <Link href={`/protected`}>Cancel</Link>
      </Button>
    </Stack>
  )
}
