import axios from "axios";
import { getApiUrl } from "../../../utils/apiUtils";
//Fachada
export const getOperacionesFachada= ()=>{
    return  getOperacionesApi()
}

//Consumir
const getOperacionesApi= async ()=>{
    const url = getApiUrl('operaciones');
    const response = await axios.get(url);
    return response.data;
}