import { getCurrentUser } from "@/lib/session";
import LandingPage from "@/components/landing-page";
import Preloader from "@/components/landing-page/preloader";
import ChatWidget from "@/components/landing-page/chat-widget";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <>
      <Preloader />
      <LandingPage user={user} />
      <ChatWidget />
    </>
  );
}
