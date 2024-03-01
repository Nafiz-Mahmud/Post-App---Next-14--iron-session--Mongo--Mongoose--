import { getSession } from "../actions";
export default async function PremiumPage() {
	const session = await getSession();

	return (
		<div className="premium">
			{session.isPro ? (
				<div>
					<h2>
						You Are A <b className="text-green-600">Premium</b> Member!
					</h2>
					<h3>Extra Features :</h3>
					<ul>
						<li>1. Free Access</li>
						<li>2. Unlimited Posts</li>
						<li>3. Special Offers</li>
					</ul>
				</div>
			) : (
				<h2>
					You Are A Free Member! <br /> [ No Extra Features ]
				</h2>
			)}
		</div>
	);
}
