import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsString()
    body: string;

    @IsArray()
    @IsString({ each: true })
    tagList: string[];
}