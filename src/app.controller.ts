/**
 * Controlador raíz de la API.
 * Expone un único endpoint para verificar el estado del servidor.
 * Útil para chequeos de disponibilidad o monitoreo básico.
 */

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  // Endpoint raíz que retorna un estado OK
  @Get()
  getHello(): string {
    return 'status:OK';
  }
}
