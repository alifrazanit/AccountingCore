export interface m_userCreateInterface {
    name: string;
    nik: string;
    phone: string;
    address: string;
    email: string;
    city: string;
    country: string;
    postalcode: string;
    username: string;
    password: string;
    uuid: string;
    isActive: 'Y' | 'N'
    createdDate: any;
}

export interface m_userUpdateInterface{
    name: string;
    phone: string;
    address: string;
    email: string;
    city: string;
    country: string;
    postalcode: string;
    uuid?: string;
    updated: any;
    inactiveDate?: any;
}