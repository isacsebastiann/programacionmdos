import React, { useState, useEffect } from 'react';
import './App.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

function App() {
  const [apodData, setApodData] = useState(null);
  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=q5BGbL7uznzz7F311QUDVya2FqJ33lK3SRNbTBrM');
        if (response.ok) {
          const jsonData = await response.json();
          setApodData(jsonData);
        } else {
          console.error('error al obtener datos de la NASA');
        }
      } catch (error) {
        console.error('error en la llamada a la API NASA', error);
      }
    };

    const fetchPokeData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/25/');
        if (response.ok) {
          const jsonData = await response.json();
          setPokeData(jsonData);
        } else {
          console.error('error al obtener datos de la API de Pokémon');
        }
      } catch (error) {
        console.error('Error en la llamada API de Pokémon', error);
      }
    };

    fetchApodData();
    fetchPokeData();
  }, []);

  return (
    <div>
      <p>Isaac Sebastian Guerra Chamorro</p>
      {apodData && (
        <Card
          style={{ width: 400, height: 400 }}
          cover={<img alt={apodData.title} src={apodData.url} />}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
            title={apodData.title}
            /*description={apodData.explanation}*/
          />
        </Card>
      )}

      {pokeData && (
        <Card
          style={{ width: 400, marginTop: 16 }}
          cover={<img alt={pokeData.name} src={pokeData.sprites.back_default} />}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            title={pokeData.name}
            description={`ID: ${pokeData.id}`}
          />
        </Card>
      )}
    </div>
  );
}

export default App;
