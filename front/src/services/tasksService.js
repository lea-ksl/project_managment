import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/tasks'

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

export const addTask = async (content, statut, projectId, userId) => {
    const header = await createToken();
    console.log('addtask', content, statut, projectId, userId)
    const payload ={
        content, statut, projectId, userId
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
    
}

export const getTasks = async (projectId) => {
    const header = await createToken();

    try {
        const res = await axios.get(`${url}/${projectId}`, header)
        console.log('test4', res)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

