'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { type ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'
import { Stack } from './layouts'

type Props = ComponentProps<typeof Button> & {
  pendingText?: string
  isPending?: boolean
}

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' aria-disabled={pending} {...props}>
      {pending ? (
        <Stack direction='row' gap='2' className='items-center'>
          <Loader2 className='animate-spin' /> {pendingText}
        </Stack>
      ) : (
        children
      )}
    </Button>
  )
}
