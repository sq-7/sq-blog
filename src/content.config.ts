import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const EN_BLOG_PATH = "src/data/blog/en";
export const ZH_BLOG_PATH = "src/data/blog/zh";

const schema = ({ image }) =>
    z.object({
        author: z.string().default(SITE.author),
        pubDatetime: z.date(),
        modDatetime: z.date().optional().nullable(),
        title: z.string(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
        ogImage: image().or(z.string()).optional(),
        description: z.string(),
        canonicalURL: z.string().optional(),
        hideEditPost: z.boolean().optional(),
        timezone: z.string().optional(),
    })

const zhBlog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${ZH_BLOG_PATH}` }),
  schema,
});

const enBlog = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: `./${EN_BLOG_PATH}` }),
    schema,
});

export const collections = {
    zhBlog,
    enBlog
};
