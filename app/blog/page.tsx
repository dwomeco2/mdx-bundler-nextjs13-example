import { getAllArticles } from "@/lib/mdx";
import Link from "next/link";

export default async function Page() {
  const posts = await getAllArticles();
  
  return (
    <div className="flex flex-col">
        <div className="text-2xl font-bold mb-4">Blog</div>
        {posts.map((article) => {
            return (
                <div key={article.frontmatter.slug} className="mb-4">
                    <h1><Link href={`/blog/${article.frontmatter.slug}`}>{article.frontmatter.title}</Link></h1>
                    <p>{article.frontmatter.publishedAt}</p>
                </div>
            )  
        })}
    </div>
  )
}