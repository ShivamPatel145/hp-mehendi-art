import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

function Facebook({ size = 24, ...props }: CustomIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Instagram({ size = 24, ...props }: CustomIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#2C1810] text-[#FAF7F2]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm mb-4">
              <Image
                src="/hp_logo.png"
                alt="HP Mehendi Art"
                width={180}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[#FAF7F2]/70 text-sm leading-relaxed max-w-xs">
              Elegant Mehndi Designs for Every Occasion. Specializing in luxury bridal, traditional, and modern henna art.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/hp_mehendi_art"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#FAF7F2]/70 hover:text-accent transition-colors p-2.5 bg-white/8 hover:bg-white/15 rounded-full border border-white/10"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-[#FAF7F2]/70 hover:text-accent transition-colors p-2.5 bg-white/8 hover:bg-white/15 rounded-full border border-white/10"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-heading text-lg font-semibold text-accent mb-5 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Gallery", href: "/gallery" },
                { label: "Services", href: "/services" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#FAF7F2]/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-heading text-lg font-semibold text-accent mb-5 uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <MapPin className="text-accent shrink-0 mt-0.5" size={18} />
                <span className="text-[#FAF7F2]/70 text-sm leading-snug">
                  193, Amizara Residency,<br />Bamroli, Surat, Gujarat
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Phone className="text-accent shrink-0" size={18} />
                <a href="tel:+919313994191" className="text-[#FAF7F2]/70 hover:text-accent transition-colors text-sm">
                  +91 9313994191
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="text-accent shrink-0" size={18} />
                <a href="mailto:book@hpmehendiart.com" className="text-[#FAF7F2]/70 hover:text-accent transition-colors text-sm break-all">
                  book@hpmehendiart.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#FAF7F2]/40">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Himani Patel Mehendi Art. All rights reserved.
          </p>
          <p>Designed for luxury.</p>
        </div>
      </div>
    </footer>
  );
}
