export interface IFactura {
    nroFactura: number;
    fechaHora: Date;
    idEmpresa: number;
    nombreEmpresa: string;
    precioTotal: number
    lineasFacturas: any[]

}