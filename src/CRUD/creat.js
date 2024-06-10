import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateItem = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/items', { name, description });
      console.log('Item cadastrado com sucesso:', response.data);

      const newItem = { name: response.data.name, description: response.data.description };
      onCreate(newItem);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateItem;
