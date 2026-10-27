"use client";
import React from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { StaticMapBlock } from "@/payload-types";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

/**
 * The three monochrome basemaps the variants resolve to.
 *
 * Monochrome keeps the map from competing with the brand colours, so the
 * marker is the only saturated thing on it. The variant values are unchanged,
 * so existing blocks keep rendering; only what each one points at has moved.
 *
 * Two providers, chosen by whether a Stadia key is configured:
 *
 * - **Stadia Maps** when `NEXT_PUBLIC_STADIA_API_KEY` is set. Stadia signs a
 *   data processing agreement, which is what lets the privacy policy name a
 *   processor under Article 28 GDPR rather than merely a recipient.
 * - **CARTO** otherwise. It serves these styles with no account and no token,
 *   which is why it was here first and why it stays as the fallback — a
 *   missing key leaves a working map rather than a blank frame.
 *
 * Whichever is used, the visitor's browser requests the tiles *directly*, so
 * that provider sees their IP address. The privacy policy has to name the one
 * actually in use: see docs/politica-de-confidentialitate.md, clause 4.3. A
 * key present in the build and a key absent are two different documents, so
 * this is not a detail to leave to chance — if the key is not set in
 * production, clause 4.3 must say CARTO.
 */
const STADIA_KEY = process.env.NEXT_PUBLIC_STADIA_API_KEY;

const stadia = (style: string): string =>
  `https://tiles.stadiamaps.com/styles/${style}.json?api_key=${STADIA_KEY}`;

const VARIANT_TO_STYLE: Record<NonNullable<StaticMapBlock["variant"]>, string> =
  STADIA_KEY
    ? {
        default: stadia("alidade_smooth"),
        mono: stadia("stamen_toner_lite"),
        "mono-black": stadia("alidade_smooth_dark"),
      }
    : {
        default: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        mono: "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
        "mono-black":
          "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      };

export const StaticMapBlockComponent: React.FC<StaticMapBlock> = (props) => {
  const { variant, initialView, markers } = props || {};

  if (!initialView) return null;

  const { latitude, longitude, zoom } = initialView;
  const mapStyle = VARIANT_TO_STYLE[variant ?? "default"] ?? VARIANT_TO_STYLE.default;

  return (
    <div className="container mx-auto">
      {/* Sized by ratio rather than a viewport height: `70vh` made the map taller
          than the screen on a laptop and a letterbox slot on a phone. The
          min-height keeps it usable once the ratio gets narrow. */}
      <div className="rounded-box relative aspect-[16/9] max-h-[70svh] min-h-[320px] w-full overflow-hidden shadow-lg">
        <Map
          initialViewState={{ latitude, longitude, zoom: zoom ?? 14 }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyle}
          dragRotate={false}
          touchPitch={false}
        >
          {(markers ?? []).map((m, idx) => {
            const lat = m?.latitude ?? latitude;
            const lng = m?.longitude ?? longitude;

            return (
              <Marker key={m?.id ?? idx} latitude={lat} longitude={lng} anchor="bottom">
                <FaLocationDot className="text-primary h-8 w-8 drop-shadow-lg" />
                <Popup
                  closeButton={false}
                  closeOnClick={false}
                  closeOnMove={false}
                  anchor="top"
                  focusAfterOpen={false}
                  offset={[0, 10]}
                  latitude={lat}
                  longitude={lng}
                >
                  <div className="min-w-40 p-2">
                    {m?.title && (
                      <div className="text-base-content text-center text-base font-bold">
                        {m.title}
                      </div>
                    )}
                    {m?.subtitle && (
                      <div className="text-base-content/70 text-center text-sm">
                        {m.subtitle}
                      </div>
                    )}
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-brand btn-brand-xs mt-2 w-full"
                    >
                      Deschide în Maps
                    </Link>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </Map>
      </div>
    </div>
  );
};
