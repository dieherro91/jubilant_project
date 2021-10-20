import { ColumnFilterUser } from "./ColumnFilterUser.js"

export const COLUMNS =[
    {
        Header:'ID Usuario',
        accessor:'id',
        Filter:ColumnFilterUser,
    },
    {
        Header:'Nombre',
        accessor:'nombre',
        Filter:ColumnFilterUser,
    },
    {
        Header:'E-mail',
        accessor:'email',
        Filter:ColumnFilterUser,
    },
    {
        Header:'Nickname',
        accessor:'nickname',
        Filter:ColumnFilterUser,
    },
    {
        Header:'Rol',
        accessor:'rol',
        Filter:ColumnFilterUser,
    },
    {
        Header:'Estado',
        accessor:'estado',
        Filter:ColumnFilterUser,
    },
]