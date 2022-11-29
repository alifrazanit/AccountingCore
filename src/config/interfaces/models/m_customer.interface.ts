export interface m_customerCreateInterface {
    name: string;
    customer_code: string;
    phone: string;
    address: string;
    email: string;
    city: string;
    country: string;
    postalcode: string;
    uuid: string;
    isActive: 'Y' | 'N'
    createdDate: any;
}

export interface m_customerUpdateInterface{
    name: string;
    phone: string;
    address: string;
    email: string;
    city: string;
    country: string;
    postalcode: string;
    uuid?: string;
    updated: any;
    isActive: 'Y' | 'N'
    inactiveDate?: any;
}