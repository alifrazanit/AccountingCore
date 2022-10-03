import { IsNotEmpty, IsString, MaxLength, IsInt, Max } from 'class-validator';


export class m_supplierDto {
    id_suppler: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(7)
    supplier_code: string;  //2 = supplier 21 = year 001 = urut
    
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
    @MaxLength(50)
    cp: string;

    @IsString()
    @MaxLength(225)
    image: string;
}

export class createSuppDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    phone: string;

    @IsString()
    @MaxLength(150)
    address: string;

    @IsNotEmpty()
    @IsString()
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

    @IsString()
    @MaxLength(50)
    cp: string;
}

export class updateSuppDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    phone: string;

    @IsString()
    @MaxLength(150)
    address: string;

    @IsNotEmpty()
    @IsString()
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

    @IsString()
    @MaxLength(50)
    cp: string;
}