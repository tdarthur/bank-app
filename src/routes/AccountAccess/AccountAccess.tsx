import { useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classNames from "classnames";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import styles from "./accountAccess.module.css";

const SignUpForm = () => {
	const [formPage, setFormPage] = useState(1);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [passwordLongEnough, setPasswordLongEnough] = useState(false);
	const [passwordContainsNumber, setPasswordContainsNumber] = useState(false);
	const [passwordContainsSpecialCharacter, setPasswordContainsSpecialCharacter] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	const navigate = useNavigate();

	const formRef = useRef<HTMLFormElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmationRef = useRef<HTMLInputElement>(null);

	const validateUserInfo = () => {
		if (formRef.current) {
			const formData = new FormData(formRef.current);

			const firstName = formData.get("first-name") as string;
			const lastName = formData.get("last-name") as string;
			const email = formData.get("email") as string;

			return (
				firstName &&
				lastName &&
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
					email,
				)
			);
		}

		return false;
	};

	const validatePassword = () => {
		if (formRef.current) {
			const formData = new FormData(formRef.current);

			const password = formData.get("password") as string;
			const passwordConfirmation = formData.get("password-confirmation") as string;

			const newPasswordLongEnough = password.length >= 8 && password.length < 32;
			const newPasswordContainsNumber = /\d/.test(password);
			const newPasswordContainsSpecialCharacter = /[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`+= ]/.test(password);
			const newPasswordsMatch =
				password === passwordConfirmation ||
				!(newPasswordContainsNumber && newPasswordContainsNumber && newPasswordContainsSpecialCharacter);

			setPasswordLongEnough(newPasswordLongEnough);
			setPasswordContainsNumber(newPasswordContainsNumber);
			setPasswordContainsSpecialCharacter(newPasswordContainsSpecialCharacter);
			setPasswordsMatch(newPasswordsMatch);

			return (
				newPasswordLongEnough &&
				newPasswordContainsNumber &&
				newPasswordContainsSpecialCharacter &&
				newPasswordsMatch
			);
		}

		return false;
	};

	const createAccount = async () => {
		if (!formSubmitted && formRef.current) {
			setFormSubmitted(true);

			const formData = new FormData(formRef.current);

			// TODO: save these
			// const firstName = formData.get("first-name") as string;
			// const lastName = formData.get("last-name") as string;
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;

			Auth.signUp({
				username: email,
				password,
				attributes: {
					email,
				},
				autoSignIn: {
					enabled: true,
				},
			})
				.then(({ user }) => {
					console.log(user);
					navigate("/customer/dashboard");
				})
				.catch((error) => {
					console.log("error signing up:", error);
					setFormSubmitted(false);
				});
		}
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
						if (validateUserInfo()) {
							setFormPage(2);
							passwordRef.current?.focus();
						}
					}}
				/>
			</fieldset>

			<fieldset className="" style={formPage !== 2 ? { display: "none" } : undefined}>
				<TextInput
					type="password"
					name="password"
					label="Password"
					width="L"
					maxLength={32}
					autoComplete="new-password"
					ref={passwordRef}
					onChange={() => {
						validatePassword();
					}}
				/>
				<TextInput
					type="password"
					name="password-confirmation"
					label="Confirm Password"
					width="L"
					autoComplete="new-password"
					ref={passwordConfirmationRef}
					onChange={() => {
						validatePassword();
					}}
				/>
				{(!passwordLongEnough ||
					!passwordContainsNumber ||
					!passwordContainsSpecialCharacter ||
					!passwordsMatch) && (
					<ul className={styles.passwordRequirements}>
						<li
							className={
								passwordLongEnough && passwordContainsNumber && passwordContainsSpecialCharacter
									? styles.valid
									: undefined
							}
						>
							Password must contain:
						</li>
						<ul>
							<li className={passwordLongEnough ? styles.valid : undefined}>
								Between 8 and 32 characters
							</li>
							<li className={passwordContainsNumber ? styles.valid : undefined}>At least one number</li>
							<li className={passwordContainsSpecialCharacter ? styles.valid : undefined}>
								At least one special character
							</li>
						</ul>
						<li className={passwordsMatch ? styles.valid : undefined}>Passwords must match</li>
					</ul>
				)}
				<Button
					text="Create Account"
					variant="primary"
					width="L"
					className="display-block"
					onClick={() => {
						if (validatePassword()) {
							createAccount();
						}
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
