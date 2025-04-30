export const SITE = {
  website: "https://sqblog.vercel.app/", // replace this with your deployed domain
  author: "SQ",
  profile: "https://sqblog.vercel.app/about",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "SQ Blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/sq-7/sq-blog/edit/master/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
