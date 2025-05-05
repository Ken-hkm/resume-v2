
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Link as LinkIcon, FileCode } from 'lucide-react'; // Using Briefcase for Portfolio icon
import Link from 'next/link';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; // Optional icon component
}

interface PortfolioSectionProps {
  items: PortfolioItem[];
}

export default function PortfolioSection({ items }: PortfolioSectionProps) {
  if (!items || items.length === 0) {
    // Optional: Render a message or nothing if there are no items
    return null;
  }

  return (
    <Card className="shadow-md rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
          <Briefcase className="h-6 w-6" /> Portfolio & Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item) => {
          const IconComponent = item.icon || LinkIcon; // Default to LinkIcon if no icon provided
          return (
            <div key={item.id} className="p-4 border border-border rounded-lg bg-secondary/30 hover:shadow-sm transition-shadow">
               <div className="flex items-center space-x-3 mb-2">
                 <IconComponent className="h-5 w-5 text-accent shrink-0" />
                 <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
               </div>
               <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
               <Link href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1 group">
                   View Project
                   <LinkIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
