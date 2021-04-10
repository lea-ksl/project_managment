import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/poles/:projectid'

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

export const addPole = async (title, desc, projectId) => {
    const header = await createToken();
    console.log('addpole', title, desc, projectId)
    const payload ={
        title, desc, projectId
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
    
}

export const getPoles = async (projectI) => {
    const header = await createToken();

    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

