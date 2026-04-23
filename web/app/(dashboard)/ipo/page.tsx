import { IpoPage } from "@/components/ipo-page";
import { getIpos } from "@/lib/server-api";

export default async function IpoRoutePage() {
  const ipos = await getIpos();
  return <IpoPage ipos={ipos} />;
}

