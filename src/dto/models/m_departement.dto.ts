import { IsNotEmpty, IsString, MaxLength, IsInt, Max, IsEnum } from 'class-validator';


export class m_departementDto {
    id_departement: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(12)
    department_code: string; 

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    departement: string;  
    
    @IsNotEmpty()
    id_subdepartement: number;

    @IsNotEmpty()
    is_active: 'Y' | 'N';
}

export class createDeptDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    departement: string;  
    
    @IsNotEmpty()
    id_subdepartement: number;
}

export class updateDeptDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    departement: string;  
    
    @IsNotEmpty()
    id_subdepartement: number;

    @IsNotEmpty()
    is_active: 'Y' | 'N';
}