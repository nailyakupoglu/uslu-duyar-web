import { blogPosts } from "@/lib/data";

export type CmsAdapter = {
  getPosts: typeof getMdxPosts;
  getPostBySlug: typeof getMdxPostBySlug;
};

export async function getMdxPosts() {
  return blogPosts;
}

export async function getMdxPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export const cms: CmsAdapter = {
  getPosts: getMdxPosts,
  getPostBySlug: getMdxPostBySlug
};

// Future Sanity migration point:
// export const cms = process.env.CMS_PROVIDER === "sanity" ? sanityAdapter : mdxAdapter;
