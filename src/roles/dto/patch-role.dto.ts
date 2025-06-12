import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsArray, IsInt, IsOptional } from "class-validator"; //Eliminar importaciones que no se utilicen
import { CreateRoleDto } from "./create-role.dto";

export class UpdateRoleDto extends PartialType(CreateRoleDto){
    @IsOptional()
    @IsString()
    name?: string

    // Se reciben los IDs de los permisos para la asignación
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    permissionIds?: number[];
}

