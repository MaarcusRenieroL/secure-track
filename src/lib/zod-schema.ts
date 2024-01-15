import * as z from "zod";

export const loginSchema = z.object({
	email: z.string({
		required_error: "Email is required",
	}).email().min(2, {
		message: "Email must be at least 2 characters long",
	}),
	password: z.string({
		required_error: "Password is required",
	}).min(6, {
		message: "Password must be at least 6 characters long",
	}),
});

export const registerSchema = z
	.object({
		email: z.string({
			required_error: "Email is required",
		}).email({
			message: "Invalid email",
		}).min(2, {
			message: "Email must be at least 2 characters long",
		}),
		password: z.string({
			required_error: "Password is required",
		}).min(6, {
			message: "Password must be at least 6 characters long",
		}),
		confirmPassword: z.string({
			required_error: "Confirm Password is required",
		}).min(6, {
			message: "Confirm Password must be at least 6 characters long",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});