import { IsNotEmpty, IsString, MaxLength, IsInt, Max } from 'class-validator';


export class m_productsDto {
    id_product: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    product_name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    product_code: string;  //13 = departement awal 12 = YEAR 001 = norut 

    @IsNotEmpty()
    id_uom: number;

    @IsNotEmpty()
    @IsInt()
    id_group_product: number;

    @IsNotEmpty()
    @IsInt()
    selling_price: number;

    @IsNotEmpty()
    @IsInt()
    purchase_price: number;

    @IsNotEmpty()
    @IsInt()
    id_supplier: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    product_image_1: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    product_image_2: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    product_image_3: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsNotEmpty()
    @IsInt()
    id_purchase_tax: number;

    @IsNotEmpty()
    @IsInt()
    min_stock: number;

    @IsNotEmpty()
    @IsInt()
    id_sales_tax: number;
}

export class mProductCreateDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    product_name: string;

    @IsNotEmpty()
    id_uom: number;

    @IsNotEmpty()
    @IsInt()
    id_group_product: number;

    @IsNotEmpty()
    @IsInt()
    selling_price: number;

    @IsNotEmpty()
    @IsInt()
    purchase_price: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsNotEmpty()
    @IsInt()
    id_purchase_tax: number;

    @IsNotEmpty()
    @IsInt()
    min_stock: number;

    @IsNotEmpty()
    @IsInt()
    id_sales_tax: number;
}

export class mProductUpdateDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    product_name: string;

    @IsNotEmpty()
    id_uom: number;

    @IsNotEmpty()
    @IsInt()
    id_group_product: number;

    @IsNotEmpty()
    @IsInt()
    selling_price: number;

    @IsNotEmpty()
    @IsInt()
    purchase_price: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsNotEmpty()
    @IsInt()
    id_purchase_tax: number;

    @IsNotEmpty()
    @IsInt()
    min_stock: number;

    @IsNotEmpty()
    @IsInt()
    id_sales_tax: number;
}