import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/users'

const createToken = async () => {
    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };

    return payloadHeader;
}

export const addUser = async (name, email, password) => {
    const header = await createToken();
    const payload = {
        name, email, password
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
}

export const getUsers = async () => {
    const header = await createToken();
    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getUserById = async (user) => {
    
    const header = await createToken();
    try {
        const res = await axios.get(`${url}/${user}`,header)
    return res.data
    } catch (e) {
        console.error(e);
    }
    
}