'use client'
import { updateNote } from '@/actions/notes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { UpdateNoteSchema, updateNoteSchema } from '@/schemas/notes'
import { CircleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type UpdateNoteProps = {
  id: number
  title: string
  setIsEditing: (val: boolean) => void
}
export const UpdateNote = ({ id, title, setIsEditing }: UpdateNoteProps) => {
  const { executeAsync, hasErrored, isPending } = useAction(updateNote, {
    onSuccess: () => setIsEditing(false),
  })
  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<UpdateNoteSchema>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: { title },
  })

  const handleSubmit = async () => {
    await executeAsync({ id, title: getValues('title') })
  }

  return (
    <form className='flex gap-2'>
      <Controller
        control={control}
        name='title'
        render={({ field: { onChange, onBlur, value } }) => (
          <Input type='text' name='title' onChange={onChange} onBlur={onBlur} value={value} />
        )}
      />
      {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
      <Button disabled={isPending} onClick={handleSubmit}>
        Update
      </Button>
      {hasErrored && (
        <Alert variant='destructive'>
          <CircleAlert className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong updating the note</AlertDescription>
        </Alert>
      )}
    </form>
  )
}
