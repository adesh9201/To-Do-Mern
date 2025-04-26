import axios from "axios";

const API_URL = "https://adeshmishra-todo.onrender.com";

export const fetchItems = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addItem = async (name) => {
    const response = await axios.post(API_URL, { name });
    return response.data;
};

export const updateItem = async (id, name) => {
    const response = await axios.put(`${API_URL}/${id}`, { name });
    return response.data;
};

export const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
