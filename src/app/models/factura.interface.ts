import { ILineasFactura } from "./lineas-factura.interface";

export interface IFactura {
    nroFactura: number;
    fechaHora: string;
    idEmpresa: number;
    nombreEmpresa: string;
    precioTotal: number
    lineasFacturas: ILineasFactura[]

}