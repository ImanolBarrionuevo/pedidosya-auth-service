import { IsString } from "class-validator";

export class UpdatePermissionDto {

    @IsString()
    code: string

}

