"use client";

import NextTopLoader from "nextjs-toploader";

export default function PageLoader() {
  return (
    <NextTopLoader
      color="#E3A62A"
      height={3}
      showSpinner={false}
      shadow="0 0 10px #E3A62A, 0 0 5px #E3A62A"
      easing="ease"
      speed={400}
    />
  );
}