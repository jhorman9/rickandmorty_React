import axios from 'axios';
import React, { useEffect, useState } from 'react';
import photoRickAndMorty from '../src/assets/rickandmorty.png'

const Character = ({location}) => {

    const [residentInfo, setResidentInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        axios.get(location)
        .then((res) => {
            setIsLoading(false);
            setResidentInfo(res.data)
        });
    }, [])

    return (
        <>
        { isLoading ? (
            <div className='loading2'>
                <div className='card card1'><p>Loading...</p></div> 
                <div className='card card1'><p>Loading...</p></div>
                <div className='card card1'><p>Loading...</p></div>
                <div className='card card1'><p>loading...</p></div>
            </div>
        ) : (
        <div className='card'>
            <div className='info-img'>
                <img src={residentInfo.image == undefined ? photoRickAndMorty : residentInfo.image} alt={`Character Photo: ${residentInfo.name}`} />
            </div>
            <div className='info'>
                    {residentInfo.status === "Alive" ? (
                        <div className='row-card-info'> 
                            <div className='status-content'>
                                <div className='status' style={{background:"green", boxShadow:"0 0 10px green"}}></div>
                            </div>
                            <div className='status-info'>
                                <p>{residentInfo.status} - {residentInfo.species}</p> 
                            </div>
                        </div>
                    ) : residentInfo.status === "Dead" ? (
                        <div className='row-card-info'> 
                            <div className='status-content'>
                                <div className='status' style={{background:"red", boxShadow:"0 0 10px red"}}></div>
                            </div>
                            <div className='status-info'>
                                <p>{residentInfo.status} - {residentInfo.species}</p> 
                            </div>
                        </div>
                    ) : (
                        <div className='row-card-info'> <div className='status' style={{background:"gray", boxShadow:"0 0 10px gray"}}></div> {residentInfo.status} - {residentInfo.species}</div>
                    )}
                <p><b>Name:</b> <span>{residentInfo.name}</span></p>
                <p><b>Origin: </b> <span>{residentInfo.origin?.name}</span></p>
                <p><b>Episode: </b> <span>{residentInfo.episode?.length}</span></p>
            </div>
        </div>
        )}
        </>
    );
};

export default Character;