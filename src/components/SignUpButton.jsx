"use client";
import { useFormStatus } from "react-dom";
export default function SignUpButton() {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending}>
			{pending ? "Signing Up..." : "Sign Up"}
		</button>
	);
}
