'use client'
import { saveNote } from '@/actions/notes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { CreateNoteSchema, createNoteSchema } from '@/schemas/notes'
import { CircleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const CreateNote = () => {
  const { executeAsync, hasErrored, hasSucceeded, isPending, reset: resetAction } = useAction(saveNote)
  const {
    handleSubmit,
    reset: resetForm,
    control,
    formState: { errors },
  } = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title: '' },
  })

  useEffect(() => {
    if (hasSucceeded) {
      resetAction()
      resetForm()
    }
  }, [hasSucceeded])

  return (
    <form className='flex flex-col gap-2' onSubmit={handleSubmit(executeAsync)}>
      <h2 className='mb-4 text-2xl font-bold'>Create a new note</h2>
      <Controller
        control={control}
        name='title'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input type='text' name='title' placeholder='Note title' onChange={onChange} onBlur={onBlur} value={value} />
        )}
      />
      {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
      <Button disabled={isPending} variant='default'>
        Create note
      </Button>
      {hasErrored && (
        <Alert variant='destructive'>
          <CircleAlert className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong creating the note</AlertDescription>
        </Alert>
      )}
    </form>
  )
}
