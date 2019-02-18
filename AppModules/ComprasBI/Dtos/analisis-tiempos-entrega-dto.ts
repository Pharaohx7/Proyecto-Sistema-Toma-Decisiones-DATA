export class AnalisisTiemposEntregaDto {
  constructor(
    public noOrden: number,
    public noFactura: string,
    public proveedorId: number,
    public proveedor: string,
    public estadoOrden: string,
    public fechaEmision: Date,
    public fechaVencimiento: Date,
    public fechaIngreso: Date,
    public tiempoEntregaContrato: number,
    public tiempoEntregaFinal: number,
    public cumplimiento: number,
    public diasFavor: number,
    public diasRetraso: number
  ) { }
}
