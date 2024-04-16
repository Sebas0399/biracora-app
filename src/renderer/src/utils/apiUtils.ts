//const API_URL = "https://daeapi.azurewebsites.net";
//const API_URL="https://dae-6nst.onrender.com"
//const API_URL = "https://apibitacora.onrender.com";
const API_URL="http://localhost:3000"
export function getApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`;
  }
  