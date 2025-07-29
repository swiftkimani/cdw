"use client";

import { signInAction } from "@/app/_actions/sign-in";
import { CircleCheckIcon, CircleX, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending}
			type="submit"
			className="w-full uppercase font-bold"
		>
			{pending && (
				<Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
			)}{" "}
			Sign In
		</Button>
	);
};

export const SignInForm = () => {
	const [state, formAction] = useActionState(signInAction, {
		success: false,
		message: "",
	});

	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state.success && formRef.current) {
			router.refresh();
			// router.push(routes.challenge);
		}
	}, [state, router]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-white">
			<div className="max-w-md w-full pb-60">
				<form
					ref={formRef}
					action={formAction}
					className="border-muted border shadow-lg p-10 rounded-md bg-white"
				>
					<div className="flex items-center mb-6 justify-center">
						<h2 className="uppercase text-2xl font-bold">Admin Sign In</h2>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								autoComplete="email"
								className="placeholder:text-gray-500"
								placeholder="Enter your administrator email address"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								name="password"
								autoComplete="password"
								className="placeholder:text-gray-500"
								placeholder="Enter your password"
								required
							/>
						</div>

						<div className="my-6">
							<p className="text-sm text-gray-600 mb-2 text-center">
								<b>This is for admin only.</b>
							</p>
						</div>
						<div className="space-y-4">
							<SubmitButton />
							{state.success && (
								<div className="flex items-center gap-2 rounded-md bg-green-500 p-3 text-white">
									<CircleCheckIcon className="h-5 w-5" />
									<span>Success! {state.message}</span>
								</div>
							)}
							{!state.success && state.message && (
								<div className="flex items-center gap-2 rounded-md bg-red-500 p-3 text-white">
									<CircleX className="h-5 w-5" />
									<span>Error! {state.message}</span>
								</div>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};