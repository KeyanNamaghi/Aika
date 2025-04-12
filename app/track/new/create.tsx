'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Colour, CreateEventSchema, createEventSchema } from '@/schemas/event'
import { zodResolver } from '@hookform/resolvers/zod'
import { cva } from 'class-variance-authority'
import { Controller, useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'

export const Create = () => {
  const { handleSubmit, control } = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: { title: '', colour: '', isGood: 'yes' },
  })

  const circleVariants = cva('h-8 w-8 rounded-full flex items-center justify-center border border-solid', {
    variants: {
      variant: {
        amber: 'bg-amber-100 border-amber-500',
        lime: 'bg-lime-100 border-lime-500',
        emerald: 'bg-emerald-100 border-emerald-500',
        sky: 'bg-sky-100 border-sky-500',
        indigo: 'bg-indigo-100 border-indigo-500',
        violet: 'bg-violet-100 border-violet-500',
        fuchsia: 'bg-fuchsia-100 border-fuchsia-500',
        rose: 'bg-rose-100 border-rose-500',
        default: 'bg-gray-100 border-gray-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  })

  return (
    <form
      className='grid gap-8'
      onSubmit={handleSubmit((data) =>
        console.log({
          title: data.title,
          colour: data.colour,
          isGood: data.isGood,
          created: new Date().toISOString(),
        }),
      )}
    >
      <div className='grid gap-4'>
        <Label htmlFor='title'>What do you want to track?</Label>
        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input id='title' placeholder='Read a book' onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </div>

      <Controller
        control={control}
        name='colour'
        render={({ field: { onChange, value } }) => (
          <div className='grid gap-4'>
            <Label htmlFor='colour'>Pick a colour</Label>
            <div className='flex items-center gap-4'>
              <span className={cn(circleVariants({ variant: value }))} />
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select a colour' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Colours</SelectLabel>
                    <SelectItem value='amber'>Amber</SelectItem>
                    <SelectItem value='lime'>Lime</SelectItem>
                    <SelectItem value='emerald'>Emerald</SelectItem>
                    <SelectItem value='sky'>Sky</SelectItem>
                    <SelectItem value='indigo'>Indigo</SelectItem>
                    <SelectItem value='violet'>Violet</SelectItem>
                    <SelectItem value='fuchsia'>Fuchsia</SelectItem>
                    <SelectItem value='rose'>Rose</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      />

      <Controller
        control={control}
        name='isGood'
        render={({ field: { onChange } }) => (
          <RadioGroup defaultValue='yes' className='gap-4' onValueChange={onChange}>
            <Label>Is this a good thing?</Label>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='yes' id='option-one' defaultChecked />
              <Label className='font-normal' htmlFor='option-one'>
                Yes
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='no' id='option-two' />
              <Label className='font-normal' htmlFor='option-two'>
                No
              </Label>
            </div>
          </RadioGroup>
        )}
      />

      <Button type='submit'>Create</Button>
    </form>
  )
}
