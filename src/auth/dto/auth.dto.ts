import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
export class signupDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
export class signinDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}