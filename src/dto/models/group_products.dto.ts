import { IsNotEmpty, IsString, MaxLength } from 'class-validator';


export class group_productDto {
    id_group_product: any;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    group_name: string;

}

export class createGroup_productDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    group_name: string;
}

export class updateGroup_productDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    group_name: string;
}