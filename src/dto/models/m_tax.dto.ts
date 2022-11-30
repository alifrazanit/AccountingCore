import { IsNotEmpty, IsString, MaxLength, IsInt, Max, Min, IsDecimal } from 'class-validator';


export class m_taxDto {
    id_tax: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    tax_code: string; 

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tax_name: string;  
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(100)
    percentage: number;

    @IsNotEmpty()
    is_active: 'Y' | 'N';
}

export class createmTaxDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tax_name: string;  
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(100)
    percentage: number;
}


export class updateTaxDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    tax_name: string;  
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(100)
    percentage: number;

    @IsNotEmpty()
    is_active: 'Y' | 'N';
}
