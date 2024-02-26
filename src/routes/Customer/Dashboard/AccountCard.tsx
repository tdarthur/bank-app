import { useState } from "react";
import clsx from "clsx";

import { CheckingAccount, SavingsAccount, CreditAccount } from "../../../models";
import IconX from "../../../components/icons/IconX";

import styles from "./dashboard.module.css";

// type TransactionContainerProps = {
// 	transactions: Transaction[];
// };

// const TransactionContainer = ({ transactions }: TransactionContainerProps) => (
// 	<div className={styles.transactionContainer}>
// 		{transactions.map((transaction) => (
// 			<div>{transaction.amount}</div>
// 		))}
// 	</div>
// );

type AccountCardProps = React.PropsWithChildren<{
	type: "checking" | "savings" | "credit";
	accountBalance: React.ReactNode;
	accountName: string;
	isOpen: boolean;
	isAnimating: boolean;
	openCard: () => void;
	closeCard: () => void;
	pushAnimation: () => void;
	popAnimation: () => void;
	deleteAccount: () => void;
}>;

const AccountCard = ({
	type,
	accountBalance,
	accountName,
	isOpen,
	isAnimating,
	openCard,
	closeCard,
	pushAnimation,
	popAnimation,
	deleteAccount,
	children,
}: AccountCardProps) => {
	const [cardFocused, setCardFocused] = useState(false);

	const innerTabIndex = isOpen ? 0 : -1;

	return (
		<div className={styles.accountContainer}>
			<div
				className={clsx(
					"card",
					styles.accountCard,
					styles.accountCardChecking,
					type === "checking" && styles.accountCardChecking,
					type === "savings" && styles.accountCardSavings,
					type === "credit" && styles.accountCardCredit,
				)}
				onAnimationStart={() => {
					pushAnimation();
				}}
				onAnimationEnd={() => {
					popAnimation();
				}}
				data-disabled={isOpen || isAnimating || undefined}
				data-open={isOpen || undefined}
				data-has-focus={cardFocused || undefined}
			>
				<button
					className={styles.accountCardOpenButton}
					onClick={() => {
						if (!isAnimating) openCard();
					}}
					tabIndex={isOpen ? -1 : 0}
					onFocus={() => {
						setCardFocused(true);
					}}
					onBlur={() => {
						setCardFocused(false);
					}}
				/>
				<div className={styles.accountCardBackdrop} />
				<h3 className={styles.accountCardHeader}>Account Balance</h3>
				{accountBalance}
				<p className={styles.accountCardAccountType}>{accountName}</p>
				<button className={styles.accountCardCloseButton} tabIndex={innerTabIndex} onClick={closeCard}>
					<IconX />
				</button>
			</div>
			<div className={clsx("card", styles.accountDetailsSection)} data-open={isOpen || undefined}>
				<div className={styles.accountDetailsHeader}>
					<div className={styles.accountDetailsAccountActions}>
						<button tabIndex={innerTabIndex}>Transfer Funds</button>
						<button tabIndex={innerTabIndex}>View Statements</button>
					</div>
					<button className={styles.deleteAccountButton} tabIndex={innerTabIndex} onClick={deleteAccount}>
						Delete Account
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

type SpecificAccountProps = Omit<AccountCardProps, "type" | "accountBalance" | "accountName">;

type CheckingAccountCardProps = {
	account: CheckingAccount;
} & SpecificAccountProps;

const CheckingAccountCard = ({ account, ...accountCardProps }: CheckingAccountCardProps) => (
	<AccountCard
		type="checking"
		accountBalance={
			<p className={clsx(styles.accountCardBalance, styles.currency)}>
				{account.balance.toLocaleString("en-US")}
			</p>
		}
		accountName="Gamer Checking"
		{...accountCardProps}
	/>
);

type SavingsAccountCardProps = {
	account: SavingsAccount;
} & SpecificAccountProps;

const SavingsAccountCard = ({ account, ...accountCardProps }: SavingsAccountCardProps) => (
	<AccountCard
		type="savings"
		accountBalance={
			<p className={clsx(styles.accountCardBalance, styles.currency)}>
				{account.balance.toLocaleString("en-US")}
			</p>
		}
		accountName="Savings"
		{...accountCardProps}
	/>
);

type CreditCardAccountCardProps = {
	account: CreditAccount;
} & SpecificAccountProps;

const CreditCardAccountCard = ({ account, ...accountCardProps }: CreditCardAccountCardProps) => (
	<AccountCard
		type="credit"
		accountBalance={
			<p className={styles.accountCardBalance}>
				<span className={styles.currency}>{account.balance.toLocaleString("en-US")}</span> /{" "}
				<span className={styles.currency}>{account.creditLimit.toLocaleString("en-US")}</span> limit
			</p>
		}
		accountName="Sapien Rewards Credit Card"
		{...accountCardProps}
	/>
);

export { CheckingAccountCard, SavingsAccountCard, CreditCardAccountCard };
