export class InventarioDto {
  constructor(
    public lote: number,
    public componente: string,
    public marca: string,
    public modelo: string,
    public noSerie: string,
    public fechaIngreso: Date,
    public fechaVenceGarantia: Date,
    public costoLempiras: number,
    public especificaciones: string
  ) { }
}
