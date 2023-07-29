import { useState } from "react";
import Button from "../../../components/Button";
import Form from "../../../components/Form";

import styles from "./addAccount.module.css";

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

	return (
		<Form
			onSubmit={() => {
				console.log("submitted");

				return Promise.resolve();
			}}
			render={() => (
				<div>
					<h2>What kind of account are you looking for?</h2>

					<input name={fieldNames.accountType} value={accountType} />
					<div className={styles.accountOptions}>
						{Object.keys(accountTypes).map((type) => (
							<button
								onClick={() => {
									setAccountType(accountTypes[type]);
								}}
								data-selected={accountTypes[type] === accountType || undefined}
								key={type}
							>
								{type}
							</button>
						))}
					</div>

					{/* {accountType === accountTypes.checking && (
						<div>
							<TextInput name={fieldNames.name} label="Name" />
						</div>
					)} */}

					{/* {accountType === accountTypes.savings && (
						<div>
							<TextInput name={fieldNames.name} label="Name" />
						</div>
					)} */}

					<Button type="submit" text="Create Account" variant="secondary" width="L" />
				</div>
			)}
		/>
	);
};

export default AddAccount;
