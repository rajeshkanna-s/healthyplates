import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-health p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Medical Disclaimer</h1>
          </div>
          <p className="text-muted-foreground">Last updated: January 29, 2026</p>
        </div>

        {/* Critical Notice */}
        <Alert className="mb-8 border-red-500 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-800 dark:text-red-400 font-bold text-lg">
            THIS IS NOT MEDICAL ADVICE
          </AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-300 mt-2">
            The content on HealthyPlates.in is for informational and educational purposes only. 
            It is NOT intended to be a substitute for professional medical advice, diagnosis, or treatment. 
            <strong> Always consult a qualified healthcare provider before making any dietary or lifestyle changes.</strong>
          </AlertDescription>
        </Alert>

        {/* Content */}
        <div className="card-health p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Not Medical Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided on HealthyPlates.in, including text, graphics, images, and other materials, 
              is for general informational purposes only and should not be considered medical advice. 
              We are not licensed healthcare providers, and the content does not create a doctor-patient relationship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Consumer Protection Act Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              In accordance with the Consumer Protection Act, 2019 of India, we clearly disclose that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>We do not provide medical diagnosis or treatment</li>
              <li>Our content is educational and should not replace professional medical care</li>
              <li>Any dietary suggestions are general in nature and may not be suitable for everyone</li>
              <li>Individual results may vary significantly based on personal health conditions</li>
              <li>We are not liable for any health outcomes based on our content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Consult Healthcare Professionals</h2>
            <p className="text-muted-foreground leading-relaxed">
              Always seek the advice of your physician, dietitian, or other qualified health provider with any questions 
              you may have regarding a medical condition, dietary changes, or health concerns. Never disregard professional 
              medical advice or delay seeking it because of something you have read on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">No Guarantees</h2>
            <p className="text-muted-foreground leading-relaxed">
              We make no guarantees about the completeness, reliability, or accuracy of the information provided. 
              Any action you take based on the information on this website is strictly at your own risk. 
              Results may vary, and individual experiences with foods, supplements, or wellness practices differ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Food and Health Claims</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When we discuss health benefits of foods, we use careful language such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>"May help"</strong> or <strong>"May support"</strong> – indicating potential benefits based on general research</li>
              <li><strong>"Associated with"</strong> – indicating research findings, not guarantees</li>
              <li><strong>"Traditionally used for"</strong> – referring to historical or cultural uses</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4 font-medium">
              We do NOT claim that any food, supplement, or practice "cures," "heals," or "treats" any disease or medical condition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Health Calculators Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our BMI Calculator, Calorie Calculator, Macro Calculator, and Diet Planner are for general educational purposes only. 
              These tools use standard formulas that may not account for individual health conditions, medications, 
              or other factors. Always verify results with a healthcare professional before making significant dietary changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Self-Care Procedures Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Self-care routines for skin, hair, and fitness are shared for educational purposes only. 
              Before trying any home remedy or new skincare routine:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Perform a patch test if using new ingredients on skin</li>
              <li>Consult a dermatologist if you have existing skin conditions</li>
              <li>Stop immediately if you experience any adverse reactions</li>
              <li>Consult a fitness professional before starting new exercise routines</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Disease-Related Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              Information about foods related to specific health conditions is for educational awareness only. 
              If you have any diagnosed medical condition, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Follow your doctor's prescribed treatment plan</li>
              <li>Consult your healthcare provider before making any dietary changes</li>
              <li>Not use our content as a replacement for medical treatment</li>
              <li>Inform your doctor about any dietary changes you make</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Emergency Situations</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you think you may have a medical emergency, call your doctor or emergency services (108/112 in India) immediately. 
              Do not rely on information from this website for emergency medical needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">External Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to external websites. We are not responsible for the content, accuracy, 
              or privacy practices of these external sites. Linking to external sites does not imply endorsement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Updates to This Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this disclaimer from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Disclaimer, please contact us at{' '}
              <a href="mailto:info.healthyplates@gmail.com" className="text-primary hover:underline">
                info.healthyplates@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
