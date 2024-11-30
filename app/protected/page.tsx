import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CreateNote } from "./create-note";
import { Note } from "./note";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data: notes } = await supabase.from("notes").select();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <CreateNote />

      {notes && (
        <div className="flex flex-col gap-2">
          {notes.map((note) => (
            <Note key={note.id} title={note.title} id={note.id} />
          ))}
        </div>
      )}
    </div>
  );
}
