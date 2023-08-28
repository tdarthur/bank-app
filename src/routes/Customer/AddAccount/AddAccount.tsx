import { useState } from "react";
import Button from "../../../components/Button";
import Form from "../../../components/Form";

import styles from "./addAccount.module.css";
import { Link, useNavigate } from "react-router-dom";
import MessageContainer from "../../../components/MessageContainer";

const fieldNames = {
	accountType: "account-type",
	name: "name",
};

const accountTypes = {
	checking: "Checking",
	savings: "Savings",
	credit: "Credit",
} as Record<string, string>;

const AddAccount = () => {
	const [accountType, setAccountType] = useState("");

	const navigate = useNavigate();

	return (
		<Form
			onSubmit={({ values }) => {
				console.log("submitted", values);

				navigate("../dashboard");

				return Promise.resolve();
			}}
			render={({ messages, pushErrorMessage }) => (
				<div>
					<input
						type="hidden"
						id={fieldNames.accountType}
						name={fieldNames.accountType}
						value={accountType}
						required
						key={accountType}
					/>

					<Link className={styles.dashboardLink} to="../dashboard">
						Back to dashboard
					</Link>

					<h2 className={styles.pageHeader}>What kind of account are you looking for?</h2>

					<MessageContainer messages={messages} />

					<div className={styles.accountOptions}>
						{Object.keys(accountTypes).map((type) => (
							<button
								type="button"
								onClick={() => {
									setAccountType(accountTypes[type]);
									const accountTypeInput = document.getElementById(
										fieldNames.accountType,
									) as HTMLInputElement;
									accountTypeInput.value = accountTypes[type];
									accountTypeInput.dispatchEvent(new InputEvent("change", {}));
								}}
								data-selected={accountTypes[type] === accountType || undefined}
								key={type}
							>
								{accountTypes[type]}
							</button>
						))}
					</div>

					<p className={styles.accountDisclaimer}>
						We would collect more information from you, but this is a fake bank, so we'll just go ahead and
						create the account.
					</p>

					<Button
						type="submit"
						text="Create Account"
						variant="secondary"
						width="L"
						onClick={() => {
							if (!accountType) {
								pushErrorMessage("Account type is required");
							}
						}}
					/>
				</div>
			)}
		/>
	);
};

export default AddAccount;
