import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

interface MedicalDisclaimerProps {
  compact?: boolean;
}

const MedicalDisclaimer = ({ compact = false }: MedicalDisclaimerProps) => {
  if (compact) {
    return (
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="text-amber-800 dark:text-amber-300">
              <strong>Disclaimer:</strong> Content is for informational purposes only and does not substitute professional medical advice.{' '}
              <Link to="/disclaimer" className="underline hover:no-underline">Read more</Link>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Alert className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
      <AlertTriangle className="h-5 w-5 text-amber-600" />
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        <strong>Medical Disclaimer:</strong> The information provided on this page is for educational and informational purposes only. 
        It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
        Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.{' '}
        <Link to="/disclaimer" className="underline hover:no-underline font-medium">Read full disclaimer</Link>
      </AlertDescription>
    </Alert>
  );
};

export default MedicalDisclaimer;
