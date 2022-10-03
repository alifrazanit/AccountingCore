import { IsNotEmpty, IsString, MaxLength, IsInt, Max, IsEnum } from 'class-validator';


export class m_subdepartementDto {
    id_subdepartement: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    subdepartement: string;  

    @IsNotEmpty()
    is_active: boolean;
}


export class m_CreateSubdepartementDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    subdepartement: string;  
}
