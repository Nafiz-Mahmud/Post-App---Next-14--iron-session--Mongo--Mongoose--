"use server";

import { connectToDb } from "../db/db";
import { User } from "../db/models";
import { Post } from "../db/models";
import { cookies } from "next/headers";
import bcrypt from "bcrypt"
import { sessionOptions, defaultSession } from "@/auth/auth";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getSession = async () => {
	const session = await getIronSession(cookies(), sessionOptions);

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn;
		return session;
	}

	// CHECK THE USER IN THE DB
	// session.isPro = isPro;
	connectToDb()
	const user = await User.findOne({ _id: session.userId });
	
	session.userId = user._id;
	session.username = user.username;
	session.postCount = user.postCount;
	session.isPro = user.isPro;
	session.isLoggedIn = true;

	return session;
};

export const signupAction = async (prevState, formData) => {
	const username = formData.get("username");
	const email = formData.get("email");
	const password = formData.get("password");
	const hashedPassword = await bcrypt.hash(password, 10);
	const session = await getSession();
	if (!username || !email || !password) {
		return { message: "All fields are required!" };
	}
	try {
		connectToDb();
		const checkUser = await User.findOne({ email });
		if (checkUser) {
			console.log("Email exists.");
			return { message: "Email Already Exists!" };
		}
		const user = await User.create({
			username,
			email,
			password : hashedPassword,
		});
		console.log(user);
		session.userId = user._id;
		session.username = user.username;
		session.postCount = user.postCount;
		session.isPro = user.isPro;
		session.isLoggedIn = true;

		await session.save();
	
	} catch (error) {
		console.log(error);
		return { message: "Something Went Wrong!" };
	}
	redirect("/");
};

export const loginAction = async (prevState, formData) => {
	const session = await getSession();

	const email = formData.get("email");
	const password = formData.get("password");

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return { message: "Email Does Not Exist!" };
		}
		if ( !await bcrypt.compare(password, user.password)) {
			return { message: "Incorrect Password!" };
		}

		session.userId = user._id;
		session.username = user.username;
		session.postCount = user.postCount;
		session.isPro = user.isPro;
		session.isLoggedIn = true;

		await session.save();
	} catch (error) {
		return { error: "Something Went Wrong!" };
	}
	redirect("/profile");
};


export const logoutAction = async () => {
	const session = await getSession();
	session.destroy();
	redirect("/");
};


export const updateMembershipAction = async () => {
	const session = await getSession();
	try {
		connectToDb()
		await User.updateOne({ _id: session.userId }, { $set: { isPro: !session.isPro } });
	} catch (error) {
		console.log(error)
	}
	revalidatePath("/profile")
}

export const getPosts = async () => {
	try {
		connectToDb();
		const posts = await Post.find();
		return posts;
	} catch (error) {
		throw new Error("Failed to fetch posts!");
	}
};

export const getPost = async (id) => {
	try {
		connectToDb();
		const post = await Post.findById(id);
		return post;
	} catch (error) {
		throw new Error("Failed to fetch post!");
	}
};
export const createPost = async (prevState, formData) => {
	const { userId, username } = await getSession();
	const title = formData.get("title");
	if (!title) {
		return { message: "Title is required!" };
	}

	try {
		connectToDb();
		await Post.create({ title, author: username, userId });
		await User.updateOne({ _id: userId }, { $inc: { postCount: 1 } });
	} catch (error) {
		console.log("Error while creating post");
		return { message: "Could Not Post!" };
	}
	redirect("/posts");
};

export const deletePost = async (id) => {
	try {
		connectToDb();
		await User.updateOne({ _id: session.userId }, { $inc: { postCount: -1 } });
		await Post.deleteOne({ _id: id });
		
	} catch (error) {
		throw new Error("Failed to delete this post!");
	}
	redirect("/posts");
};
