import axios from "axios";
import { getApiUrl } from "../../../utils/apiUtils";
//Fachada
export const getBitacorasFachada= ()=>{
    return  getBitacorasApi()
}
export const getBitacorasIdFachada= (id)=>{
    return  getBitacorasIdApi(id)
}

//Consumir
const getBitacorasApi= async ()=>{
    const url = getApiUrl('bitacoras');
    const response = await axios.get(url);
    return response.data;
}

const getBitacorasIdApi= async (id)=>{
    const url = getApiUrl('bitacoras/'+id);
    const response = await axios.get(url);
    return response.data;
}