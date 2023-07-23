import { useState } from "react";
import Button from "../../../components/Button";
import Form from "../../../components/Form";

import styles from "./addAccount.module.css";

const accountTypes = {
	checking: "Checking",
	savings: "Savings",
	credit: "Credit",
};

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

					<div className={styles.accountOptions}>
						{Object.keys(accountTypes).map((type) => (
							<button
								onClick={() => {
									setAccountType(type);
								}}
								data-selected={type === accountType || undefined}
								key={type}
							>
								{type}
							</button>
						))}
					</div>

					<Button text="Next" variant="secondary" />
				</div>
			)}
		/>
	);
};

export default AddAccount;
