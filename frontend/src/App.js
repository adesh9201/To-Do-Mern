import React, { useEffect, useState } from "react";
import { fetchItems, addItem, updateItem, deleteItem } from "./api/itemService";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import "./styles.css";

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        const data = await fetchItems();
        setItems(data);
    };

    const handleAdd = async (name) => {
        await addItem(name);
        loadItems();
    };

    const handleUpdate = async (id) => {
        const newName = prompt("Enter new name:");
        if (newName) {
            await updateItem(id, newName);
            loadItems();
        }
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        loadItems();
    };

    return (
        <div className="container">
            <h1>CRUD App</h1>
            <ItemForm onAdd={handleAdd} />
            <ItemList items={items} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
    );
}

export default App;