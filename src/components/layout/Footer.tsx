import { Link } from "react-router-dom";
import {
  Leaf,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="HP Logo"
                className="h-8 w-8 object-contain"
                style={{ width: "6rem", height: "3rem" }}
              />
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  HealthyPlates
                </h3>
                <p className="text-sm text-muted-foreground">
                  Eat Smart, Live Healthy
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {settings.site_description ||
                "Your trusted source for healthy eating, nutrition tips, and wellness guidance. Discover the power of natural foods for a healthier lifestyle."}
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                asChild
              >
                <a
                  href={"https://www.instagram.com/healthyplates.in/"}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  href={"https://www.youtube.com/@HealthyPlates-hp"}
                  target="_blank"
                  rel="noopener noreferrer"
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
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/food-products"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Food Items
              </Link>
              <Link
                to="/foods"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Daily Meals
              </Link>
              <Link
                to="/diseases"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Disease Guide
              </Link>
              <Link
                to="/self-care"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Self-Care
              </Link>
              <Link
                to="/blog"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/admin"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Admin
              </Link>
            </nav>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Contact & Legal
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-health" />
                <span className="text-sm text-muted-foreground">
                  {settings.contact_email || "info.healthyplates@gmail.com"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-health" />
                <span className="text-sm text-muted-foreground">
                  {settings.contact_phone || "+91 8667454755"}
                </span>
              </div>
            </div>
            <nav className="flex flex-col space-y-2 pt-2 border-t border-border/50">
              <Link
                to="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/disclaimer"
                className="text-sm text-muted-foreground hover:text-health transition-colors"
              >
                Medical Disclaimer
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HealthyPlates.in, All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Developed by RAJESHKANNA S
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
