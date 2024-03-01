import Link from "next/link";
import {  getPosts } from "../actions";
import { getSession } from "../actions";
import { unstable_noStore } from "next/cache";
export default async function PostsPage() {
	const session = await getSession();
	const posts = await getPosts();
	unstable_noStore();

	return (
		<div className="all_posts">
			<h1>All Posts ( {posts.length} )</h1>
			<div className="posts">
				{posts.map((post, i) => (
					<div
						className="post"
						style={{ animationDelay: `${i * 0.2}s` }}
						key={post.id}
					>
						<Link href={`/posts/${post.id}`}>
							<h2 className="underline">
								{i + 1}. {post.title}
							</h2>
						</Link>
					
						<h3>Author : { session?.userId == post?.userId ? "Myself" :  post.author}</h3>
					</div>
				))}
			</div>
		</div>
	);
}
