import { useEffect, useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classNames from "classnames";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import styles from "./accountAccess.module.css";
import Form from "../../components/Form";

const fieldNames = {
	firstName: "first-name",
	lastName: "last-name",
	email: "email",
	password: "password",
	passwordConfirmation: "password-confirmation",
	confirmationCode: "confirmation-code",
};

const SignUpForm = () => {
	const [formPage, setFormPage] = useState(1);
	const [passwordLongEnough, setPasswordLongEnough] = useState(false);
	const [passwordContainsNumber, setPasswordContainsNumber] = useState(false);
	const [passwordContainsSpecialCharacter, setPasswordContainsSpecialCharacter] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	const navigate = useNavigate();

	return (
		<Form
			render={({ values, messages, pushMessage, clearMessages }) => {
				const validateUserInfo = () =>
					values[fieldNames.firstName] &&
					values[fieldNames.lastName] &&
					/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
						values.email,
					);

				const validatePassword = () => {
					const { password, [fieldNames.passwordConfirmation]: passwordConfirmation } = values;
					console.log(values, password, passwordConfirmation);

					const newPasswordLongEnough = password.length >= 8 && password.length < 32;
					const newPasswordContainsNumber = /\d/.test(password);
					const newPasswordContainsSpecialCharacter = /[\^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`+= ]/.test(
						password,
					);
					const newPasswordsMatch =
						password === passwordConfirmation ||
						!(
							newPasswordContainsNumber &&
							newPasswordContainsNumber &&
							newPasswordContainsSpecialCharacter
						);

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
				};

				const createAccount = () => {
					// TODO: save these
					// const firstName = formData.get("first-name") as string;
					// const lastName = formData.get("last-name") as string;

					const { email, password } = values;

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
							setFormPage(3);
						})
						.catch((error) => {
							console.log("error signing up:", error);
						});
				};

				const submitConfirmationCode = () => {
					const { email, [fieldNames.confirmationCode]: confirmationCode } = values;

					Auth.confirmSignUp(email, confirmationCode)
						.then(() => {
							navigate("/customer/dashboard");
						})
						.catch(() => {
							pushMessage("Incorrect code", "error");
						});
				};

				return (
					<>
						<fieldset style={formPage !== 1 ? { display: "none" } : undefined}>
							<div className="form-line">
								<TextInput name={fieldNames.firstName} label="First Name" autoFocus />
								<TextInput name={fieldNames.lastName} label="Last Name" />
							</div>
							<TextInput name={fieldNames.email} label="Email" width="L" />
							<Button
								text="Next"
								variant="secondary"
								width="L"
								onClick={() => {
									if (validateUserInfo()) {
										setFormPage(2);
										// passwordRef.current?.focus();
									}
								}}
							/>
						</fieldset>

						<fieldset className="" style={formPage !== 2 ? { display: "none" } : undefined}>
							<TextInput
								name={fieldNames.password}
								type="password"
								label="Password"
								width="L"
								maxLength={32}
								autoComplete="new-password"
								onChange={() => {
									validatePassword();
								}}
							/>
							<TextInput
								name={fieldNames.passwordConfirmation}
								type="password"
								label="Confirm Password"
								width="L"
								maxLength={32}
								autoComplete="new-password"
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
											passwordLongEnough &&
											passwordContainsNumber &&
											passwordContainsSpecialCharacter
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
										<li className={passwordContainsNumber ? styles.valid : undefined}>
											At least one number
										</li>
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

						<fieldset className="" style={formPage !== 3 ? { display: "none" } : undefined}>
							<TextInput
								name="confirmation-code"
								label="Confirmation Code"
								width="M"
								maxLength={6}
								autoComplete="off"
							/>
							<Button
								text="Submit Code"
								variant="primary"
								width="L"
								className="display-block"
								onClick={() => {
									submitConfirmationCode();
								}}
							/>
						</fieldset>
					</>
				);
			}}
		/>
	);
};

const LoginForm = () => {
	const formRef = useRef<HTMLFormElement>(null);

	const navigate = useNavigate();

	const login = () => {
		if (formRef.current) {
			const formData = new FormData(formRef.current);

			const email = formData.get("email") as string;
			const password = formData.get("password") as string;

			Auth.signIn(email, password)
				.then(() => {
					navigate("/customer/dashboard");
				})
				.catch((error) => {
					console.log("failed to sign in", error);
				});
		}
	};

	return (
		<form ref={formRef}>
			<TextInput name="email" label="Email" width="L" autoFocus />
			<TextInput type="password" name="password" label="Password" width="L" maxLength={32} />
			<Button
				text="Log In"
				width="L"
				linkTo="/customer/dashboard"
				onClick={() => {
					login();
				}}
			/>
		</form>
	);
};

const AccountAccess = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const returningMember = !searchParams.has("sign-up");

	const navigate = useNavigate();

	useEffect(() => {
		Auth.currentSession()
			.then((user) => {
				console.log("signed in!", user);
				navigate("/customer/dashboard");
			})
			.catch(() => {
				console.log("Not signed in!");
			});
	}, [navigate]);

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
