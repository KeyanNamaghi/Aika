import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CreateNote } from './create-note'
import { Note } from './note'

export default async function Track() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data?.user) return redirect('/sign-in')

  const { data: notes } = await supabase.from('notes').select()

  return (
    <div className='flex w-[90vw] flex-col gap-12 sm:w-[600px]'>
      <CreateNote />
      {notes && (
        <div className='flex w-full flex-col gap-2'>
          {notes.map((note) => (
            <Note key={note.id} title={note.title} id={note.id} />
          ))}
        </div>
      )}
    </div>
  )
}
