export interface m_productCreateInterface {
    id_product: number;
    product_name: string;
    product_code: string;
    id_group_product: number;
    id_uom: number;
    selling_price: number;
    purchase_price: number;
    id_supplier?: number;
    description: string;
    id_purchase_tax: number;
    id_sales_tax: number;
    min_stock: number;
    isActive: 'Y' | 'N';
    createdDate: Date;
    salt: string;

}

export interface m_productUpdateInterface{
    id_product: number;
    product_name: string;
    id_group_product: number;
    id_uom: number;
    selling_price: number;
    purchase_price: number;
    id_supplier?: number;
    description: string;
    id_purchase_tax: number;
    id_sales_tax: number;
    min_stock: number;
    isActive?: 'Y' | 'N';
    updated: Date;
    createdDate: Date;
    inactiveDate?: Date;
    salt: string;
}