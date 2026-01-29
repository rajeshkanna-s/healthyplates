import { useState, useEffect } from 'react';
import { X, Shield, Cookie, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const ConsentManager = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true, // Always required
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem('consent_preferences');
    if (!storedConsent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setPreferences(JSON.parse(storedConsent));
    }
  }, []);

  const savePreferences = (newPreferences: ConsentPreferences) => {
    const prefsWithTimestamp = {
      ...newPreferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('consent_preferences', JSON.stringify(prefsWithTimestamp));
    setPreferences(prefsWithTimestamp);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const acceptEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  const withdrawConsent = () => {
    localStorage.removeItem('consent_preferences');
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
    setShowBanner(true);
  };

  if (!showBanner && !showSettings) {
    return (
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-4 left-4 z-40 bg-card border border-border rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 group"
        aria-label="Manage cookie preferences"
      >
        <Cookie className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>
    );
  }

  return (
    <>
      {/* Consent Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Privacy & Consent (DPDP Act 2023)</h3>
                  <p className="text-sm text-muted-foreground">
                    We respect your privacy under the Digital Personal Data Protection Act, 2023. 
                    We use essential cookies for site functionality. You can manage your preferences anytime.{' '}
                    <a href="/privacy-policy" className="text-primary hover:underline">
                      Read our Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Manage
                </Button>
                <Button variant="outline" size="sm" onClick={acceptEssential}>
                  Essential Only
                </Button>
                <Button size="sm" className="btn-health" onClick={acceptAll}>
                  Accept All
                </Button>
              </div>
              <button 
                onClick={acceptEssential}
                className="absolute top-2 right-2 lg:static text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Consent Manager
            </DialogTitle>
            <DialogDescription>
              Manage your privacy preferences as per the Digital Personal Data Protection Act, 2023.
              You can withdraw consent at any time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="flex-1">
                <Label className="text-base font-medium">Essential Cookies</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Required for basic site functionality. These cannot be disabled.
                </p>
              </div>
              <Switch checked={true} disabled className="opacity-50" />
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="flex-1">
                <Label className="text-base font-medium">Analytics</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us understand how visitors interact with our website to improve user experience.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="flex-1">
                <Label className="text-base font-medium">Marketing & Communications</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive updates about latest health articles and promotions. You can opt-out anytime.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>

            {/* Timestamp */}
            {preferences.timestamp && (
              <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
                Last updated: {new Date(preferences.timestamp).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={withdrawConsent}
            >
              Withdraw All Consent
            </Button>
            <Button 
              className="flex-1 btn-health"
              onClick={() => savePreferences(preferences)}
            >
              Save Preferences
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-2">
            For data access, correction, or deletion requests, contact{' '}
            <a href="mailto:info.healthyplates@gmail.com" className="text-primary hover:underline">
              info.healthyplates@gmail.com
            </a>
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConsentManager;
