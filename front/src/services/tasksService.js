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

export const addTask = async (content, statut, projectId, userId, tag) => {
    const header = await createToken();
    const payload ={
        content, statut, projectId, userId, tag
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
        const res = await axios.get(`${url}/${projectId}`, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getTaskByIdForEdit = async (taskId) => {
    const header = await createToken();
    try {
        const res = await axios.get(`${url}/edit/${taskId}`,header)
    return res.data
    } catch (e) {
        console.error(e);
    }
    
}

export const editTask = async (content, userId, tag, statut, task) => {
    const header = await createToken();
    const payload ={
        content, userId, tag, statut, task
    }
    try {
        const res = await axios.patch(`${url}/edit/${task}`, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
}

