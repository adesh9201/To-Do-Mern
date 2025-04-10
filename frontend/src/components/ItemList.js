import React from "react";

const ItemList = ({ items, onUpdate, onDelete }) => {
    return (
        <ul className="item-list">
            {items.map(item => (
                <li key={item._id} className="item">
                    <span>{item.name}</span>
                    <div>
                        <button className="edit-btn" onClick={() => onUpdate(item._id)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDelete(item._id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ItemList;