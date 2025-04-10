import React, { useState } from "react";

const ItemForm = ({ onAdd }) => {
    const [newItem, setNewItem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        onAdd(newItem);
        setNewItem("");
    };

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter item name"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default ItemForm;