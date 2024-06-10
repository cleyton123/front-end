import React, { useState } from 'react';

const ItemList = ({ items, onDelete, onUpdate }) => {
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem({ ...item });
  };
  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(editItem);
      setEditItem(null);
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar o item!', error);
    }
  };
  

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => onDelete(item._id)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
          </li>
        ))}
      </ul>
      {editItem && (
        <form onSubmit={handleUpdateSubmit}>
          <input
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            value={editItem.description}
            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default ItemList;
