import { getCurrentUser } from "@/lib/session";
import LandingPage from "@/components/landing-page";

export default async function Page() {
  const user = await getCurrentUser();

  return <LandingPage user={user} />;
}
