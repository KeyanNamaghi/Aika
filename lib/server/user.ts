import { db } from "./db";

export function createUser(
  googleId: string,
  name: string,
  picture: string
): User {
  const row = db.queryOne(
    "INSERT INTO user (google_id, name, picture) VALUES (?, ?, ?) RETURNING user.id",
    [googleId, name, picture]
  );
  if (row === null) {
    throw new Error("Unexpected error");
  }
  const user: User = {
    id: row.number(0),
    googleId,
    name,
    picture,
  };
  return user;
}

export function getUserFromGoogleId(googleId: string): User | null {
  const row = db.queryOne(
    "SELECT id, google_id, name, picture FROM user WHERE google_id = ?",
    [googleId]
  );
  if (row === null) {
    return null;
  }
  const user: User = {
    id: row.number(0),
    googleId: row.string(1),
    name: row.string(2),
    picture: row.string(3),
  };
  return user;
}

export interface User {
  id: number;
  googleId: string;
  name: string;
  picture: string;
}
