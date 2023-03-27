import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getCourses = async (path, options = []) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};


export const postCourses = async (path, data = {}) => {
    await httpRequest.post(path, data);
};

export const deleteCourse =  (path) => httpRequest.delete(path);

export const putCourses = async (path, options = []) => {
    await httpRequest.put(path, options);
};

export default httpRequest;