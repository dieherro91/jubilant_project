




import React from 'react'
import { useUser } from '../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PrivateComponent = ({ roleList, children }) => {
    const { userData } = useUser()

    if (roleList.includes(userData.rol)) {
        return children;
    }
    const tas=()=>{
        toast.info(`Su Rol actual es :" ${userData.rol} " - Algunas opciones se han desabilitado,si necesita mas funcionalidades consulte con el adminitrador`);
    }
    return (
        <div>
            
            <ToastContainer
                position="top-center"
                autoClose={800}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {tas()}
            <ToastContainer />


        </div>
    )
}
export default PrivateComponent;