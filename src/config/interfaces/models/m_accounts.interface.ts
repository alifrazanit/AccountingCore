export interface m_accountsInterface {
    id_account?: any;
    account_code: string;
    account_name: string;
    balance: number;
}

export interface m_accountCreatesInterface {
    account_code: string;
    account_name: string;
    balance: number;
    isActive: 'Y' | 'N';
    cratedDate: Date;
    updated: Date;
}

export interface m_accountUpdateInterface {
    account_name: string;
    isActive: 'Y' | 'N';
    updated: Date;
}