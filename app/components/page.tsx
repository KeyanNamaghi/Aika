import { Stack } from '@/components/layouts'
import { Heading, Body, Caption } from '@/components/typography'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { CircleAlert, Laptop } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <div className='flex-auto'>
      <Stack direction='col'>
        <Heading>Components</Heading>
        <Body>Button</Body>

        <Caption>Variants</Caption>
        <Stack direction='row'>
          <Button variant='default'>Default</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link</Button>
        </Stack>
        <Caption>Sizes</Caption>
        <Stack direction='row'>
          <Button size='sm'>Small</Button>
          <Button>Default</Button>
          <Button size='icon'>
            <Laptop size={16} />
          </Button>
          <Button size='lg'>Large</Button>
        </Stack>
        <Caption>States</Caption>
        <Stack direction='row'>
          <Button>Regular</Button>
          <Button disabled>Disabled</Button>
        </Stack>
        <Separator />
        <Body>Checkbox</Body>
        <Stack direction='row'>
          <Checkbox />
          <Checkbox defaultChecked />
        </Stack>
        <Separator />
        <Body>Input</Body>
        <Stack direction='row'>
          <Input />
          <Input disabled />
        </Stack>

        <Separator />

        <Body>Alert</Body>

        <Stack direction='row'>
          <Alert variant='default'>
            <CircleAlert className='h-4 w-4' />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>Default alert description</AlertDescription>
          </Alert>
          <Alert variant='destructive'>
            <CircleAlert className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong</AlertDescription>
          </Alert>
        </Stack>
      </Stack>
    </div>
  )
}

export default Page
