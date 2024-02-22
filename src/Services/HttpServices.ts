import axios from "axios";
import {IUser} from "../Pages/Login";

export const getBooks = () => async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/books');
    return res.data
}
export const getListings = async (currentPage: number) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/listings?page=${currentPage}`);
    console.log(res)
    return res.data
}

function getAuthToken() {
    return localStorage.getItem('token') || '';
}

export const postListing = async (listingData: any) => {
    const authToken = getAuthToken();
    return await axios.post('http://127.0.0.1:8000/api/listing', listingData, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
}

export const login = async (user: { email: string, password: string }): Promise<IUser> => {
    const res = await axios.post('http://127.0.0.1:8000/api/login', user)
    return res.data.user
}