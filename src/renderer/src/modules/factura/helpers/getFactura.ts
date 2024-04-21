import axios from "axios";
import { getApiUrl } from "../../../utils/apiUtils";
//Fachada
export const getFacturasFachada= ()=>{
    return  getFacturasApi()
}

//Consumir
const getFacturasApi= async ()=>{
    const url = getApiUrl('bitacoras');
    const response = await axios.get(url);
    return response.data;
}

