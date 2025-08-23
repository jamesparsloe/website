import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPost } from "@/app/utils"

export async function generateStaticParams() {
    const posts = await getPosts()

    return posts.map(post => ({
        slug: post.slug
    }))
}

type Props = {
    params: Promise<{
        slug: string;
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { slug } = await props.params;
    let post = await getPost(slug);

    if (!post) {
        return notFound();
    }

    return {
        metadataBase: new URL("https://jamesparsloe.com"),
        title: post.metadata.title,
        description: post.metadata.description,
        openGraph: {
            title: post.metadata.title,
            description: post.metadata.description,
            type: "article",
            url: `/writing/${slug}`,
            ...(post.metadata.image && { images: [post.metadata.image] }),
        },
    }
}


export default async function Page(props: Props) {
    const { slug } = await props.params
    let post = await getPost(slug)

    if (!post) {
        return notFound();
    }

    return (<>
        <div>
            <h1>{post.metadata.title}</h1>
            <div className="flex justify-between">
                <time>{post.metadata.date}</time>
                <Link href="/">Back to home</Link>
            </div>
        </div>
        <div>
            <article >
                <post.Component />
            </article>
        </div>
    </>)
}