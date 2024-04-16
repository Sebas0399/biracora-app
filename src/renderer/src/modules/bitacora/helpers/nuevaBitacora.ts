import axios from "axios";
import { getApiUrl } from "../../../utils/apiUtils";
//Fachada
export const createBitacoraFachada= (bitacora)=>{
    return  createBitacoraApi(bitacora)
}

//Consumir
const createBitacoraApi= async (bitacora)=>{
    const url = getApiUrl('bitacoras');
    const response = await axios.post(url,bitacora);
    return response.data;
}