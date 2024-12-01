import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CreateNote } from './create-note'
import { Note } from './note'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data: notes } = await supabase.from('notes').select()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <div className='flex w-[90vw] flex-col gap-12 sm:w-[600px]'>
      {/* <div className='flex flex-col items-start gap-2'>
        <h2 className='mb-4 text-2xl font-bold'>Your user details</h2>
        <pre className='max-h-32 overflow-auto rounded border p-3 font-mono text-xs'>{JSON.stringify(user, null, 2)}</pre>
      </div> */}

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
