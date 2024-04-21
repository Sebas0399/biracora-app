import axios from "axios";
import { getApiUrl } from "../../../utils/apiUtils";
//Fachada
export const getClientesFachada= ()=>{
    return  getClientesApi()
}

//Consumir
const getClientesApi= async ()=>{
    const url = getApiUrl('clientes');
    const response = await axios.get(url);
    return response.data;
}