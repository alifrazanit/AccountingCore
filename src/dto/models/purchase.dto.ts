import { IsNotEmpty, IsString, MaxLength, IsInt, Max, IsEmail, IsOptional, Matches, IsDate } from 'class-validator';
export class purchaseDto {
    @IsNotEmpty()
    transaction_date: any;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    discount: any;

    @IsNotEmpty()
    id_user: any;

    @IsNotEmpty()
    id_tax: any;
}