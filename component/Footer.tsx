import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Therapy", href: "/therapy" },
];

const socialIcons = [
  {
    name: "Facebook",
    icon: "/icons/facebook.svg",
    href: "https://www.facebook.com/SparrcInstitute/",
  },
  {
    name: "X",
    icon: "/icons/x.svg",
    href: "https://twitter.com/sparrcinstitute",
  },
  {
    name: "Instagram",
    icon: "/icons/instagram.svg",
    href: "https://www.instagram.com/sparrcinstitute/",
  },
  {
    name: "YouTube",
    icon: "/icons/youtube.svg",
    href: "https://www.youtube.com/@Sparrc",
  },
  {
    name: "LinkedIn",
    icon: "/icons/linkedin.svg",
    href: "https://www.linkedin.com/company/sparrc/",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white px-2 pb-6 pt-7">
      <div className="mx-auto w-full max-w-[760px]">
        {/* Footer Navigation */}
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-4 items-center border-b border-[#dddddd] pb-5"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-center text-[15px] font-normal leading-none text-[#111111] transition-colors duration-200 hover:text-[#0A4991] sm:text-[17px] md:text-[19px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-5 py-7 sm:gap-6">
          {socialIcons.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit SPARRC on ${social.name}`}
              className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-[9px] bg-white shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_20px_rgba(0,0,0,0.12)] active:scale-95 sm:h-[48px] sm:w-[48px]"
            >
              <div className="relative h-[15px] w-[15px] sm:h-[20px] sm:w-[20px]">
                <Image
                  src={social.icon}
                  alt={`${social.name} icon`}
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="px-3 text-center">
          <p className="mx-auto max-w-[680px] text-[12px] font-normal leading-[1.35] text-[#111111] sm:text-[13px] md:text-[14px]">
            Copyright © 2026 by Sparrc Kinesiohealth Private Limited - All Rights
            Reserved
          </p>

          <p className="mt-1 text-[12px] font-normal leading-[1.35] text-[#111111] sm:text-[13px] md:text-[14px]">
            Design &amp; Developed by Ayatiworks
          </p>
        </div>
      </div>
    </footer>
  );
}