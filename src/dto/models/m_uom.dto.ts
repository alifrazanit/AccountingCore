import { IsNotEmpty, IsString, MaxLength, IsInt, Max } from 'class-validator';


export class m_uomDto {
    id_uom: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(3)
    uom_code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    uom_name: string; 
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    description: string;

    @IsNotEmpty()
    is_active:  'Y' | 'N';
}

export class createUomDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    uom_name: string; 
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    description: string;
}

export class updateUomDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    uom_name: string; 
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(120)
    description: string;

    @IsNotEmpty()
    is_active: 'Y' | 'N';
}
