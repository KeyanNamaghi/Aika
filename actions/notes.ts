"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type Previous = {
  data: any;
  error: any;
};

export const saveNote = async (_: Previous, queryData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = queryData.get("title")?.toString();
  if (!title) {
    return { data: null, error: "Title is required" };
  }

  // Write note to the database
  const { data, error } = await supabase.from("notes").insert([
    {
      title,
      user_id: user?.id,
    },
  ]);

  revalidatePath("");
  return { data, error };
};

export const deleteNote = async (_: Previous, queryData: FormData) => {
  const supabase = await createClient();

  const id = queryData.get("id")?.toString();

  if (!id) {
    return { data: null, error: "ID is required" };
  }

  // Delete note from the database
  const { data, error } = await supabase.from("notes").delete().eq("id", id);

  revalidatePath("");
  return { data, error };
};

export const editNote = async (_: Previous, queryData: FormData) => {
  const supabase = await createClient();

  const id = queryData.get("id")?.toString();
  const title = queryData.get("title")?.toString();

  if (!id || !title) {
    return { data: null, error: "ID and title are required" };
  }

  // Update note in the database
  const { data, error } = await supabase
    .from("notes")
    .update({ title })
    .eq("id", id);

  console.log(data, error);

  revalidatePath("");
  return { data: title, error };
};
