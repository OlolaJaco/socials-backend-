import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePostDto {

  @IsOptional()
  @IsNotEmpty({ message: 'Title must not be empty' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
    @IsString()
    body?: string;
  
    @IsOptional()
    @IsString()
    tagList?: string[];
}
