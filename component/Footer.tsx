import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Therapy",
    href: "/therapy",
  },
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
    <footer
      id="site-footer"
      className="w-full bg-white px-2 pb-6 pt-7"
    >
      <div className="mx-auto w-full max-w-[760px]">
        {/* Footer navigation */}
        <nav
          aria-label="Footer navigation"
          className="
            grid
            grid-cols-4
            items-center
            border-b
            border-[#dddddd]
            pb-5
          "
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="
                text-center
                text-[15px]
                font-normal
                leading-none
                text-[#111111]
                transition-colors
                duration-200
                hover:text-[#0a4991]
                sm:text-[17px]
                md:text-[19px]
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social icons */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-6
            py-7
            sm:gap-8
          "
        >
          {socialIcons.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit SPARRC on ${social.name}`}
              className="
                relative
                flex
                h-[22px]
                w-[22px]
                shrink-0
                touch-manipulation
                items-center
                justify-center
                transition-transform
                duration-200
                hover:-translate-y-0.5
                hover:scale-110
                active:scale-95
                sm:h-[25px]
                sm:w-[25px]
                [-webkit-tap-highlight-color:transparent]
              "
            >
              <Image
                src={social.icon}
                alt={`${social.name} icon`}
                fill
                sizes="25px"
                className="object-contain"
              />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="px-3 text-center">
          <p
            className="
    mx-auto
    text-[12px]
    font-normal
    leading-[1.5]
    text-[#111111]
    sm:text-[13px]
    md:text-[14px]
  "
          >
            <span className="block">
              Copyright © 2026 by Sparrc Kinesiohealth Private Limited
              <span className="mx-1">|</span>
            </span>

            <span className="block">All Rights Reserved</span>
          </p>

          <p
            className="
              mt-1.5
              text-[12px]
              font-normal
              leading-[1.45]
              text-[#111111]
              sm:text-[13px]
              md:text-[14px]
            "
          >
            Design &amp; Developed by{" "}
            <a
              href="https://ayatiworks.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Ayatiworks website"
              className="
                font-medium
                text-[#111111]
                underline-offset-4
                transition-colors
                duration-200
                hover:text-[#0a4991]
                
              "
            >
              Ayatiworks
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}