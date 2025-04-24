import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ItemList = ({ items, onUpdate, onDelete }) => {
    if (!items.length) {
        return <p style={{ color: "#666", fontStyle: "italic" }}>No items added yet.</p>;
    }

    return (
        <ul className="item-list">
            {items.map(item => (
                <li key={item._id} className="item">
                    <span title="Item Name">{item.name}</span>
                    <div>
                        <button
                            className="edit-btn"
                            onClick={() => onUpdate(item._id)}
                            title="Edit Item"
                        >
                            <FaEdit style={{ marginRight: "6px" }} />
                            Edit
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => onDelete(item._id)}
                            title="Delete Item"
                        >
                            <FaTrashAlt style={{ marginRight: "6px" }} />
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ItemList;