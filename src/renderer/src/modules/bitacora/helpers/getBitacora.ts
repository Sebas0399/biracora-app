import axios from "axios";
import { getApiUrl } from "../../../utils/apiUtils";
//Fachada
export const getBitacorasFachada= ()=>{
    return  getBitacorasApi()
}

//Consumir
const getBitacorasApi= async ()=>{
    const url = getApiUrl('bitacoras');
    const response = await axios.get(url);
    return response.data;
}