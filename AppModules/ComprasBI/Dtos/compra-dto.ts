export class CompraDto {
  constructor(
    public compraId: number,
    public ordenCompraId: number,
    public noFactura: string,
    public cai: string,
    public fecha: Date,
    public subtotal: number,
    public impuesto: number,
    public gastosEnvio: number,
    public total: number,
    public observaciones: string,
    public tasaCambio: number,
    public monedaId: number,
    public detallesCompra: DetalleCompraDto[] = new Array<DetalleCompraDto>()
  ) { }
}

export class DetalleCompraDto {
  constructor(
    public detalleCompraId: number,
    public compraId: number,
    public detalleOrdenCompraId: number,
    public componente: string,
    public marca: string,
    public modelo: string,
    public precio: number,
    public cantidad: number,
    public tipoImpuestoId: number,
    public total: number,
    public detallesComponentes: DetalleComponenteCompraDto[] = new Array<DetalleComponenteCompraDto>()
  ) { }
}

export class DetalleComponenteCompraDto {
  constructor(
    public detalleComponenteCompraID: number,
    public detalleCompraID: number,
    public componente: string,
    public noSerie: string,
    public fechaVenceGarantia: Date,
    public especificaciones: string
  ) { }
}
