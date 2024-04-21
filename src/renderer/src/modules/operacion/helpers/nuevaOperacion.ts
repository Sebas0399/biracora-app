import axios from "axios";
import { getApiUrl } from "../../../utils/apiUtils";
//Fachada
export const createOperacionFachada= (operacione)=>{
    return  createOperacionApi(operacione)
}

//Consumir
const createOperacionApi= async (operacione)=>{
    const url = getApiUrl('operaciones');
    const response = await axios.post(url,operacione);
    return response.data;
}