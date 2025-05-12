'use client'
import { Controller, useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import { CircleAlert, Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEvent } from '@/actions/event'
import { createEventSchema, CreateEventSchema } from '@/schemas/event'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Heading } from '@/components/typography'
import { Stack } from '@/components/layouts'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormInput } from '@/components/form-input'
import { Button } from '@/components/ui/button'

export default function CreateEventPage() {
  const { executeAsync, hasErrored, isPending } = useAction(createEvent, { onSuccess: () => resetForm() })
  const {
    handleSubmit,
    reset: resetForm,
    control,
  } = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: { name: '', desirable: true },
  })

  return (
    <Stack direction='col' className='mx-auto max-w-2xl'>
      <Heading>What do you want to track?</Heading>

      <form onSubmit={handleSubmit(executeAsync)}>
        <Stack direction='col'>
          <Controller
            control={control}
            name='name'
            render={({ field: { name, onChange, onBlur, value }, fieldState }) => (
              <FormInput
                type='text'
                name={name}
                label='Event name'
                placeholder='Read a book'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='description'
            render={({ field: { name, onChange, onBlur, value }, fieldState }) => (
              <FormInput
                type='text'
                name={name}
                label='Description'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='desirable'
            render={({ field: { onChange } }) => (
              <RadioGroup defaultValue='yes' className='gap-4' onValueChange={onChange}>
                <Label>Is this a good thing?</Label>
                <Stack direction='row' gap='4'>
                  <Stack direction='row' gap='2'>
                    <RadioGroupItem value='yes' id='option-yes' defaultChecked />
                    <Label className='font-normal' htmlFor='option-yes'>
                      Yes
                    </Label>
                  </Stack>
                  <Stack direction='row' gap='2'>
                    <RadioGroupItem value='no' id='option-no' />
                    <Label className='font-normal' htmlFor='option-no'>
                      No
                    </Label>
                  </Stack>
                </Stack>
              </RadioGroup>
            )}
          />

          <Button type='submit' aria-disabled={isPending}>
            {isPending ? (
              <Stack direction='row' gap='2' className='items-center'>
                <Loader2 className='animate-spin' />
              </Stack>
            ) : (
              <>Create Event</>
            )}
          </Button>
          {hasErrored && (
            <Alert variant='destructive'>
              <CircleAlert className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong creating the event</AlertDescription>
            </Alert>
          )}
        </Stack>
      </form>
    </Stack>
  )
}
