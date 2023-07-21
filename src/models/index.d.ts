import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  TRANSFER = "TRANSFER"
}

export enum CreditAccountType {
  SAPIEN_CASHBACK = "SAPIEN_CASHBACK",
  AMETHYST_POINTS = "AMETHYST_POINTS"
}

export enum BankAccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS"
}



type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly bankAccounts?: (UserBankAccount | null)[] | null;
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
  readonly bankAccounts: AsyncCollection<UserBankAccount>;
  readonly creditAccounts: AsyncCollection<UserCreditAccount>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerBankAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BankAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly users?: UserBankAccount[] | null;
  readonly bankTransactions?: (BankTransaction | null)[] | null;
  readonly accountType: BankAccountType | keyof typeof BankAccountType;
  readonly accountNumber: string;
  readonly balance: number;
  readonly rewardsPoints: number;
  readonly creationDate: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBankAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BankAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly users: AsyncCollection<UserBankAccount>;
  readonly bankTransactions: AsyncCollection<BankTransaction>;
  readonly accountType: BankAccountType | keyof typeof BankAccountType;
  readonly accountNumber: string;
  readonly balance: number;
  readonly rewardsPoints: number;
  readonly creationDate: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BankAccount = LazyLoading extends LazyLoadingDisabled ? EagerBankAccount : LazyBankAccount

export declare const BankAccount: (new (init: ModelInit<BankAccount>) => BankAccount) & {
  copyOf(source: BankAccount, mutator: (draft: MutableModel<BankAccount>) => MutableModel<BankAccount> | void): BankAccount;
}

type EagerCreditAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CreditAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly users?: UserCreditAccount[] | null;
  readonly creditTransactions?: (CreditTransaction | null)[] | null;
  readonly creditAccountType: CreditAccountType | keyof typeof CreditAccountType;
  readonly accountNumber: string;
  readonly balance: number;
  readonly creationDate: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCreditAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CreditAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly users: AsyncCollection<UserCreditAccount>;
  readonly creditTransactions: AsyncCollection<CreditTransaction>;
  readonly creditAccountType: CreditAccountType | keyof typeof CreditAccountType;
  readonly accountNumber: string;
  readonly balance: number;
  readonly creationDate: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CreditAccount = LazyLoading extends LazyLoadingDisabled ? EagerCreditAccount : LazyCreditAccount

export declare const CreditAccount: (new (init: ModelInit<CreditAccount>) => CreditAccount) & {
  copyOf(source: CreditAccount, mutator: (draft: MutableModel<CreditAccount>) => MutableModel<CreditAccount> | void): CreditAccount;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BankTransaction = LazyLoading extends LazyLoadingDisabled ? EagerBankTransaction : LazyBankTransaction

export declare const BankTransaction: (new (init: ModelInit<BankTransaction>) => BankTransaction) & {
  copyOf(source: BankTransaction, mutator: (draft: MutableModel<BankTransaction>) => MutableModel<BankTransaction> | void): BankTransaction;
}

type EagerCreditTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CreditTransaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creditAccountID: string;
  readonly transactionType: TransactionType | keyof typeof TransactionType;
  readonly amount: number;
  readonly description?: string | null;
  readonly rewardsPoints: number;
  readonly timestamp: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCreditTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CreditTransaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly creditAccountID: string;
  readonly transactionType: TransactionType | keyof typeof TransactionType;
  readonly amount: number;
  readonly description?: string | null;
  readonly rewardsPoints: number;
  readonly timestamp: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CreditTransaction = LazyLoading extends LazyLoadingDisabled ? EagerCreditTransaction : LazyCreditTransaction

export declare const CreditTransaction: (new (init: ModelInit<CreditTransaction>) => CreditTransaction) & {
  copyOf(source: CreditTransaction, mutator: (draft: MutableModel<CreditTransaction>) => MutableModel<CreditTransaction> | void): CreditTransaction;
}

type EagerUserBankAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserBankAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly bankAccountId?: string | null;
  readonly user: User;
  readonly bankAccount: BankAccount;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserBankAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserBankAccount, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly bankAccountId?: string | null;
  readonly user: AsyncItem<User>;
  readonly bankAccount: AsyncItem<BankAccount>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserBankAccount = LazyLoading extends LazyLoadingDisabled ? EagerUserBankAccount : LazyUserBankAccount

export declare const UserBankAccount: (new (init: ModelInit<UserBankAccount>) => UserBankAccount) & {
  copyOf(source: UserBankAccount, mutator: (draft: MutableModel<UserBankAccount>) => MutableModel<UserBankAccount> | void): UserBankAccount;
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
