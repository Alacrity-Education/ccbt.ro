"use client";
import React from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { StaticMapBlock } from "@/payload-types";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

/**
 * The three monochrome basemaps the variants resolve to, all from CARTO.
 *
 * Monochrome keeps the map from competing with the brand colours, so the
 * marker is the only saturated thing on it. The variant values are unchanged,
 * so existing blocks keep rendering; only what each one points at has moved.
 *
 * The key goes on the style URL alone: CARTO writes it into every tile, glyph
 * and sprite URL of the style it returns, so nothing further has to carry it.
 * Without one the styles are still served today, which is why a missing key
 * falls back to a bare URL rather than to no map.
 *
 * The key is restricted by domain, and that is checked against the Referer the
 * browser sends: from ccbt.ro and cms.ccbt.ro it is accepted, from anywhere
 * else it is refused with a 403 and the map stays blank. Every hostname that
 * serves this site has to be on the key's list in the CARTO dashboard — the
 * Cloudflare Pages address and its preview subdomains included.
 *
 * The visitor's browser requests the tiles directly, so CARTO sees their IP
 * address; that is what clause 4.3 of the privacy policy describes (see
 * docs/politica-de-confidentialitate.md).
 */
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY;

const carto = (style: string): string =>
  `https://basemaps.cartocdn.com/gl/${style}/style.json${CARTO_KEY ? `?key=${CARTO_KEY}` : ""}`;

const VARIANT_TO_STYLE: Record<NonNullable<StaticMapBlock["variant"]>, string> = {
  default: carto("positron-gl-style"),
  mono: carto("positron-nolabels-gl-style"),
  "mono-black": carto("dark-matter-gl-style"),
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
