'use client'
import { saveNote } from '@/actions/notes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useActionState } from 'react'

export const CreateNote = () => {
  const [state, formAction, isPending] = useActionState(saveNote, {
    error: null,
    data: null,
  })

  return (
    <form className='flex flex-col gap-2' action={formAction}>
      <h2 className='mb-4 text-2xl font-bold'>Create a new note</h2>
      <Input type='text' name='title' placeholder='Note title'></Input>
      <Button disabled={isPending || !!state.error} variant='default'>
        Create note
      </Button>
    </form>
  )
}
