import { ColumnFilterVenta } from "./ColumnFilterVenta.js"

export const COLUMNS =[
    {
        Header:'ID venta',
        accessor:'id_venta',
        Filter:ColumnFilterVenta,
    },
    {
        Header:'ID Vendedor',
        accessor:'id_vendedor',
        Filter:ColumnFilterVenta,
    },
    {
        Header:'Nombre Cliente',
        accessor:'nombre_cliente',
        Filter:ColumnFilterVenta,
    },
    {
        Header:'Fecha',
        accessor:'fecha',
        Filter:ColumnFilterVenta,
    },
    {
        Header:'IVA',
        accessor:'iva',
        Filter:ColumnFilterVenta,
    },
    {
        Header:'Valor Total',
        accessor:'valor_venta',
        Filter:ColumnFilterVenta,
    },
]