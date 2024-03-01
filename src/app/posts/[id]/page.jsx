import { getPost } from "@/app/actions";
import { getSession,deletePost } from "@/app/actions";
import { unstable_noStore } from "next/cache";
export default async function SinglePostPage({ params }) {
	const { id } = params;
	const session = await getSession();
	const post = await getPost(id);
	unstable_noStore();
	return (
		<div className="singlePost">
			<h1>Title : {post?.title}</h1>
			<h1>Author : { session?.userId == post?.userId ? "Myself" :  post.author }</h1>
			<br />
			{
				session.userId == post?.userId && (
					<form action={deletePost.bind(null, post.id)}>
				<button>Delete</button>
			</form>
				)
			}
		</div>
	);
}
