import type { MetadataRoute } from "next";

// AI training/scraping crawlers: no benefit to the site, and each page they
// fetch costs a server function invocation
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "CCBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "PerplexityBot",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
  "FacebookBot",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  "cohere-ai",
  "Timpibot",
];

const robots = (): MetadataRoute.Robots => ({
  rules: [
    { userAgent: AI_CRAWLERS, disallow: "/" },
    {
      // Search engines: index the main pages, skip the endless sub-pages
      // (cast, images, translations, ...) and search results
      userAgent: "*",
      allow: "/",
      disallow: [
        "/search",
        "/movie/*/",
        "/tv/*/",
        "/person/*/",
        "/*?*page=",
        "/_next/image",
      ],
      crawlDelay: 10,
    },
  ],
});

export default robots;
