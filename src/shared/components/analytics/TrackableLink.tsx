"use client";

import React from "react";
import Link from "next/link";
import { analytics } from "@/services/analytics";

interface TrackableLinkProps {
  href: string;
  trackAs: "cta" | "social" | "outbound";
  trackLabel: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * A link component that automatically tracks clicks to analytics.
 * Use this for CTAs, social links, and outbound links.
 *
 * Usage:
 *   <TrackableLink href="/products" trackAs="cta" trackLabel="Hero CTA">
 *     Shop Now
 *   </TrackableLink>
 */
export default function TrackableLink({
  href,
  trackAs,
  trackLabel,
  children,
  className,
  target,
  rel,
}: TrackableLinkProps) {
  const handleClick = () => {
    switch (trackAs) {
      case "cta":
        analytics.trackCTAClick(trackLabel, href);
        break;
      case "social":
        analytics.trackSocialClick(trackLabel);
        break;
      case "outbound":
        analytics.trackEvent({
          event: "cta_click",
          category: "outbound",
          label: `${trackLabel} → ${href}`,
        });
        break;
    }
  };

  // External links use <a>, internal links use Next.js <Link>
  const isExternal = href.startsWith("http") || href.startsWith("//");

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
