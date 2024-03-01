"use client";
import { createPost } from "../actions";
import AddPostButton from "@/components/AddPostButton";
import { useFormState } from "react-dom";
export default function WritePage() {
	const [state, formAction] = useFormState(createPost, {});
	return (
		<div className="write">
			<form action={formAction}>
				<input type="text" name="title" placeholder="Title" />
				<AddPostButton />
				<span>{state.message}</span>
			</form>
		</div>
	);
}
