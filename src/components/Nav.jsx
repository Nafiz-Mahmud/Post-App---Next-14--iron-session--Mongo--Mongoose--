import Link from "next/link";
import { getSession, logoutAction } from "@/app/actions";
export default async function Nav() {
	const session = await getSession();
	return (
		<nav className="nav">
			<Link href="/">Home</Link>
			<Link href="/posts">Posts</Link>
			<Link href="/premium">Premium</Link>
			{session.isLoggedIn ? (
				<>
					<Link href="/write">Write</Link>
					<Link href="/profile">Profile</Link>
					<form action={logoutAction}>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button>Logout</button>
					</form>
				</>
			) : (
				<>
					<Link href="/login">LogIn</Link>
					<Link href="/signup">SignUp</Link>
				</>
			)}
		</nav>
	);
}
