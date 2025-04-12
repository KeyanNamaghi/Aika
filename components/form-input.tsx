'use client'

import { type ComponentProps } from 'react'
import { Stack } from './layouts'
import { Label } from './ui/label'
import { Input } from './ui/input'

type Props = ComponentProps<typeof Input> & {
  label: string
  error?: string
}

export function FormInput({ children, name, placeholder, label, error, ...props }: Props) {
  return (
    <Stack direction='col' gap='2'>
      <Label htmlFor={name}>{label}</Label>
      <Input type='text' name={name} placeholder={placeholder} {...props} />
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </Stack>
  )
}
