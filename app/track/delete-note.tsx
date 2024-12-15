'use client'
import { deleteNote } from '@/actions/notes'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { CircleAlert } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRef } from 'react'

export function DeleteNote({ id }: { id: number }) {
  const ref = useRef<HTMLButtonElement>(null)
  const { executeAsync, hasErrored } = useAction(deleteNote)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction ref={ref} className='hidden' />
          <Button
            variant={'destructive'}
            onClick={async () => {
              await executeAsync({ id })
              // This is a hack to prevent the dialog from closing early
              if (!hasErrored) ref.current?.click()
            }}
          >
            Continue
          </Button>
          {hasErrored && (
            <Alert variant='destructive'>
              <CircleAlert className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong deleting the note</AlertDescription>
            </Alert>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
