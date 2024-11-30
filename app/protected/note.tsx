"use client";
import { deleteNote, editNote, saveNote } from "@/actions/notes";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";

// TODO: delete and edit should be split out into their own components

export const Note = ({ title, id }: { title: string; id: string }) => {
  const [editing, setEditing] = useState(false);
  const [deleteState, deleteFormAction, deleteIsPending] = useActionState(
    deleteNote,
    { error: null, data: null }
  );
  const [editState, editFormAction, editIsPending] = useActionState(editNote, {
    error: null,
    data: "",
  });

  useEffect(() => {
    if (editState.data) {
      setEditing(false);
    }
  }, [editState]);

  return (
    <Card>
      <CardHeader>
        {editing ? (
          <form className="flex gap-2" action={editFormAction}>
            <input type="hidden" name="id" value={id} />
            <Input type="text" name="title" placeholder={title} />
            <Button>Save</Button>
            <Button
              type="button"
              onClick={() => {
                setEditing(false);
              }}
              variant="outline"
            >
              Nevermind
            </Button>
            {editState.error && (
              <p className="text-red-500 text-sm">
                {editState.error.toString()}
              </p>
            )}
          </form>
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
      </CardHeader>

      <CardFooter className="gap-2">
        <Button
          onClick={() => {
            setEditing(true);
          }}
          variant="default"
        >
          Edit
        </Button>
        <form
          className="flex flex-col gap-2 items-start"
          action={deleteFormAction}
        >
          <input type="hidden" name="id" value={id} />
          <Button
            variant="destructive"
            disabled={deleteIsPending || !!deleteState.error}
          >
            Delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
