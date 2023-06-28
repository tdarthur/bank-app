import Dropdown from "../../../components/Dropdown";

import styles from "./dashboard.module.css";

const accountOptions = [
	{ key: "checking", value: "Checking" },
	{ key: "savings", value: "Savings" },
	{ key: "credit", value: "Credit" },
];

const Dashboard = () => {
	return (
		<>
			<Dropdown label="Account" options={accountOptions} />
			<section className={styles.accountSection}>
				<div className={styles.accountSectionHeader}>
					<h2 className={styles.balance}>
						Balance: <span className={styles.balanceAmount}>$1,000</span>
					</h2>
				</div>
			</section>
		</>
	);
};

export default Dashboard;
