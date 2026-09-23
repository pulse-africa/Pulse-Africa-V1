import React, { useEffect, useState } from 'react';

const FALLBACK_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width=%22600%22 height=%22360%22 viewBox=%220 0 600 360%22%3E%3Crect width=%22600%22 height=%22360%22 fill=%22%23141414%22%2F%3E%3Cpath d=%22M0 290L170 190l80 48 110-110 240 150v82H0z%22 fill=%22%232b2b2b%22%2F%3E%3Ccircle cx=%22470%22 cy=%22102%22 r=%2242%22 fill=%22%23cc0000%22 opacity=%22.7%22%2F%3E%3Ctext x=%2230%22 y=%22325%22 fill=%22%23ffffff%22 font-family=%22Arial%22 font-size=%2220%22 font-weight=%22700%22%3EPULSE AFRICA%3C%2Ftext%3E%3C%2Fsvg%3E';

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackLabel?: string;
};

export default function SafeImage({ src, alt, fallbackLabel: _fallbackLabel, ...props }: SafeImageProps) {
  const [source, setSource] = useState(src);

  useEffect(() => {
    setSource(src);
  }, [src]);

  return (
    <img
      {...props}
      src={source || FALLBACK_IMAGE}
      alt={alt}
      onError={() => {
        if (source !== FALLBACK_IMAGE) setSource(FALLBACK_IMAGE);
      }}
    />
  );
}