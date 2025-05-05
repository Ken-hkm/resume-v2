import { getPersonalInfo, type PersonalInfo } from '@/services/personal-info';
import PersonalInfoSection from '@/components/sections/personal-info-section';
import PlaceholderSection from '@/components/sections/placeholder-section';
import ChatSection from '@/components/sections/chat-section';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";


export default async function Home() {
  const personalInfo = await getPersonalInfo();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {personalInfo ? (
        <PersonalInfoSection info={personalInfo} />
      ) : (
         <Alert variant="destructive" className="mb-8">
           <Terminal className="h-4 w-4" />
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>
             Could not load personal information. Please try again later.
           </AlertDescription>
         </Alert>
      )}

      <Separator className="my-12" />

      {/* Placeholder Sections */}
      <div className="space-y-12">
        <PlaceholderSection title="Experience" />
        <PlaceholderSection title="Education" />
        <PlaceholderSection title="Expertise" />
        <PlaceholderSection title="Technical Expertise" />
      </div>

      <Separator className="my-12" />

      <ChatSection />
    </div>
  );
}
