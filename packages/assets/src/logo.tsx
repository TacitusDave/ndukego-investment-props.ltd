import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

/** Icon only — logo-icon.png (the symbol/mark) */
export function LogoIcon({ width = 36, height = 36, className }: LogoProps) {
  return (
    <img
      src="/logo-icon.png"
      alt="Ndukego Homes Gallery"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}

/** Full logo with icon — logo.png (icon + company name) */
export function LogoFull({ width = 200, height = 80, className }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Ndukego Homes Gallery"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}

/** Text only, no icon — logo-xicon.png */
export function LogoWithText({ width = 160, height = 40, className }: LogoProps) {
  return (
    <img
      src="/logo-xicon.png"
      alt="Ndukego Homes Gallery"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}

export const LogoIconLight = LogoIcon;
export const LogoWithTextLight = LogoWithText;
