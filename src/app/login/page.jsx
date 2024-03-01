"use client";
import { useFormState } from "react-dom";
import { loginAction } from "../actions";
import LogInButton from "@/components/LogInButton";
export default function LoginPage() {
	const [state, formAction] = useFormState(loginAction, {});
	return (
		<div className="login">
			<h1>Login Page</h1>
			<form action={formAction}>
				<input type="text" name="email" placeholder="Email" />
				<input type="password" name="password" placeholder="Password" />
				<LogInButton />
				<span>{state.message}</span>
			</form>
		</div>
	);
}
