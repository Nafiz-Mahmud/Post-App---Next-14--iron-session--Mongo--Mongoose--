"use client";
import { useFormState } from "react-dom";
import { signupAction } from "../actions";
import SignUpButton from "@/components/SignUpButton";

export default function SignupPage() {
	const [state, formAction] = useFormState(signupAction, "");

	return (
		<div className="login">
			<h1>SignUp Page</h1>
			<form action={formAction}>
				<input type="text" name="username" placeholder="Username" />
				<input type="text" name="email" placeholder="Email" />
				<input type="text" name="password" placeholder="Password" />
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<SignUpButton />
				<p>{state.message}</p>
			</form>
		</div>
	);
}
