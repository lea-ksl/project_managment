import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/projects'

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

export const addProject = async (title, desc, chiefId, tags) => {
    const header = await createToken();
    console.log('addproject', title, desc, chiefId, tags)
    const payload ={
        title, desc, chiefId, tags
    }
    try {
        const res = await axios.post(url, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
    
}

export const getProjects = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export const getProjectById = async (projectId) => {
    
    const header = await createToken();
    try {
        const res = await axios.get(`${url}/${projectId}`,header)
    return res.data
    } catch (e) {
        console.error(e);
    }
    
}

export const getProjectByIdForEdit = async (projectId) => {
    
    const header = await createToken();
    try {
        const res = await axios.get(`${url}/edit/${projectId}`,header)
    return res.data
    } catch (e) {
        console.error(e);
    }
    
}

export const editProject = async (title, desc, tags, projectId) => {
    const header = await createToken();
    console.log('editproject', title, desc, tags)
    const payload ={
        title, desc, tags
    }
    try {
        const res = await axios.patch(`${url}/edit/${projectId}`, payload, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
}

