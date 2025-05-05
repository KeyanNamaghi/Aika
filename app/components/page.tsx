import { Stack } from '@/components/layouts'
import { Heading, Body, Caption } from '@/components/typography'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ColorDot } from '@/components/ui/color-dot'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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

        <Separator />

        <Body>Popover</Body>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline'>Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='leading-none font-medium'>Dimensions</h4>
                <p className='text-muted-foreground text-sm'>Set the dimensions for the layer.</p>
              </div>
              <div className='grid gap-2'>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <Label htmlFor='width'>Width</Label>
                  <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Separator />

        <Body>Color Dot</Body>
        <Stack direction='row'>
          <ColorDot value='amber' />
          <ColorDot value='lime' />
          <ColorDot value='emerald' />
          <ColorDot value='sky' />
          <ColorDot value='indigo' />
          <ColorDot value='violet' />
          <ColorDot value='fuchsia' />
          <ColorDot value='rose' />
          <ColorDot value='default' />
        </Stack>

        <Separator />

        <Body>Card</Body>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      </Stack>
    </div>
  )
}

export default Page
