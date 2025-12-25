// lib/loadGA.ts
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default function loadGA(measurementId: string) {
  if (document.getElementById("ga-gtag")) return;

  const s1 = document.createElement("script");
  s1.id = "ga-gtag";
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s1);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}
