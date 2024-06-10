// src/components/Futebol.js
import React, { useState } from 'react';
import axios from 'axios';

const Futebol = () => {
    const [competicao, setCompeticao] = useState('');
    const [dados, setDados] = useState(null);
    const [error, setError] = useState(null);

    const handleBuscarDados = () => {
        setError(null);
        axios.get(`/api/futebol/${competicao}`)
            .then(res => {
                console.log('API Response Data:', res.data); // Adicionar esta linha
                setDados(res.data);
            })
            .catch(err => {
                console.error('API Error:', err.response ? err.response.data.message : 'Erro ao buscar dados');
                setError(err.response ? err.response.data.message : 'Erro ao buscar dados');
            });
    };

    return (
        <div>
            <h1>Buscar Dados de Futebol</h1>
            <input type="text" placeholder="Competição (ex: PL, BL1)" value={competicao} onChange={(e) => setCompeticao(e.target.value)} />
            <button onClick={handleBuscarDados}>Buscar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {dados && (
                <div>
                    <h2>Classificação da Competição</h2>
                    {dados.standings && dados.standings[0].table.length > 0 ? (
                        <ul>
                            {dados.standings[0].table.map((time, index) => (
                                <li key={index}>
                                    {time.position}. {time.team.name} - {time.points} pontos
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Não há dados de classificação disponíveis.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Futebol;
