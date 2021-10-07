import { ColumnFilterProduct } from "./ColumnFilterProduct"

export const COLUMNS =[
    {
        Header:'ID Servicio',
        accessor:'id_Servicio',
        Filter:ColumnFilterProduct,
    },
    {
        Header:'Servicio',
        accessor:'servicio',
        Filter:ColumnFilterProduct,
    },
    {
        Header:'Fecha',
        accessor:'fecha',
        Filter:ColumnFilterProduct,
    },
    {
        Header:'Descripción',
        accessor:'descripcion',
        Filter:ColumnFilterProduct,
    },
    {
        Header:'Valor Unitario',
        accessor:'valor_unitario',
        Filter:ColumnFilterProduct,
    },
    {
        Header:'Estado',
        accessor:'estado',
        Filter:ColumnFilterProduct,
    },
]