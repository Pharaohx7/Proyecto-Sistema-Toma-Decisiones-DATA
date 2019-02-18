import { RespuestaTipo } from '../../helpers/respuesta';

export class LoggedUserDto {
  constructor(
    public id: number,
    public usuario: string,
    public nombreCompleto: string,
    public email: string,
    public rolId: number,
    public empresaId: number,
    public respuestaTipo: RespuestaTipo,
    public respuesta: string
  ) { }
}
