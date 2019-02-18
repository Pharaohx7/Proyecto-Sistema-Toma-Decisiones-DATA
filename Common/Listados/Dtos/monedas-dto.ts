export class MonedasDto {
  constructor(
    public id: number,
    public descripcion: string,
    public codigoISO: string,
    public simbolo: string
  ) { }
}
