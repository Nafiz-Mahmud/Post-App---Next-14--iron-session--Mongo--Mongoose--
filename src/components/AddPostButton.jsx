"use client";
import { useFormStatus } from "react-dom";
export default function AddPostButton() {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending}>
			{pending ? "Posting..." : "Post"}
		</button>
	);
}
