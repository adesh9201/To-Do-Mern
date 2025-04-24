import React, { useEffect, useState } from "react";
import { fetchItems, addItem, updateItem, deleteItem } from "./api/itemService";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import { ToastContainer, toast } from "react-toastify";
import { FaClipboardList } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadItems();
    }, []);

    // Load items from API
    const loadItems = async () => {
        setLoading(true);
        try {
            const data = await fetchItems();
            setItems(data);
        } catch (err) {
            toast.error("❌ Failed to fetch items. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle adding a new item
    const handleAdd = async (name) => {
        if (!name.trim()) {
            toast.error("❌ Item name cannot be empty!");
            return;
        }

        try {
            await addItem(name);
            toast.success("✅ Item added successfully!");
            loadItems();
        } catch {
            toast.error("❌ Failed to add item. Please try again.");
        }
    };

    // Handle updating an existing item
    const handleUpdate = async (id) => {
        const currentItem = items.find((item) => item._id === id);
        const newName = prompt("🔁 Update Item", currentItem?.name || "");
        if (newName && newName.trim() !== "") {
            try {
                await updateItem(id, newName.trim());
                toast.success("✅ Item updated!");
                loadItems();
            } catch {
                toast.error("❌ Update failed. Please try again.");
            }
        } else {
            toast.info("ℹ️ Update cancelled.");
        }
    };

    // Handle deleting an item
    const handleDelete = async (id) => {
        const itemName = items.find(item => item._id === id)?.name;
        if (window.confirm(`🗑️ Are you sure you want to delete "${itemName}"?`)) {
            try {
                await deleteItem(id);
                toast.success("🗑️ Item deleted!");
                loadItems();
            } catch {
                toast.error("❌ Failed to delete item.");
            }
        }
    };

    // Handle search input change with debouncing
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <header className="header">
                <FaClipboardList className="icon" />
                <h1 className="main-title">Modern CRUD App</h1>
            </header>

            <ItemForm onAdd={handleAdd} />

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            <section className="list-section">
                {loading ? (
                    <div className="loading-spinner">⏳</div> // Loading spinner instead of text
                ) : filteredItems.length === 0 ? (
                    <p className="empty-state">📭 No items found. Add your first item below!</p>
                ) : (
                    <ItemList items={filteredItems} onUpdate={handleUpdate} onDelete={handleDelete} />
                )}
            </section>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
            />
        </div>
    );
}

export default App;