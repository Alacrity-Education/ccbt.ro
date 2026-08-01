import React from "react";

import type { DividerBlock as DividerBlockProps } from "@/payload-types";

// Palette (raw brand hexes, matching the source SVGs and globals.css).
const COLORS: Record<string, string> = {
  purple: "#5F0058",
  coral: "#FB3524",
  cyan: "#5ED9FC",
  green: "#009E5C",
  pink: "#F6C4DA",
  amber: "#9B5B00",
  white: "#FFFFFF",
  ink: "#201D1E",
};

// Each pattern is kept verbatim from the exported SVG. Recoloring maps the
// pattern's source hexes (roles c1/c2/c3) onto the chosen palette colors, with
// `defaults` reproducing the original artwork when a slot is left on "default".
const SVG_A = `<svg width="1600" height="69" viewBox="0 0 1600 69" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M297.262 0V6.88034V20.4351V47.7411V53.6386V61.2959H316.61V53.6386V47.7411V20.4351V6.88034V0H297.262Z" fill="#FB3524"/>
<path d="M297.262 0H287.445V20.3321H297.262V0Z" fill="#009E5C"/>
<path d="M209.766 0H199.949V20.3321H209.766V0Z" fill="#009E5C"/>
<path d="M180.602 0H0V20.3321H180.602V0Z" fill="#009E5C"/>
<path d="M180.602 30.6475H0V50.9796H180.602V30.6475Z" fill="#009E5C"/>
<path d="M238.934 0H229.117V20.3321H238.934V0Z" fill="#009E5C"/>
<path d="M1602 0H316.609V20.3321H1602V0Z" fill="#009E5C"/>
<path d="M268.098 0H258.281V20.3321H268.098V0Z" fill="#009E5C"/>
<path d="M209.766 30.6475H199.949V50.9796H209.766V30.6475Z" fill="#009E5C"/>
<path d="M1602 30.6475H316.609V50.9796H1602V30.6475Z" fill="#009E5C"/>
<path d="M268.098 30.6475H258.281V50.9796H268.098V30.6475Z" fill="#009E5C"/>
<path d="M297.262 30.6475H287.445V50.9796H297.262V30.6475Z" fill="#009E5C"/>
<path d="M238.934 30.6475H229.117V50.9796H238.934V30.6475Z" fill="#009E5C"/>
<path d="M316.61 50.9805H297.262V69.0004H316.61V50.9805Z" fill="#FB3524"/>
<path d="M316.61 30.6475H297.262V50.9796H316.61V30.6475Z" fill="#009E5C"/>
<path d="M258.282 69.0004V50.9805H238.934V69.0004" fill="#FB3524"/>
<path d="M287.446 0H268.098V20.3321H287.446V0Z" fill="#009E5C"/>
<path d="M268.098 20.332V32.5856V56.7464V68.9999H287.446V56.7464V32.5856V20.332H268.098Z" fill="#FB3524"/>
<path d="M238.934 0V7.71347V22.9345V30.6479H258.282V22.9345V7.71347V0H238.934Z" fill="#FB3524"/>
<path d="M258.282 30.6475H238.934V50.9796H258.282V30.6475Z" fill="#009E5C"/>
<path d="M229.114 0H209.766V20.3321H229.114V0Z" fill="#009E5C"/>
<path d="M209.766 20.332V32.5856V56.7464V68.9999H229.114V56.7464V32.5856V20.332H209.766Z" fill="#FB3524"/>
<path d="M199.95 50.9805H180.602V69.0004H199.95V50.9805Z" fill="#FB3524"/>
<path d="M180.602 0V7.72283V22.9345V30.6479H199.95V22.9345V7.72283V0H180.602Z" fill="#FB3524"/>
<path d="M199.95 30.6475H180.602V50.9796H199.95V30.6475Z" fill="#009E5C"/>
</svg>`;

