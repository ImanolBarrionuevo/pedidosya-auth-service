import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsArray, IsInt } from "class-validator"; //Eliminar importaciones que no se utilicen
import { CreateRoleDto } from "./create-role.dto";

export class UpdateRoleDto extends PartialType(CreateRoleDto){

    @IsString()
    name?: string

    // Se reciben los IDs de los permisos para la asignación
    @IsArray()
    @IsInt({ each: true })
    permissionIds?: number[];
}

