type Props = {
  embedUrl: string;
  directionsUrl?: string;
  directionsLabel?: string;
  venueName: string;
};

const approvedVenueEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2436717628357!2d106.7962058!3d10.8690622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527dc5cf0055b%3A0x111f376ec66f68f1!2zSOG7mWkgdHLGsOG7nW5nIFRy4bqnbiBDaMOtIMSQw6Fv!5e0!3m2!1svi!2s!4v1794595414534!5m2!1svi!2s";

function validEmbedUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && url.hostname === "www.google.com" &&
      url.pathname === "/maps/embed" && Boolean(url.searchParams.get("pb"));
  } catch {
    return false;
  }
}

export default function VenueMapPreview({ embedUrl, venueName }: Props) {
  const src = validEmbedUrl(embedUrl) ? embedUrl.trim() : approvedVenueEmbedUrl;

  return (
    <div className="map-preview" role="group" aria-label={`Location preview for ${venueName}`}>
      <iframe
        className="map-embed"
        title={`Google Maps preview for ${venueName}`}
        src={src}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
