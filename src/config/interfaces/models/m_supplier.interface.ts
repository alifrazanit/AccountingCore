export interface m_supplierCreateInterface {
    name: string;
    supplier_code: string;
    phone: string;
    address: string;
    email: string;
    city: string;
    country: string;
    postalcode: string;
    uuid: string;
    isActive: 'Y' | 'N'
    createdDate: any;
    cp: string;
}

export interface m_supplierUpdateInterface{
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
    cp: string;
}