"use client";

import { getMDXComponent } from 'mdx-bundler/client';

type Props = {
    code: string;
}

export default function BlogPostPage({ code }: Props): JSX.Element {
    const Component = getMDXComponent(code);
    return <Component />
}