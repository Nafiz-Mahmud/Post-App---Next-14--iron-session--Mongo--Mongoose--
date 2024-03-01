"use client";
import { useFormStatus } from "react-dom";
export default function LogInButton() {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending}>
			{pending ? "Logging In..." : "Log In"}
		</button>
	);
}
