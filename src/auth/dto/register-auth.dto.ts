import { PartialType } from "@nestjs/mapped-types";
import { LoginAuthDto } from "./login-auth.dto";
import { IsNotEmpty } from "class-validator";

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    name: string;

    // Este rol no sera utilizado en el registro ya que siempre sera invitado (rol=1), pero se mantiene para la consistencia del DTO
    // y facilitar la creación de usuarios con otros roles para pruebas de permisos.
    role: number = 1
}