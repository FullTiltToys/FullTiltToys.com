import { siteChromeScript } from "@/lib/site-chrome";

export function SiteChromeScript() {
  return (
    <script
      id="site-chrome-script"
      dangerouslySetInnerHTML={{ __html: siteChromeScript }}
    />
  );
}
