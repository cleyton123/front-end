import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateItem from './CRUD/creat';
import ItemList from './CRUD/item';
import Futebol from './API/futebol';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios.get('http://localhost:5000/items');
        setItems(result.data);
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os itens!', error);
      }
    };

    fetchItems();
  }, []);

  const handleCreate = async (newItem) => {
    try {
      console.log('Item cadastrado com sucesso:', newItem);
      const response = await axios.post('http://localhost:5000/items', newItem);
      setItems([...items, response.data]);
    } catch (error) {
      console.error('Ocorreu um erro ao criar o item!', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Ocorreu um erro ao excluir o item!', error);
    }
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const response = await axios.put(`http://localhost:5000/items/${updatedItem._id}`, updatedItem);
      setItems(items.map((item) => (item._id === updatedItem._id ? response.data : item)));
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar o item!', error);
    }
  };

  return (
    <div>
      <h1>Item Manager</h1>
      <CreateItem onCreate={handleCreate} />
      <ItemList items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
      <Futebol></Futebol>
    </div>
  );

}

export default App;
