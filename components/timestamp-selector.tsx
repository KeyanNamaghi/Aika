'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Clock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TimestampSelectorProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  className?: string
}

export function TimestampSelector({ value, onChange, className }: TimestampSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Generate hours and minutes options
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined)
      return
    }

    // Preserve time if there's an existing value
    if (value) {
      date.setHours(value.getHours(), value.getMinutes(), 0, 0)
    } else {
      date.setHours(0, 0, 0, 0)
    }

    onChange(date)
  }

  // Handle time selection
  const handleTimeChange = (type: 'hours' | 'minutes', timeValue: string) => {
    if (!value) {
      const newDate = new Date()
      newDate.setHours(
        type === 'hours' ? Number.parseInt(timeValue) : 0,
        type === 'minutes' ? Number.parseInt(timeValue) : 0,
        0,
        0,
      )
      onChange(newDate)
      return
    }

    const newDate = new Date(value)
    if (type === 'hours') {
      newDate.setHours(Number.parseInt(timeValue), newDate.getMinutes(), 0, 0)
    } else {
      newDate.setHours(newDate.getHours(), Number.parseInt(timeValue), 0, 0)
    }
    onChange(newDate)
  }

  // Format the display value
  const displayValue = value ? format(value, "PPP 'at' h:mm a") : 'Select date and time'

  return (
    <div className='space-y-2'>
      <div className='flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4'>
        {/* Date Selector */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground', className)}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {value ? format(value, 'PPP') : 'Select date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar mode='single' selected={value} onSelect={handleDateSelect} initialFocus />
          </PopoverContent>
        </Popover>

        {/* Time Selector */}
        <div className='flex space-x-2'>
          <div className='grid min-w-24 flex-1 gap-1'>
            <Select
              value={value ? value.getHours().toString() : undefined}
              onValueChange={(val) => handleTimeChange('hours', val)}
            >
              <SelectTrigger className='w-full'>
                <div className='flex items-center'>
                  <Clock className='mr-2 h-4 w-4' />
                  <SelectValue placeholder='Hour' />
                </div>
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour.toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid min-w-24 flex-1 gap-1'>
            <Select
              value={value ? value.getMinutes().toString() : 'undefined'}
              onValueChange={(val) => handleTimeChange('minutes', val)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Minute' />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute.toString()}>
                    {minute.toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Display selected timestamp */}
      {value && <p className='text-muted-foreground text-sm'>Selected: {format(value, "PPP 'at' h:mm a")}</p>}
    </div>
  )
}
