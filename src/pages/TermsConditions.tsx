import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsConditions = () => {
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
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Terms & Conditions</h1>
          </div>
          <p className="text-muted-foreground">Last updated: January 29, 2026</p>
        </div>

        {/* Content */}
        <div className="card-health p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using HealthyPlates.in website, you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Educational Purpose Only</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on HealthyPlates.in is provided for educational and informational purposes only. 
              <strong className="text-foreground"> This is NOT medical advice.</strong> The information presented should not be considered 
              a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified 
              health providers with questions you may have regarding a medical condition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Website Features</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              HealthyPlates.in provides the following features for educational purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Food Items Database:</strong> Information about various foods and their nutritional properties</li>
              <li><strong>Daily Meals Guide:</strong> Educational content about meal timing and nutrition</li>
              <li><strong>Disease Guide:</strong> Information about foods that may support various health conditions</li>
              <li><strong>Self-Care Procedures:</strong> Natural self-care routines for skin, hair, and fitness</li>
              <li><strong>Health Calculators:</strong> BMI, Calorie, and Macro calculators for personal reference</li>
              <li><strong>Diet Planner:</strong> Personalized meal planning tool for educational purposes</li>
              <li><strong>Body Explorer:</strong> Anatomy education with labeled diagrams</li>
              <li><strong>Health Articles:</strong> Blog posts about nutrition and wellness topics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Form Usage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our contact form is exclusively for business inquiries including promotions, advertisements, 
              partnership opportunities, and newsletter subscriptions. We do not provide personalized medical 
              or nutritional advice through this form.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is the property of HealthyPlates.in 
              and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When using our website, you agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Upload or transmit any harmful content</li>
              <li>Scrape or copy content without permission</li>
              <li>Use our content to provide medical advice to others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The website is provided "as is" without any warranties, expressed or implied. We do not warrant that the website 
              will be uninterrupted, error-free, or free of viruses or other harmful components. Calculator results and diet 
              plans are for informational purposes and may not be accurate for all individuals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              HealthyPlates.in shall not be liable for any direct, indirect, incidental, consequential, or punitive damages 
              arising from your use of the website or reliance on any information provided. This includes but is not limited to 
              any health outcomes, dietary decisions, or lifestyle changes made based on our content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Consumer Protection Act Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              In compliance with the Consumer Protection Act, 2019 of India, we clearly state that all content on this website 
              is educational and informational only. We do not sell products or services that would make health claims. 
              Any food or wellness information should be verified with qualified healthcare professionals before implementation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be 
              subject to the exclusive jurisdiction of the courts in Tamil Nadu, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. 
              Your continued use of the website constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms & Conditions, please contact us at{' '}
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

export default TermsConditions;
