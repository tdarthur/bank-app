import { useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { Link, useSearchParams } from "react-router-dom";
import classNames from "classnames";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import styles from "./accountAccess.module.css";

const SignUpForm = () => {
	const [formPage, setFormPage] = useState(1);
	const formRef = useRef<HTMLFormElement>(null);

	const validateForm = () => {
		// if (password === passwordConfirmation) {
		// 	console.log("passwords are the same");
		// } else {
		// 	console.log("passwords are NOT the same");
		// }

		return true;
	};

	const createAccount = () => {
		if (formRef.current) {
			const formData = new FormData(formRef.current);

			const firstName = formData.get("first-name");
			const lastName = formData.get("last-name");
			const email = formData.get("email");
			const password = formData.get("password");
			const passwordConfirmation = formData.get("password-confirmation");

			// password special chars:
			// ^ $ * . [ ] { } ( ) ? - " ! @ # % & / \ , > < ' : ; | _ ~ ` + =
		}

		// try {
		// 	const { user } = await Auth.signUp({
		// 		username: email,
		// 		password,
		// 		attributes: {
		// 			email, // optional
		// 			phone_number, // optional - E.164 number convention
		// 			// other custom attributes
		// 		},
		// 		autoSignIn: {
		// 			// optional - enables auto sign in after user is confirmed
		// 			enabled: true,
		// 		},
		// 	});
		// 	console.log(user);
		// } catch (error) {
		// 	console.log("error signing up:", error);
		// }
	};

	return (
		<form ref={formRef}>
			<fieldset style={formPage !== 1 ? { display: "none" } : undefined}>
				<div className="form-line">
					<TextInput name="first-name" label="First Name" autoFocus />
					<TextInput name="last-name" label="Last Name" />
				</div>
				<TextInput name="email" label="Email" width="L" />
				<Button
					text="Next"
					variant="secondary"
					width="L"
					onClick={() => {
						setFormPage(2);
					}}
				/>
			</fieldset>

			<fieldset className="" style={formPage !== 2 ? { display: "none" } : undefined}>
				<TextInput type="password" name="password" label="Password" width="L" autoFocus autoComplete="off" />
				<TextInput
					type="password"
					name="password-confirmation"
					label="Confirm Password"
					width="L"
					autoComplete="off"
					style={{ marginBottom: "-1rem" }}
				/>
				<ul className={styles.passwordRequirements}>
					<li>Password must contain:</li>
					<ul>
						<li>Between 8 and 32 characters</li>
						<li>At least one number</li>
						<li>At least one special character</li>
					</ul>
					<li>Passwords must match</li>
				</ul>
				<Button
					text="Create Account"
					variant="primary"
					width="L"
					className="display-block"
					onClick={() => {
						createAccount();
					}}
				/>
			</fieldset>
		</form>
	);
};

const LoginForm = () => (
	<form>
		<TextInput label="Email" width="L" autoFocus />
		<TextInput type="password" label="Password" width="L" style={{ letterSpacing: "1px" }} />
		<Button text="Log In" width="L" linkTo="/customer/dashboard" />
	</form>
);

const AccountAccess = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const returningMember = !searchParams.has("sign-up");

	return (
		<div className={styles.layoutWrapper}>
			<header className={styles.header}>
				<Link to="/">
					<span className="logo">H</span>
					<span className="logo-text">uman Bank</span>
				</Link>
			</header>
			<main>
				<div className={classNames("card", styles.formCard)}>
					<h2>{returningMember ? "Log In" : "Sign Up"}</h2>
					{returningMember ? <LoginForm /> : <SignUpForm />}
					<div
						className={styles.switchAccessContainer}
						style={{ justifyContent: returningMember ? "left" : "right" }}
					>
						<Button
							text={returningMember ? "Need to sign up?" : "Already a member?"}
							variant="tertiary"
							onClick={() => {
								setSearchParams(returningMember ? { "sign-up": "true" } : {});
							}}
						/>
					</div>
				</div>
			</main>
			<footer className={styles.footer}>
				<p className="text-disclosure">This is disclosure text in the footer.</p>
			</footer>
		</div>
	);
};

export default AccountAccess;
