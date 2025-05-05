

'use client';

import type { PersonalInfo } from '@/services/personal-info';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Linkedin, Github, FileCode } from 'lucide-react'; // Added FileCode icon
import Link from 'next/link';

interface PersonalInfoSectionProps {
  info: PersonalInfo;
}

export default function PersonalInfoSection({ info }: PersonalInfoSectionProps) {
  const initials = `${info.first_name?.[0] ?? ''}${info.last_name?.[0] ?? ''}`.toUpperCase();
  const documentationUrl = 'https://4rqni77r30.apidog.io/'; // Added documentation URL

  return (
    <Card className="mb-12 shadow-md rounded-lg overflow-hidden border border-border">
      <CardHeader className="bg-secondary p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Avatar className="h-24 w-24 text-3xl">
          {/* Use the provided image URL */}
          <AvatarImage src="https://raw.githubusercontent.com/Ken-hkm/resume/main/image/kenneth.jpeg" alt={`${info.first_name} ${info.last_name}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left flex-grow">
          <CardTitle className="text-3xl font-bold text-primary">{`${info.first_name} ${info.last_name}`}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-1">{info.title}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary">About Me</h3>
          <p className="text-foreground leading-relaxed">{info.aboutMe}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary">Contact & Links</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-foreground">
              <Mail className="h-5 w-5 text-accent" />
              <a href={`mailto:${info.email}`} className="hover:underline hover:text-accent transition-colors">{info.email}</a>
            </div>
            <div className="flex items-center space-x-3 text-foreground">
              <Phone className="h-5 w-5 text-accent" />
              <span>{info.phone}</span>
            </div>
            <div className="flex items-start space-x-3 text-foreground">
              <MapPin className="h-5 w-5 text-accent mt-1 shrink-0" />
              <span>{info.address}</span>
            </div>
            {/* Social Links Buttons */}
            <div className="flex items-center space-x-4 pt-2">
               <Button variant="outline" size="sm" asChild>
                 <Link href={info.linkedinUrl} target="_blank" rel="noopener noreferrer">
                   <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                 </Link>
               </Button>
               <Button variant="outline" size="sm" asChild>
                 <Link href={info.githubUrl} target="_blank" rel="noopener noreferrer">
                   <Github className="mr-2 h-4 w-4" /> GitHub
                 </Link>
               </Button>
            </div>
             {/* Documentation Link - Moved here */}
             <div className="flex items-center space-x-2 text-base mt-4 p-3 bg-accent/10 border border-accent/30 rounded-md"> {/* Increased margin-top, added background/border */}
               <FileCode className="h-5 w-5 text-accent shrink-0" /> {/* Slightly larger icon */}
               <a
                  href={documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline transition-colors font-medium" /* Use accent color directly */
                >
                 Curious how this page works? Peek at the API docs!
               </a>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

