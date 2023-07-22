import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum CreditAccountType {
  SAPIEN_CASHBACK = "SAPIEN_CASHBACK",
  AMETHYST_POINTS = "AMETHYST_POINTS"
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  TRANSFER = "TRANSFER"
}



type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly checkingAccounts?: (UserCheckingAccount | null)[] | null;
  readonly savingsAccounts?: (UserSavingsAccount | null)[] | null;
  readonly creditAccounts?: (UserCreditAccount | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly checkingAccounts: AsyncCollection<UserCheckingAccount>;
  readonly savingsAccounts: AsyncCollection<UserSavingsAccount>;
  readonly creditAccounts: AsyncCollection<UserCreditAccount>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerCheckingAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CheckingAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly accountNumber: string;
  readonly cardNumber?: string | null;
  readonly balance: number;
  readonly creationDate: string;
  readonly users?: UserCheckingAccount[] | null;
  readonly transactions?: (BankTransaction | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCheckingAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CheckingAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly accountNumber: string;
  readonly cardNumber?: string | null;
  readonly balance: number;
  readonly creationDate: string;
  readonly users: AsyncCollection<UserCheckingAccount>;
  readonly transactions: AsyncCollection<BankTransaction>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CheckingAccount = LazyLoading extends LazyLoadingDisabled ? EagerCheckingAccount : LazyCheckingAccount

export declare const CheckingAccount: (new (init: ModelInit<CheckingAccount>) => CheckingAccount) & {
  copyOf(source: CheckingAccount, mutator: (draft: MutableModel<CheckingAccount>) => MutableModel<CheckingAccount> | void): CheckingAccount;
}

type EagerSavingsAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavingsAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly accountNumber: string;
  readonly balance: number;
  readonly creationDate: string;
  readonly users?: UserSavingsAccount[] | null;
  readonly transactions?: (BankTransaction | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySavingsAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavingsAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly accountNumber: string;
  readonly balance: number;
  readonly creationDate: string;
  readonly users: AsyncCollection<UserSavingsAccount>;
  readonly transactions: AsyncCollection<BankTransaction>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SavingsAccount = LazyLoading extends LazyLoadingDisabled ? EagerSavingsAccount : LazySavingsAccount

export declare const SavingsAccount: (new (init: ModelInit<SavingsAccount>) => SavingsAccount) & {
  copyOf(source: SavingsAccount, mutator: (draft: MutableModel<SavingsAccount>) => MutableModel<SavingsAccount> | void): SavingsAccount;
}

type EagerCreditAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CreditAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creditAccountType: CreditAccountType | keyof typeof CreditAccountType;
  readonly accountNumber: string;
  readonly cardNumber?: string | null;
  readonly balance: number;
  readonly creditLimit: number;
  readonly rewardsPoints: number;
  readonly creationDate: string;
  readonly users?: UserCreditAccount[] | null;
  readonly transactions?: (CreditTransaction | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCreditAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CreditAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creditAccountType: CreditAccountType | keyof typeof CreditAccountType;
  readonly accountNumber: string;
  readonly cardNumber?: string | null;
  readonly balance: number;
  readonly creditLimit: number;
  readonly rewardsPoints: number;
  readonly creationDate: string;
  readonly users: AsyncCollection<UserCreditAccount>;
  readonly transactions: AsyncCollection<CreditTransaction>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CreditAccount = LazyLoading extends LazyLoadingDisabled ? EagerCreditAccount : LazyCreditAccount

export declare const CreditAccount: (new (init: ModelInit<CreditAccount>) => CreditAccount) & {
  copyOf(source: CreditAccount, mutator: (draft: MutableModel<CreditAccount>) => MutableModel<CreditAccount> | void): CreditAccount;
}

type EagerCreditTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CreditTransaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly transactionType: TransactionType | keyof typeof TransactionType;
  readonly amount: number;
  readonly description?: string | null;
  readonly rewardsPoints: number;
  readonly timestamp: number;
  readonly creditAccountID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCreditTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CreditTransaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly transactionType: TransactionType | keyof typeof TransactionType;
  readonly amount: number;
  readonly description?: string | null;
  readonly rewardsPoints: number;
  readonly timestamp: number;
  readonly creditAccountID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CreditTransaction = LazyLoading extends LazyLoadingDisabled ? EagerCreditTransaction : LazyCreditTransaction

export declare const CreditTransaction: (new (init: ModelInit<CreditTransaction>) => CreditTransaction) & {
  copyOf(source: CreditTransaction, mutator: (draft: MutableModel<CreditTransaction>) => MutableModel<CreditTransaction> | void): CreditTransaction;
}

type EagerBankTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BankTransaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bankAccountID: string;
  readonly transactionType: TransactionType | keyof typeof TransactionType;
  readonly amount: number;
  readonly description?: string | null;
  readonly timestamp: number;
  readonly checkingAccountID: string;
  readonly savingsAccountID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBankTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BankTransaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bankAccountID: string;
  readonly transactionType: TransactionType | keyof typeof TransactionType;
  readonly amount: number;
  readonly description?: string | null;
  readonly timestamp: number;
  readonly checkingAccountID: string;
  readonly savingsAccountID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BankTransaction = LazyLoading extends LazyLoadingDisabled ? EagerBankTransaction : LazyBankTransaction

export declare const BankTransaction: (new (init: ModelInit<BankTransaction>) => BankTransaction) & {
  copyOf(source: BankTransaction, mutator: (draft: MutableModel<BankTransaction>) => MutableModel<BankTransaction> | void): BankTransaction;
}

type EagerUserCheckingAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCheckingAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly checkingAccountId?: string | null;
  readonly user: User;
  readonly checkingAccount: CheckingAccount;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserCheckingAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCheckingAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly checkingAccountId?: string | null;
  readonly user: AsyncItem<User>;
  readonly checkingAccount: AsyncItem<CheckingAccount>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserCheckingAccount = LazyLoading extends LazyLoadingDisabled ? EagerUserCheckingAccount : LazyUserCheckingAccount

export declare const UserCheckingAccount: (new (init: ModelInit<UserCheckingAccount>) => UserCheckingAccount) & {
  copyOf(source: UserCheckingAccount, mutator: (draft: MutableModel<UserCheckingAccount>) => MutableModel<UserCheckingAccount> | void): UserCheckingAccount;
}

type EagerUserSavingsAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSavingsAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly savingsAccountId?: string | null;
  readonly user: User;
  readonly savingsAccount: SavingsAccount;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserSavingsAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSavingsAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly savingsAccountId?: string | null;
  readonly user: AsyncItem<User>;
  readonly savingsAccount: AsyncItem<SavingsAccount>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserSavingsAccount = LazyLoading extends LazyLoadingDisabled ? EagerUserSavingsAccount : LazyUserSavingsAccount

export declare const UserSavingsAccount: (new (init: ModelInit<UserSavingsAccount>) => UserSavingsAccount) & {
  copyOf(source: UserSavingsAccount, mutator: (draft: MutableModel<UserSavingsAccount>) => MutableModel<UserSavingsAccount> | void): UserSavingsAccount;
}

type EagerUserCreditAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCreditAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly creditAccountId?: string | null;
  readonly user: User;
  readonly creditAccount: CreditAccount;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserCreditAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserCreditAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly creditAccountId?: string | null;
  readonly user: AsyncItem<User>;
  readonly creditAccount: AsyncItem<CreditAccount>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserCreditAccount = LazyLoading extends LazyLoadingDisabled ? EagerUserCreditAccount : LazyUserCreditAccount

export declare const UserCreditAccount: (new (init: ModelInit<UserCreditAccount>) => UserCreditAccount) & {
  copyOf(source: UserCreditAccount, mutator: (draft: MutableModel<UserCreditAccount>) => MutableModel<UserCreditAccount> | void): UserCreditAccount;
}