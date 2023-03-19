import { getAllArticles, mdxFromSlug } from "@/lib/mdx"

import BlogPostPage from "@/app/mdx/mdxclient";

import styles from "./[slug].module.css";

// SSG
export async function generateStaticParams() {
  const articles = await getAllArticles();
  
  return articles.map((article) => {
    return {
      slug: article.frontmatter.slug
    }
  });
}

export default async function article({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const code = await mdxFromSlug(slug)

  return (
    <div className={styles.markdown}>
      <BlogPostPage code={code} />
    </div>
  )
}