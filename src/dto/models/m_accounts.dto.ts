import { IsNotEmpty, IsString, MaxLength, IsInt, Max, IsEnum } from 'class-validator';


export class m_accountsDto {
    id_account: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(5)
    account_code: string; 

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    account_name: string;  
    
    @IsNotEmpty()
    balance: number;
}

export class m_accountsCreateDto {
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    account_name: string;  
}

export class m_accountsUpdateDto {
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    account_name: string;  

    @IsNotEmpty()
    isActive:'Y' | 'N';  
}