export class OrdenCompraDto {
  constructor(
    public ordenCompraId: number,
    public tipoPago: string,
    public fecha: Date,
    public fechaVence: Date,
    public proveedor: string,
    public estadoOrdenCompra: string,
    public gastosEnvio: number,
    public impuesto: number,
    public subtotal: number,
    public total: number,
    public observaciones: string,
    public monedaId: number,
    public detallesOrdenCompra: DetalleOrdenCompraDto[] = new Array<DetalleOrdenCompraDto>()
  ) { }
}

export class DetalleOrdenCompraDto {
  constructor(
    public detalleOrdenCompraId: number,
    public ordenCompraId: number,
    public componente: number,
    public marca: number,
    public modelo: number,
    public precio: number,
    public cantidad: number,
    public cantidadPendiente: number,
    public tipoImpuestoId: number,
    public total: number
  ) { }
}
