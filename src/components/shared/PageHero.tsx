import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, subtitle, icon: Icon, badge, children }: PageHeroProps) => {
  return (
    <section className="page-hero">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {badge && (
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
              {Icon && <Icon className="w-4 h-4" />}
              {badge}
            </div>
          )}
          <h1 className="page-hero-title animate-fade-in-up">{title}</h1>
          {subtitle && (
            <p className="page-hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </p>
          )}
          {children && (
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default PageHero;
