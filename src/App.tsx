import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import axios from "axios";
import { IRep } from './IRep';
import Representative from './Representative';
import './App.css';

function App() {  
  const [loading, setLoading] = useState(false);
  const [repFound, setRepFound] = useState<IRep[]>([]);
  const [postalCode, setPostalCode] = useState('');
  const [keyPressed, setKeyPressed] = useState(false);
  const cors = 'https://thingproxy.freeboard.io/fetch/';
  
  async function fetchData() {
    setLoading(true);    
    await axios.get(cors+`https://represent.opennorth.ca/postcodes/${postalCode}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    }).then((response) => {
      const allReps = response.data.representatives_centroid;
      setRepFound(allReps);
      console.log(allReps);
    }).then(() => setLoading(false));
  }

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    const strVal = event.currentTarget.value
    setPostalCode(strVal.toUpperCase());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setKeyPressed(true);
      setPostalCode(postalCode);
      if (keyPressed) {
        fetchData();
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <form>
        <h1>Search for your MLA</h1>
        <input 
          maxLength={6}
          type="search" 
          id="mla-search" 
          name="mla-search" 
          placeholder="Enter your postal code" 
          onChange={search}
          onKeyDown={handleKeyDown}
          value={postalCode}
        />

        {(!loading) ? '' : <p>Searching for representatives in {postalCode.toUpperCase()}...</p>}

      <div className='representative-container'>
        {(repFound.length > 0 ) && repFound
          .filter(rep => ((rep.elected_office == "MLA") || (rep.elected_office == 'MPP')))
          .map(rep =>
            (<Representative key={rep.email} rep={rep}></Representative>))
        }
      </div>
      </form>
    </div>
  );
}

export default App;
