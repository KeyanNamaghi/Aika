'use client'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { UpdateNote } from './update-note'
import { DeleteNote } from './delete-note'

export const Note = ({ title, id }: { title: string; id: number }) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <Card>
      <CardHeader>
        {isEditing ? (
          <UpdateNote id={id} title={title} setIsEditing={setIsEditing} />
        ) : (
          <CardTitle className='mt-4'>{title}</CardTitle>
        )}
      </CardHeader>
      <CardFooter>
        <Button onClick={() => setIsEditing(!isEditing)} variant='ghost'>
          {isEditing ? 'Nevermind' : 'Update'}
        </Button>
        <DeleteNote id={id} />
      </CardFooter>
    </Card>
  )
}
