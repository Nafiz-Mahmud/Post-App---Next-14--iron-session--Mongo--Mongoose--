import { getSession,updateMembershipAction } from "../actions";
export default async function ProfilePage() {
	const session = await getSession();
	console.log(session);

	return (
		<div className="profile">
			<h1>Username : {session.username}</h1>
			<h2>Post Count : {session.postCount ? session.postCount : 0} </h2>

			<h3>You are a {session.isPro ? "Pro" : "Free"} user!</h3>
			<form action={updateMembershipAction}>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button className={session.isPro ? "bg-red-500" : "bg-green-500"}>
				{session.isPro ? "Cancel" : "Buy"} Membership
			</button>
			</form>
		</div>
	);
}
