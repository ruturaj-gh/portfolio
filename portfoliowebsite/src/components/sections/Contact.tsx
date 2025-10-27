// src/components/sections/Contact.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { ContactFormData } from "@/types";
import { form } from "framer-motion/client";

// Client-side validation schema
const contactFormSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(500, "Message cannot exceed 500 characters"),
	company: z.string().optional(),
	honeypotField: z.string().optional(), // Honeypot field - should be empty
});

export default function Contact() {
	const [loading, setLoading] = useState(false);
	const [submissionStatus, setSubmissionStatus] = useState<
		"success" | "error" | null
	>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
	});

	const onSubmit = async (data: ContactFormData) => {
		setLoading(true);
		setSubmissionStatus(null);
		try {
			const formData = new FormData();
			formData.append("firstName", data.firstName);
			formData.append("lastName", data.lastName);
			formData.append("email", data.email);
			formData.append("company", data.company || "");
			formData.append("message", data.message);
			const accessKey = process.env.NEXT_PUBLIC_WEBACCESSKEY ?? "";
			formData.append("access_key", accessKey);
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData,
			});

			const result = await response.json();
			if (result.success) {
				setSubmissionStatus("success");
				reset();
        setTimeout(() => setSubmissionStatus(null), 5000);

			} else {
				console.error("Submission failed:", result);
				setSubmissionStatus("error");
        setTimeout(() => setSubmissionStatus(null), 5000);

			}
		} catch (error) {
			console.error("Network error:", error);
			setSubmissionStatus("error");
      setTimeout(() => setSubmissionStatus(null), 5000);

		} finally {
			setLoading(false);
		}
	};

	return (
		<section
			id="contact"
			className="py-20 md:py-28 bg-gray-950 text-white relative z-10">
			<div className="container mx-auto px-4 max-w-2xl">
				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6 }}
					className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-500">
					Get in Touch
				</motion.h2>

				<motion.form
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.6 }}
					onSubmit={handleSubmit(onSubmit)}
					className="bg-gray-800 p-8 rounded-lg shadow-xl">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<Input
							id="firstName"
							label="First Name"
							placeholder="John"
							{...register("firstName")}
							error={errors.firstName?.message}
						/>
						<Input
							id="lastName"
							label="Last Name"
							placeholder="Doe"
							{...register("lastName")}
							error={errors.lastName?.message}
						/>
					</div>
					<Input
						id="email"
						label="Email"
						type="email"
						placeholder="john.doe@example.com"
						{...register("email")}
						error={errors.email?.message}
						className="mb-4"
					/>
					<Input
						id="company"
						label="Company (Optional)"
						placeholder="Acme Corp."
						{...register("company")}
						error={errors.company?.message}
						className="mb-4"
					/>
					<Textarea
						id="message"
						label="Message"
						placeholder="Your message here..."
						{...register("message")}
						error={errors.message?.message}
						className="mb-6"
					/>

					{/* Honeypot field - hidden from users, visible to bots */}
					<input
						type="text"
						id="honeypotField"
						{...register("honeypotField")}
						className="sr-only" // Visually hidden
						aria-hidden="true"
						tabIndex={-1}
						autoComplete="off"
					/>

					<Button
						type="submit"
						variant="secondary"
						className="w-full"
						disabled={loading}>
						{loading ? "Sending..." : "Send Message"}
					</Button>

					{submissionStatus === "success" && (
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-green-400 mt-4 text-center">
							Message sent successfully! I'll get back to you soon.
						</motion.p>
					)}
					{submissionStatus === "error" && (
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-red-500 mt-4 text-center">
							Failed to send message. Please try again later.
						</motion.p>
					)}
				</motion.form>
			</div>
		</section>
	);
}