const SVG_B = `<svg width="1602" height="74" viewBox="0 0 1602 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1125.64 52.1533H1114.14V73.8998H1125.64V52.1533Z" fill="#009E5C"/>
<path d="M1057.29 19.374H1045.79V41.1205H1057.29V19.374Z" fill="#FB3524"/>
<path d="M1091.47 19.374H1079.96V41.1205H1091.47V19.374Z" fill="#FB3524"/>
<path d="M1011.61 19.374H988.931H0V41.1205H988.931H1011.61H1023.11V19.374H1011.61Z" fill="#FB3524"/>
<path d="M1057.29 0.100586V19.374H1079.96V0.100586" fill="#5F0058"/>
<path d="M1057.29 0.100586V19.374H1079.96V0.100586" stroke="#5F0058" stroke-width="0.2" stroke-miterlimit="10"/>
<path d="M1045.78 52.1533H1023.11H1011.61H0V73.8998H1011.61H1023.11H1045.78H1057.29V52.1533H1045.78Z" fill="#FB3524"/>
<path d="M1045.78 52.1539V39.048V13.2065V0.100586H1023.11V13.2065V39.048V52.1539H1045.78Z" fill="#5F0058" stroke="#5F0058" stroke-width="0.2" stroke-miterlimit="10"/>
<path d="M1079.96 73.9V65.65V49.3802V41.1201H1057.29V49.3802V65.65V73.9H1079.96Z" fill="#5F0058" stroke="#5F0058" stroke-width="0.2" stroke-miterlimit="10"/>
<path d="M1079.96 19.374H1057.29V41.1205H1079.96V19.374Z" fill="#FB3524"/>
<path d="M1114.14 52.1539V39.048V13.2065V0.100586H1091.47V13.2065V39.048V52.1539H1114.14Z" fill="#5F0058" stroke="#5F0058" stroke-width="0.2" stroke-miterlimit="10"/>
<path d="M1602 52.1543H1114.14V73.9007H1602V52.1543Z" fill="#FB3524"/>
<path d="M1091.47 52.1543H1079.96V73.9007H1091.47H1114.14V52.1543H1091.47Z" fill="#FB3524"/>
<path d="M1148.32 19.374H1125.65H1114.14V41.1205H1125.65H1148.32H1602V19.374H1148.32Z" fill="#FB3524"/>
</svg>`;

const SVG_C = `<svg width="1600" height="51" viewBox="0 0 1600 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1009.93 20.3589H999.609V0.0932426H1009.93V20.3589Z" fill="#009E5C"/>
<path d="M948.603 50.9067H938.281V30.6411H948.603V50.9067Z" fill="#009E5C"/>
<path d="M979.267 50.9067H968.945V30.6411H979.267V50.9067Z" fill="#009E5C"/>
<path d="M907.614 50.9067H887.271H0V30.6411H887.271H907.614H917.936V50.9067H907.614Z" fill="#009E5C"/>
<path d="M938.28 20.3589H917.936H907.614H0V0.0932426H907.614H917.936H938.28H948.601V20.3589H938.28Z" fill="#009E5C"/>
<path d="M938.281 20.359V32.5725V47.6691V50.9067H917.938V47.6691V32.5725V20.359H938.281Z" fill="#5F0058" stroke="#5F0058" stroke-width="0.2" stroke-miterlimit="10"/>
<path d="M968.945 0.0933609V7.79095V22.9529V30.6411H948.602V22.9529V7.79095V0.0933609H968.945Z" fill="#5F0058" stroke="#5F0058" stroke-width="0.2" stroke-miterlimit="10"/>
<path d="M968.945 50.9067H948.602V30.6411H968.945V50.9067Z" fill="#009E5C"/>
<path d="M999.609 20.359V32.5725V47.6691V50.9067H979.266V47.6691V32.5725V20.359H999.609Z" fill="#5F0058" stroke="#5F0058" stroke-width="0.2" stroke-miterlimit="10"/>
<path d="M1599.99 20.3589H999.609V0.0932426H1599.99V20.3589Z" fill="#009E5C"/>
<path d="M979.267 20.3589H968.945V0.0932426H979.267H999.611V20.3589H979.267Z" fill="#009E5C"/>
<path d="M1030.27 50.9067H1009.93H999.609V30.6411H1009.93H1030.27H1600V50.9067H1030.27Z" fill="#009E5C"/>
</svg>`;

