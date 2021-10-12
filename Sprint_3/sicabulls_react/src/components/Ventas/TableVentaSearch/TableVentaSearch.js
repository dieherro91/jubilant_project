import React, { useEffect, useMemo , useState} from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'

import { COLUMNS } from './Columns.js'
import './TableVentaSearch.css'

import VentasService from '../../../conecction/VentasService.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableVentaSearch = () => {

    const [datas,setDatas]=useState([]);
    
    useEffect(()=>{
        
        async function DataTransfer(){
            toast.success("Cargando registros de ventas")
            await VentasService.getAllVentas().then(function (response){
                
                setDatas(response.data);
                
            }).catch(function (error) {
                console.error(error);
                toast.error("Error en cargar la data");
              });

        }
        DataTransfer()
        

    },[])






    //this avoid to re render de exiting data every single time
    const columns = useMemo(() => COLUMNS, [])
    const data = datas;

    //hook (function) and we pass and object as argument

    const {

        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    }, useFilters, useSortBy)

    return (
        <div>
            <ToastContainer position="bottom-right" />
            <table {...getTableProps()} id="table_Ventas_search" className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th id="head_id" className="table-active" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        <div className="row">
                                            <div className="col align-self-center">
                                                <span>
                                                    {column.render('Header')}{column.isSorted ? (column.isSortedDesc ? ' 🔻 ' : ' 🔺') : ''}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col align-self-center">
                                                {column.canFilter ? column.render('Filter') : null}
                                            </div>
                                        </div>
                                    </th>
                                ))
                            }
                            <th></th>
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default TableVentaSearch