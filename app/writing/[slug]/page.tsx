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
        twitter: {
            card: "summary_large_image",
            title: post.metadata.title,
            description: post.metadata.description,
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
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{post.metadata.title}</h1>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-base border-b pb-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                        <span className="font-medium">Created:</span> <time>{post.metadata.date}</time>
                    </div>
                    {post.metadata.updated && <div>
                        <span className="font-medium">Last Updated:</span> <time>{post.metadata.updated}</time>
                    </div>
                    }
                </div>
                <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                    ← Back to home
                </Link>
            </div>
        </div>
        <div>
            <article >
                <post.Component />
            </article>
        </div>
    </>)
}