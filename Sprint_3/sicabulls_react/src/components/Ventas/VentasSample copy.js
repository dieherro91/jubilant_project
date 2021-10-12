import React, {useEffect, useState} from "react";



const VentasSample=()=>{

    //entra una variable y cambio de valor de variable
    const [nombreVehiculo, setNombreVehiculo]=useState('nombreinicial');
    const [Campoinicial,setCampoinicial]=useState(false)
    const [CampoAdicional,setCampoAdicional]=useState(false)
    useEffect(()=>{
        console.log("me ejecuto cada vez que  cada vez que nombrevehiculo cambia")
        if (nombreVehiculo==='' || null){
            setCampoinicial(false)
        } else{
            setCampoinicial(true)
        }
    },[nombreVehiculo])  //quiero escuchar nombreVehiculo
    
    
    
    useEffect(()=>{

        console.log("campoC")
        
        
    },[Campoinicial])   

    //funcion para onchange
    const cambioDeNombre=(e)=>{
        console.log(e.target.value);
        
    }
    return(
        <>
           <h1>nombre</h1>
           <h1>{nombreVehiculo}</h1>
            <input onChange={(e)=>setNombreVehiculo(e.target.value)}></input>
            <button onClick={()=>setCampoAdicional(true)}>asdas</button>
            <h1>nombrewweq</h1>
            {
                Campoinicial?(<h4>{nombreVehiculo}</h4>):(<h1>esta vacio</h1>)
            }
            {
                CampoAdicional &&(
                    <div>
                        <h3>condicional</h3>
                        <input></input>
                        <input></input>
                        <input></input>
                        <input></input>
                        <input></input>
                        <button onClick={()=>setCampoAdicional(false)}>asdas</button>
                    </div>
                    
                )

            }
        </>
    )
}


export default VentasSample