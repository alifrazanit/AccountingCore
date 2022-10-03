import { IsNotEmpty, IsString, MaxLength, IsInt, Max, IsEmail, IsOptional, Matches } from 'class-validator';


export class m_usersDto {
    id_users: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    name: string;

    @IsNotEmpty()
    @MaxLength(7)
    nik: string;  //13 = departement awal 12 = YEAR 001 = norut 
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    phone: string;

    @IsString()
    @MaxLength(150)
    address: string;

    @IsOptional()
    @IsString()
    @MaxLength(225)
    photo: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(120)
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(225)
    personal_doc_attch: string;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    @Max(1)
    cat_personal_doc: number;

    @IsString()
    @MaxLength(120)
    city: string;

    @IsString()
    @MaxLength(80)
    country: string;

    @IsString()
    @MaxLength(10)
    postalcode: string;

    @IsOptional()
    @IsString()
    @MaxLength(225)
    image: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    password: string;
}


export class createUserDto{
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
    @IsString()
    @MaxLength(50)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak!'
    })
    password: string;
}

export class updateUserDto{
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

export class loginDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    password: string;
}