const SVG_D = `<svg width="1602" height="107" viewBox="0 0 1602 107" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M209.766 0H199.949V19.3767H209.766V0Z" fill="#5ED9FC"/>
<path d="M1602 0H316.609V19.3767H1602V0Z" fill="#5ED9FC"/>
<path d="M297.262 0H287.445V19.3767H297.262V0Z" fill="#5ED9FC"/>
<path d="M297.262 29.208H287.445V48.5847H297.262V29.208Z" fill="#5ED9FC"/>
<path d="M209.766 29.208H199.949V48.5847H209.766V29.208Z" fill="#5ED9FC"/>
<path d="M180.602 29.208H0V48.5847H180.602V29.208Z" fill="#5ED9FC"/>
<path d="M180.602 58.4155H0V77.7922H180.602V58.4155Z" fill="#5ED9FC"/>
<path d="M180.602 87.6235H0V107H180.602V87.6235Z" fill="#5ED9FC"/>
<path d="M1600.38 87.6235H316.609V107H1600.38V87.6235Z" fill="#5ED9FC"/>
<path d="M238.934 29.208H229.117V48.5847H238.934V29.208Z" fill="#5ED9FC"/>
<path d="M1602 29.208H316.609V48.5847H1602V29.208Z" fill="#5ED9FC"/>
<path d="M268.098 29.208H258.281V48.5847H268.098V29.208Z" fill="#5ED9FC"/>
<path d="M209.766 58.4155H199.949V77.7922H209.766V58.4155Z" fill="#5ED9FC"/>
<path d="M1602 58.4155H316.609V77.7922H1602V58.4155Z" fill="#5ED9FC"/>
<path d="M268.098 58.4155H258.281V77.7922H268.098V58.4155Z" fill="#5ED9FC"/>
<path d="M297.262 58.4155H287.445V77.7922H297.262V58.4155Z" fill="#5ED9FC"/>
<path d="M238.934 58.4155H229.117V77.7922H238.934V58.4155Z" fill="#5ED9FC"/>
<path d="M268.098 87.6235H258.281V107H268.098V87.6235Z" fill="#5ED9FC"/>
<path d="M297.262 87.6235H287.445V107H297.262V87.6235Z" fill="#5ED9FC"/>
<path d="M209.766 87.6235H199.949V107H209.766V87.6235Z" fill="#5ED9FC"/>
<path d="M238.934 87.6235H229.117V107H238.934V87.6235Z" fill="#5ED9FC"/>
<path d="M316.61 77.792H297.262V87.6231H316.61V77.792Z" fill="#F6C4DA"/>
<path d="M316.61 0H297.262V19.3767H316.61V0Z" fill="#5ED9FC"/>
<path d="M316.61 58.4155H297.262V77.7922H316.61V58.4155Z" fill="#9B5B00"/>
<path d="M287.446 19.3765H268.098V29.2075H287.446V19.3765Z" fill="#FB3524"/>
<path d="M287.446 0H268.098V19.3767H287.446V0Z" fill="#FB3524"/>
<path d="M287.446 29.208H268.098V48.5847H287.446V29.208Z" fill="#5ED9FC"/>
<path d="M268.098 48.5845V58.4156V77.7922V87.6233H287.446V77.7922V58.4156V48.5845H268.098Z" fill="#FB3524"/>
<path d="M287.446 87.6235H268.098V107H287.446V87.6235Z" fill="#5ED9FC"/>
<path d="M268.099 0H258.282H238.934H229.117V19.3767H238.934H258.282H268.099V0Z" fill="#5ED9FC"/>
<path d="M238.934 19.3765V29.2075V48.5842V58.4153H258.282V48.5842V29.2075V19.3765H238.934Z" fill="#FB3524"/>
<path d="M258.282 58.4155H238.934V77.7922H258.282V58.4155Z" fill="#5ED9FC"/>
<path d="M238.934 77.792V87.6231V107H258.282V87.6231V77.792H238.934Z" fill="#FB3524"/>
<path d="M229.114 19.3765H209.766V29.2075H229.114V19.3765Z" fill="#FB3524"/>
<path d="M229.114 0H209.766V19.3767H229.114V0Z" fill="#FB3524"/>
<path d="M229.114 29.208H209.766V48.5847H229.114V29.208Z" fill="#5ED9FC"/>
<path d="M209.766 48.5845V58.4156V77.7922V87.6233H229.114V77.7922V58.4156V48.5845H209.766Z" fill="#FB3524"/>
<path d="M229.114 87.6235H209.766V107H229.114V87.6235Z" fill="#5ED9FC"/>
<path d="M199.95 77.792H180.602V87.6231H199.95V77.792Z" fill="#FB3524"/>
<path d="M199.95 0H0V19.3767H199.95V0Z" fill="#5ED9FC"/>
<path d="M180.602 19.3765V29.2075V48.5842V58.4153H199.95V48.5842V29.2075V19.3765H180.602Z" fill="#FB3524"/>
<path d="M199.95 58.4155H180.602V77.7922H199.95V58.4155Z" fill="#5ED9FC"/>
<path d="M199.95 87.6235H180.602V107H199.95V87.6235Z" fill="#FB3524"/>
<path d="M297.262 19.3765V29.2075V48.5842V87.6231V96.0536V107H316.61V96.0536V87.6231V48.5842V29.2075V19.3765H297.262Z" fill="#FB3524"/>
</svg>`;

