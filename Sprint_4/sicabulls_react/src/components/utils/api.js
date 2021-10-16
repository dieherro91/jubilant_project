import axios from "axios";
const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`
}
export const obtenertUsuario= async (successCallback,errorCallback) =>{
    const options = {
        method: 'GET',
        url:'http://localhost:3000/usuarios/self',
        Headers:{'Content-Type': 'application/json',
            Authorization:getToken(),
        }
    }
    await axios.request(options).then(successCallback).catch(errorCallback);
}