import { IsString } from "class-validator"; //Eliminar importaciones que no se utilicen

export class UpdatePermissionDto {

    @IsString()
    code: string

}

