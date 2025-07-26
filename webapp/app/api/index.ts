import axios from "axios";
const baseUrl = "https://api.meghskitchen.com/api"

type ParamsObject = {
    [key: string]: string | number | boolean | Array<Object>;
};


// Orders Api
export const createOrder = async (params: ParamsObject) => {
    const { data } = await axios.post(`${baseUrl}/orders`, params);
    return data;
}

// Menu Api
export const getAllMenu = async () => {
    const { data } = await axios.get(`${baseUrl}/menu-items`);
    return data;
}
