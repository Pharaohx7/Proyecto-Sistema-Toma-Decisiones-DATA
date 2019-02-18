export class RespuestaDto {
  constructor(
    public respuestaTipo: RespuestaTipo,
    public titulo: string,
    public mensaje: string,
    public transaccionId: number,
    public dto: any,
    public dtos: any[] = new Array<any>()
  ) { }
}

export enum RespuestaTipo {
  Ok = 1,
  Validacion = 2,
  Error = 3,
  AccesoDenegado = 4
}
