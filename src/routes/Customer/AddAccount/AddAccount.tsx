import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";

import { CheckingAccount, SavingsAccount, CreditAccount } from "../../../models";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import MessageContainer from "../../../components/MessageContainer";

import styles from "./addAccount.module.css";
import userSessionContext from "../../../contexts/userSessionContext";

const fieldNames = {
	accountType: "account-type",
	name: "name",
};

const accountTypes = {
	checking: "Checking",
	savings: "Savings",
	credit: "Credit",
} as Record<string, string>;

const formatDate = (date: Date) =>
	`${date.getUTCFullYear()}-${String(date.getUTCMonth()).padStart(2, "0")}-${String(date.getUTCDate()).padStart(
		2,
		"0",
	)}`;

const AddAccount = () => {
	const [accountType, setAccountType] = useState("");

	const navigate = useNavigate();

	const { user } = useContext(userSessionContext);

	return (
		<Form
			onSubmit={async ({ values }) => {
				if (user) {
					try {
						let account: CheckingAccount | SavingsAccount | CreditAccount;

						if (values[fieldNames.accountType] === accountTypes.checking) {
							account = new CheckingAccount({
								accountNumber: "test",
								cardNumber: "8888-8888-8888-8888",
								balance: 0,
								creationDate: formatDate(new Date(Date.now())),
							});
						} else if (values[fieldNames.accountType] === accountTypes.savings) {
							account = new SavingsAccount({
								accountNumber: "test",
								balance: 0,
								creationDate: formatDate(new Date(Date.now())),
							});
						} else {
							account = new CreditAccount({
								accountNumber: "test",
								balance: 0,
								cardNumber: "9999-9999-9999-9999",
								creationDate: formatDate(new Date(Date.now())),
								creditAccountType: "AMETHYST_POINTS",
								creditLimit: 5000,
								rewardsPoints: 0,
							});
						}

						await DataStore.save(account);
					} catch (error) {
						console.error(error);
					}
				}

				navigate("../dashboard");
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
