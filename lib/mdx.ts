import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { sync } from 'glob'
import { bundleMDX } from 'mdx-bundler';
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";

const articlesPath = path.join(process.cwd(), 'data/articles')

export async function getSlug(): Promise<Slug[]> {
  const paths = sync(`${articlesPath}/*.mdx`)

  return paths.map((path) => {
    // holds the paths to the directory of the article
    const pathContent = path.split('/')
    const fileName = pathContent[pathContent.length - 1]
    const [slug, _extension] = fileName.split('.')

    return slug
  })
}

export async function getArticleFromSlug(slug: Slug): Promise<Article> {
    const articleDir = path.join(articlesPath, `${slug}.mdx`)
    const source = fs.readFileSync(articleDir)
    const { content, data } = matter(source)
  
    return {
      content,
      frontmatter: {
        slug,
        title: data.title,
        publishedAt: data.publishedAt,
        ...data,
      },
    }
}

export async function mdxFromSlug(slug: Slug): Promise<string> {
  const { content } = await getArticleFromSlug(slug)

  const { code } = await bundleMDX({
    source: content,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ];
      return options;
    },
  })

  return code;
}

export async function getAllArticles(): Promise<Article[]> {
    const articles = fs.readdirSync(path.join(process.cwd(), 'data/articles'))
  
    return articles.reduce((allArticles: Article[], articleSlug: Slug) => {
      // get parsed data from mdx files in the "articles" dir
      const source = fs.readFileSync(
        path.join(process.cwd(), 'data/articles', articleSlug),
        'utf-8'
      )
      const { content, data } = matter(source)
    
      return [
        {
            content,
            frontmatter: {
                slug: articleSlug.replace('.mdx', ''),
                title: data.title,
                publishedAt: data.publishedAt,
                ...data,
            },
        },
        ...allArticles,
    ]}, [])
}