type Roles = { c1: string; c2: string; c3?: string };

const PATTERNS: Record<
  string,
  { svg: string; roles: Roles; defaults: { c1: string; c2: string; c3?: string } }
> = {
  a: { svg: SVG_A, roles: { c1: "#009E5C", c2: "#FB3524" }, defaults: { c1: "green", c2: "coral" } },
  b: {
    svg: SVG_B,
    roles: { c1: "#FB3524", c2: "#5F0058", c3: "#009E5C" },
    defaults: { c1: "coral", c2: "purple", c3: "green" },
  },
  c: { svg: SVG_C, roles: { c1: "#009E5C", c2: "#5F0058" }, defaults: { c1: "green", c2: "purple" } },
  d: {
    svg: SVG_D,
    roles: { c1: "#5ED9FC", c2: "#FB3524", c3: "#F6C4DA" },
    defaults: { c1: "cyan", c2: "coral", c3: "pink" },
  },
};

/** Resolve a chosen palette name (or "default") to a hex, falling back to the pattern default. */
function resolve(chosen: string | null | undefined, fallbackName: string, originalHex: string) {
  const name = chosen && chosen !== "default" ? chosen : fallbackName;
  return COLORS[name] ?? originalHex;
}

export const DividerBlock: React.FC<DividerBlockProps> = ({
  pattern,
  primaryColor,
  secondaryColor,
  tertiaryColor,
}) => {
  const def = PATTERNS[pattern ?? "a"] ?? PATTERNS.a;

  const chosen: Record<keyof Roles, string | null | undefined> = {
    c1: primaryColor,
    c2: secondaryColor,
    c3: tertiaryColor,
  };

  // Two-phase swap (hex -> token -> hex) so a slot's new color can't be picked
  // up by a later slot's replacement.
  let svg = def.svg;
  (Object.keys(def.roles) as (keyof Roles)[]).forEach((key) => {
    svg = svg.split(def.roles[key] as string).join(`__DV_${key}__`);
  });
  (Object.keys(def.roles) as (keyof Roles)[]).forEach((key) => {
    const hex = resolve(chosen[key], def.defaults[key] as string, def.roles[key] as string);
    svg = svg.split(`__DV_${key}__`).join(hex);
  });

  // "slice" makes the SVG cover its box (cropping horizontally) instead of
  // shrinking to fit — combined with the small-screen min-height below, the
  // divider stays a readable height on phones and just gets cropped.
  svg = svg.replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" ');

  return (
    <div
      aria-hidden
      className="w-full [&_svg]:block [&_svg]:w-full [&_svg]:h-auto [&_svg]:min-h-14 md:[&_svg]:min-h-0"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
