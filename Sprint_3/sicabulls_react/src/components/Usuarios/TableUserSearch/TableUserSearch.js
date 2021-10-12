import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from './Columns.js'
import './TableUserSearch.css'


const TableUserSearch = () => {

          
    

    //this avoid to re render de exiting data every single time
    const columns = useMemo(() => COLUMNS, [])
    
    const data = useMemo(() => MOCK_DATA, [])
    
    //hook (function) and we pass and object as argument

    const {

        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable ({
        columns,
        data
    }, useFilters, useSortBy)

    return (
        <div>
            <div className="shadow bg-white rounded">
                <table {...getTableProps()} id="table_users_search" className="table">
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
        </div>
    )
}

export default TableUserSearch