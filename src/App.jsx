import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import Character from '../component/Character';
import rickAndMortyGift from './assets/rick-and-morty.gif'

function App() {

  const [locationRickAndMorty, setLocationRickAndMorty] = useState({});
  const [typeId, setTypeId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const randomId = Math.floor(Math.random() * 126) +1;
  useEffect(() =>{
    axios.get(`https://rickandmortyapi.com/api/location/${randomId}`)
    .then((res) => {
      setIsLoading(false);
      setLocationRickAndMorty(res.data);
    });
  }, []);

  const searchLocation = () =>{
    axios.get(`https://rickandmortyapi.com/api/location/${typeId}`)
    .then((res) => {
      setIsLoading(false);
      setLocationRickAndMorty(res.data);
    });
  }

  return (
    <>
    {
      isLoading ? (
        <div className='loading'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
    <div className="App">
      <h1 className='title'>Rick And Morty</h1>
      <div className='header'>
       <img className='header-img' src={rickAndMortyGift} alt="rick and morty" /> 
      </div>
      <div className='searched'>
        <div className='search'>
          <input type="text" value={typeId} placeholder="search for a user by ID from number 1 to 126" onChange={e => setTypeId(e.target.value)}/>
          {
          typeId >= 127 || typeId == 0 ?
          (
            <button disabled className='btn' style={{background:"red", color: "white"}}>Search</button>
          ) :
          <button onClick={searchLocation} className='btn' style={{background:"#165e19", color:"white"}}>Search</button> 
          }
        </div>
        <div className='location'>
          <h2>{locationRickAndMorty.dimension}</h2>
          <div className='location-info'>
            <p><b className='white-info'>Type: </b>{locationRickAndMorty.type}</p>
            <p><b className='white-info'>Dimension: </b>{locationRickAndMorty.dimension}</p>
            <p><b className='white-info'>Population: </b>{locationRickAndMorty.residents?.length}</p>
          </div>
        </div>
      </div>
      <div className='main'>
        <div className='cards-content'>
          {
            locationRickAndMorty.residents?.map(location => (
              <Character
              key={location} 
              location={location}
              />
            )) 
          }
        </div>
      </div>
        {
          locationRickAndMorty.residents?.length >= 1 ? (
            <div className='footer' style={{marginTop:"20px"}}>
          <h2>Derechos reservados © Jhorman Nieto & Diego Cantillo</h2>
            </div>
          ) : (
            <div className='footer' style={{marginTop:"69px"}}>
              <h2>Derechos reservados © Jhorman Nieto & Diego Cantillo</h2>
            </div>
          )
        }
    </div>
    </>
        )}
       </>
       )
       
}

export default App
