import React from 'react'

export const ColumnFilter = ({column}) => {
    const { filterValue, setFilter }=column
    return (
        <span>
            
            <input id="input_search"
                
                value={filterValue || ''}
                onChange={(e)=> setFilter(e.target.value)}
                type="text"
                className="form-control" 
                placeholder="Buscar" 
                aria-label="Buscar" 
                aria-describedby="basic-addon1"
                style={{width: "100%"}}

                >            
            </input>
        </span>
    )
}
