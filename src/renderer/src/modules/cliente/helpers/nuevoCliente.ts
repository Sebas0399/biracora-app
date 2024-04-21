import axios from "axios";
import { getApiUrl } from "../../../utils/apiUtils";
//Fachada
export const createClienteFachada= (cliente)=>{
    return  createClienteApi(cliente)
}

//Consumir
const createClienteApi= async (cliente)=>{
    const url = getApiUrl('clientes');
    const response = await axios.post(url,cliente);
    return response.data;
}