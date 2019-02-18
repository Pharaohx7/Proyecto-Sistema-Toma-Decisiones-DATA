export class TiposImpuestosDto {

  constructor(
    public id: number,
    public descripcion: string,
    public abreviatura: string,
    public porcentaje: number
  ) { }
}
