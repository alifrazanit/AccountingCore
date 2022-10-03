export interface m_taxCreateInterface {
    tax_code: string;
    tax_name: string;
    percentage: number;
    is_active:  'Y' | 'N';
}

export interface m_taxUpdateInterface{
    tax_name: string;
    percentage: number;
    is_active: 'Y' | 'N';
}