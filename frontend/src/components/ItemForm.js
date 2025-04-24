import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const ItemForm = ({ onAdd }) => {
    const [newItem, setNewItem] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = newItem.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setNewItem("");
    };

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter item name..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                maxLength={100}
                autoFocus
            />
            <button type="submit" title="Add Item">
                <FaPlus style={{ marginRight: "6px" }} /> Add
            </button>
        </form>
    );
};

export default ItemForm;