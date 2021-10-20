import axios from "axios";
const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`
}
export const obtenertUsuario= async (successCallback,errorCallback) =>{
    const options = {
        method: 'GET',
        url:'http://localhost:5000/usuarios/self',
        headers:{'Content-Type': 'application/json',
            Authorization:getToken(),
        }
    }
    await axios.request(options).then(successCallback).catch(errorCallback);
}