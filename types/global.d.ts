type Slug = string;

type FrontMatter = {
    slug: Slug,
    title: string,
    publishedAt: string,
};

type Article = {
    frontmatter: FrontMatter;
    content: string;
};