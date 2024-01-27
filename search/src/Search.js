import React, { useEffect, useState } from 'react';
import  "./search.css";
import axios from 'axios';

function Search()
{
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');

    const fetchdata = async() => {
        try{
        let result = await axios.get(`https://restcountries.com/v3.1/all`);
       setCountries(result.data);
       setSearch('');
        }
        catch(e)
        {
            console.log("Error fetching data:", e);
        }
    }
    useEffect(() => {
    fetchdata();
    }, [])

    const filteredCountries = countries
    .filter((country) =>
      country.name.common &&
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));
  

  return(
    <div className='box'>
        <div className='st'>
    <input type='text' className='search' value={search} onChange={(e) => setSearch(e.target.value)} 
    placeholder='Search for  countries'
    />
    </div>
    <div className="container">
    {search === '' ? (
    countries.map((country, idx) => (
    <div className="countryCard" key={idx}>
      <img src={country.flags.png} alt={`img of ${country.name.common}`}  className="img"/>
      <h2>{country.name.common}</h2>
    </div>
  ))
    ) : (
        filteredCountries.map((cn, idx) => (
     <div className="card" key={idx}>
      <img src={cn.flags.png} alt={`img of ${cn.name.common}`}  className="img"/>
      <h2>{cn.name.common}</h2>
    </div>
        ))
    )}
  </div>
  </div>
  );
}
export default Search;