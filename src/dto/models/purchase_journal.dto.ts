import { IsNotEmpty, IsString, MaxLength, IsInt, Max, IsEmail, IsOptional, Matches, IsDate } from 'class-validator';

export class purchaseJournalDto {
    id_jp: any;
    
    @IsNotEmpty()
    transaction_date: any;

    @IsNotEmpty()
    @IsInt()
    dis_term: number;

    @IsNotEmpty()
    @IsInt()
    ed_dist_term: number;

    @IsNotEmpty()
    @IsInt()
    ed_term: number;

    @IsNotEmpty()
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    @MaxLength(100)
    created_by:string;

    @IsNotEmpty()
    id_supplier: any;

    @IsNotEmpty()
    products: any[];
}