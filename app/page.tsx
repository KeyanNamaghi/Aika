import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { Logout } from "@/components/logout";
import { globalGETRateLimit } from "@/lib/server/request";

export default async function Page() {
  if (!globalGETRateLimit()) {
    return "Too many requests";
  }
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect("/login");
  }
  return (
    <>
      <h1>Hi, {user.name}!</h1>
      <img src={user.picture} height="100px" width="100px" alt="profile" />
      <Logout />
    </>
  );
}
