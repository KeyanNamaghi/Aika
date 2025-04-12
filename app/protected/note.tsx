'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { UpdateNote } from './update-note'
import { DeleteNote } from './delete-note'
import { Body } from '@/components/typography'

export const Note = ({
  title,
  id,
  created_date,
}: {
  created_date: string | null
  id: number
  title: string | null
}) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <Card>
      <CardHeader>
        {isEditing ? (
          <UpdateNote id={id} title={title ?? ''} setIsEditing={setIsEditing} />
        ) : (
          <CardTitle className='mt-4'>{title}</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {created_date && (
          <Body className='text-muted-foreground text-sm'>Created on {new Date(created_date).toLocaleString()}</Body>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => setIsEditing(!isEditing)} variant='ghost'>
          {isEditing ? 'Nevermind' : 'Update'}
        </Button>
        <DeleteNote id={id} />
      </CardFooter>
    </Card>
  )
}
