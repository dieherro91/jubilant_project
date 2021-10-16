import React from 'react'
const style = {
    width: '80%',
    textAlign:'center',
    marginLeft:'auto',
    marginRight:'auto',

};
export const ColumnFilterUser = ({column}) => {
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
                style={style}

                >            
            </input>
        </span>
    )
}
