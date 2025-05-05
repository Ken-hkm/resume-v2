
import { Suspense } from 'react';
import { getPersonalInfo, type PersonalInfo } from '@/services/personal-info';
import { getExperience, type ExperienceEntry } from '@/services/experience';
import { getExpertiseData, type ExpertiseData } from '@/services/expertise'; // Import expertise service
import { getEducationData, type EducationEntry } from '@/services/education'; // Import education service
import PersonalInfoSection from '@/components/sections/personal-info-section';
import ExperienceSection from '@/components/sections/experience-section';
import ExpertiseSection from '@/components/sections/expertise-section'; // Import expertise component
import TechnicalExpertiseSection from '@/components/sections/technical-expertise-section'; // Import technical expertise component
import EducationSection from '@/components/sections/education-section'; // Import education component
import PortfolioSection from '@/components/sections/portfolio-section'; // Import portfolio component
import ChatSection from '@/components/sections/chat-section';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, FileCode } from "lucide-react"; // Import FileCode icon
import PersonalInfoSkeleton from '@/components/sections/personal-info-skeleton';
import ExperienceSkeleton from '@/components/sections/experience-skeleton';
import ExpertiseSkeleton from '@/components/sections/expertise-skeleton'; // Import expertise skeleton
import EducationSkeleton from '@/components/sections/education-skeleton'; // Import education skeleton
import PortfolioSkeleton from '@/components/sections/portfolio-skeleton'; // Import portfolio skeleton


// Async component to fetch and display personal info
async function PersonalInfoLoader() {
  const personalInfo = await getPersonalInfo();
  if (!personalInfo) {
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

// Async component to fetch and display expertise data
async function ExpertiseLoader() {
  const expertiseData = await getExpertiseData();

  // Expertise Sections will handle null/empty data internally
  return (
     <div className="space-y-12">
       <ExpertiseSection skills={expertiseData?.skills ?? []} />
       <TechnicalExpertiseSection technicalSkills={expertiseData?.technical_skills ?? []} />
     </div>
  );
}

// Async component to fetch and display education data
async function EducationLoader() {
    const educationEntries = await getEducationData();
    // EducationSection internally handles null/empty/error states
    return <EducationSection educationEntries={educationEntries} />;
}

// Component to display portfolio section (currently hardcoded link)
function PortfolioLoader() {
    // For now, the link is hardcoded. If fetched later, make this async.
    const portfolioItems = [
        {
            id: 'api-docs',
            title: 'Resume API Documentation',
            description: 'Curious how this page works? Peek at the API docs!',
            url: 'https://4rqni77r30.apidog.io/',
            icon: FileCode, // Using FileCode icon
        }
    ];
    return <PortfolioSection items={portfolioItems} />;
}


export default function Home() {

  return (
    <div className="relative min-h-screen"> {/* Added relative positioning */}
      <div className="container mx-auto max-w-3xl px-4 py-12 pb-24"> {/* Added bottom padding */}
        {/* Personal Info */}
        <Suspense fallback={<PersonalInfoSkeleton />}>
          <PersonalInfoLoader />
        </Suspense>

        <Separator className="my-12" />

        {/* Experience */}
        <div className='mb-12'>
           <Suspense fallback={<ExperienceSkeleton />}>
             <ExperienceLoader />
           </Suspense>
        </div>

         <Separator className="my-12" />

          {/* Education */}
         <div className="mb-12">
            <Suspense fallback={<EducationSkeleton />}>
               <EducationLoader />
            </Suspense>
         </div>

         <Separator className="my-12" />

        {/* Expertise & Technical Expertise */}
         <div className="mb-12">
            <Suspense fallback={<ExpertiseSkeleton />}>
               <ExpertiseLoader />
            </Suspense>
         </div>

        <Separator className="my-12" />

        {/* Portfolio */}
        <div className="mb-12">
            <Suspense fallback={<PortfolioSkeleton />}>
                 <PortfolioLoader />
            </Suspense>
        </div>

         {/* Removed separator */}
      </div>

      {/* Chat Section - Now fixed position */}
      <ChatSection />
    </div>
  );
}
