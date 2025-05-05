import { Suspense } from 'react';
import { getPersonalInfo, type PersonalInfo } from '@/services/personal-info';
import { getExperience } from '@/services/experience'; // Import experience service
import PersonalInfoSection from '@/components/sections/personal-info-section';
import PlaceholderSection from '@/components/sections/placeholder-section';
import ExperienceSection from '@/components/sections/experience-section'; // Import experience component
import ChatSection from '@/components/sections/chat-section';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import PersonalInfoSkeleton from '@/components/sections/personal-info-skeleton';
import ExperienceSkeleton from '@/components/sections/experience-skeleton';


// Async component to fetch and display personal info
async function PersonalInfoLoader() {
  const personalInfo = await getPersonalInfo();
  if (!personalInfo) {
    // Specific error handling for personal info
    return (
      <Alert variant="destructive" className="mb-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Could not load personal information. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
  return <PersonalInfoSection info={personalInfo} />;
}

// Async component to fetch and display experience
async function ExperienceLoader() {
  const experiences = await getExperience();
  // ExperienceSection internally handles null/empty/error states for experience data
  return <ExperienceSection experiences={experiences} />;
}


export default function Home() {
  // Data fetching is handled independently within the Suspense boundaries

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* Suspense boundary for Personal Info */}
      <Suspense fallback={<PersonalInfoSkeleton />}>
        <PersonalInfoLoader />
      </Suspense>

      <Separator className="my-12" />

      {/* Suspense boundary for Experience */}
      <div className='mb-12'>
         <Suspense fallback={<ExperienceSkeleton />}>
           <ExperienceLoader />
         </Suspense>
      </div>


      {/* Placeholder Sections (no async data needed initially) */}
      <div className="space-y-12">
        <PlaceholderSection title="Education" />
        <PlaceholderSection title="Expertise" />
        <PlaceholderSection title="Technical Expertise" />
      </div>

      <Separator className="my-12" />

      {/* Chat Section (likely has its own internal loading state) */}
      <ChatSection />
    </div>
  );
}
