import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/assets/HPLogo.png";

const Footer = () => {
  const [settings, setSettings] = useState<any>({});
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*");
    const settingsObj: any = {};
    data?.forEach((item) => {
      settingsObj[item.setting_key] = item.setting_value;
    });
    setSettings(settingsObj);
  };

  return (
    <footer className="bg-gradient-subtle border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="HealthyPlates Logo"
                className="h-10 w-auto object-contain"
              />
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  HealthyPlates
                </h3>
                <p className="text-xs text-muted-foreground">
                  Eat Smart, Live Healthy
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {settings.site_description ||
                "Your trusted source for healthy eating, nutrition tips, and wellness guidance."}
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                asChild
              >
                <a
                  href="https://www.instagram.com/healthyplates.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                asChild
              >
                <a
                  href="https://www.youtube.com/@HealthyPlates-hp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe on YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                asChild
              >
                <a
                  href={settings.social_whatsapp || "https://wa.me/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Explore
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/food-products"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Food Products
              </Link>
              <Link
                to="/foods"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Foods by Time
              </Link>
              <Link
                to="/diseases"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Disease Guide
              </Link>
              <Link
                to="/self-care"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Self-Care
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Resources
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/blog"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Health Blog
              </Link>
              <Link
                to="/body-explorer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Know Your Body
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-3">
              <a 
                href={`mailto:${settings.contact_email || "info.healthyplates@gmail.com"}`}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{settings.contact_email || "info.healthyplates@gmail.com"}</span>
              </a>
              <a 
                href={`tel:${settings.contact_phone || "+918667454755"}`}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{settings.contact_phone || "+91 8667454755"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} HealthyPlates.in. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Developed by RAJESHKANNA S
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
