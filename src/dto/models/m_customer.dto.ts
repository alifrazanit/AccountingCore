import { IsNotEmpty, IsString, MaxLength, IsInt, Max, IsEmail, IsOptional, Matches } from 'class-validator';

export class m_customersDto {
    id_cust: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(7)
    customer_code: string;  //1 = customer 1 = customer type 21 = year 001 = urut
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    phone: string;

    @IsString()
    @MaxLength(150)
    address: string;

    @IsString()
    @MaxLength(225)
    photo: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    email: string;

    @IsString()
    @MaxLength(225)
    personal_doc_attch: string;

    @IsNotEmpty()
    @IsInt()
    @Max(1)
    cat_personal_doc: string;

    @IsString()
    @MaxLength(120)
    city: string;

    @IsString()
    @MaxLength(80)
    country: string;

    @IsString()
    @MaxLength(10)
    postalcode: string;

    @IsString()
    @MaxLength(225)
    image: string;
}

export class createCustDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @Matches(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/, {
        message: 'phone maks lenght = 13 & min length = 10, phone wajib diawali 62 | +62 | 08'
    })
    phone: string;

    @IsString()
    @MaxLength(150)
    address: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(120)
    email: string;

    @IsString()
    @MaxLength(120)
    city: string;

    @IsString()
    @MaxLength(80)
    country: string;

    @IsString()
    @MaxLength(10)
    postalcode: string;
}

export class updateCustDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @Matches(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/, {
        message: 'phone maks lenght = 13 & min length = 10, phone wajib diawali 62 | +62 | 08'
    })
    phone: string;

    @IsString()
    @MaxLength(150)
    address: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(120)
    email: string;

    @IsString()
    @MaxLength(120)
    city: string;

    @IsString()
    @MaxLength(80)
    country: string;

    @IsString()
    @MaxLength(10)
    postalcode: string;

    @IsNotEmpty()
    is_active: 'Y' | 'N';
}