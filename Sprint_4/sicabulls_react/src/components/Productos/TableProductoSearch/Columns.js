import { ColumnFilterProducto } from "./ColumnFilterProducto.js"

export const COLUMNS =[
    {
        Header:'ID Servicio',
        accessor:'id_Servicio',
        Filter:ColumnFilterProducto,
    },
    {
        Header:'Servicio',
        accessor:'servicio',
        Filter:ColumnFilterProducto,
    },
    {
        Header:'Fecha',
        accessor:'fecha',
        Filter:ColumnFilterProducto,
    },
    {
        Header:'Descripción',
        accessor:'descripcion',
        Filter:ColumnFilterProducto,
    },
    {
        Header:'Valor Unitario',
        accessor:'valor_unitario',
        Filter:ColumnFilterProducto,
    },
    {
        Header:'Estado',
        accessor:'estado',
        Filter:ColumnFilterProducto,
    },
]