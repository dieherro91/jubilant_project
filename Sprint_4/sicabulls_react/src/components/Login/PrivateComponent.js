




import React from 'react'

export const PrivateComponent = ({roleList,chidren}) => {
    if( roleList.includes('admin')){
        return chidren;
    }
    return (
        <div>
            
        </div>
    )
}
