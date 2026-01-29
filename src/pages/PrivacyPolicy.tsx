import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
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
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground">Last updated: January 29, 2026</p>
        </div>

        {/* Content */}
        <div className="card-health p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to HealthyPlates.in ("we", "us", or "our"). We are committed to protecting your personal information and your right to privacy 
              in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Fill out our contact form (name, email, phone number, message)</li>
              <li>Subscribe to our newsletter for article updates</li>
              <li>Interact with our website through health calculators (BMI, Calorie, Macro)</li>
              <li>Use our Diet Planner tool (age, gender, weight, height, activity level)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Note:</strong> Calculator inputs and diet planner data are processed locally in your browser and are not stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Respond to business inquiries (promotions, advertisements, partnerships)</li>
              <li>Send you updates about latest health articles (with your explicit consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations under Indian law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">DPDP Act 2023 Compliance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under the Digital Personal Data Protection Act, 2023, you have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Right to Access:</strong> Request information about your personal data we hold</li>
              <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw your consent at any time</li>
              <li><strong>Right to Grievance Redressal:</strong> Lodge complaints with our Grievance Officer</li>
              <li><strong>Right to Nominate:</strong> Nominate someone to exercise your rights in case of death or incapacity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Consent Management</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In accordance with the DPDP Act 2023, we obtain your explicit consent before:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Collecting any personal information through forms</li>
              <li>Sending marketing communications or article updates</li>
              <li>Processing data for any purpose beyond what is necessary</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can withdraw your consent at any time by contacting us at the email address below. 
              Upon withdrawal, we will cease processing your data for the specified purpose within 7 working days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, 
              or as required by law. Contact form submissions are retained for 1 year unless you request earlier deletion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information, 
              including encryption of data in transit and secure storage. However, no method of transmission over the Internet 
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>EmailJS:</strong> For processing contact form submissions</li>
              <li><strong>Supabase:</strong> For database and authentication services</li>
              <li><strong>Cloudinary:</strong> For image hosting</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              These services are bound by their own privacy policies and data protection agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is not intended for children under 18 years of age. We do not knowingly collect personal information 
              from children. If you are a parent or guardian and believe your child has provided us with personal information, 
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Grievance Officer</h2>
            <p className="text-muted-foreground leading-relaxed">
              In accordance with the DPDP Act 2023, our Grievance Officer for data protection matters is:
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mt-4">
              <p className="text-foreground font-medium">Rajeshkanna S</p>
              <p className="text-muted-foreground">Email: info.healthyplates@gmail.com</p>
              <p className="text-muted-foreground">Response Time: Within 7 working days</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. 
              We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your data protection rights, please contact us at{' '}
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

export default PrivacyPolicy;
