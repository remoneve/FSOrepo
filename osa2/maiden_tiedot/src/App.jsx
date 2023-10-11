import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect run, search is now', search)

    if (search) {
      console.log('fetching countries...')
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [search]
  )

  /* handlers */
  const handleSearchChange = (event) => setSearch(event.target.value)

  /* set countrys name to searchbar by pressing show */
  const selectCountry = (country) => {
    setSearch(country.name.common.toLowerCase())
  }

  /* return the size of countries after searching */
  const size = (countries) => {
    if (countries) return countries.length
    return 0
  }

  return (
    <div>
      <SearchBar search={search} handler={handleSearchChange}/>
      <ListCountries countries={FilterCountries(search, countries)} 
      size={size(FilterCountries(search, countries))} onButtonPress={selectCountry} />
    </div>
  )
}

/* searchbar */
const SearchBar = ({search, handler}) => {
  return (
    <p>find countries <input value={search} onChange={handler}/></p>
  )
}

/* filter countries by search */
const FilterCountries = (search, countries) => {
  if (!countries) return null

  const filteredList = countries.map(country => country.name.common.toLowerCase().includes(search.toLowerCase()))  
  ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  : countries
  return (filteredList)
}

/* show countries as a list */
const ListCountries = ({countries, size, onButtonPress}) => {
  if (!countries || size >= 10 || size <= 0) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  return (
    <div>
      {countries.map(country => <PrintCountry key={country.name.common} country={country} size={size} onButtonPress={onButtonPress} />)}
    </div>
  )
}

/* print information of one country or many countries names */
const PrintCountry = ({country, size, onButtonPress}) => {
  const languages = Object.keys(country.languages).map((key) => country.languages[key])

  if (size === 1) {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ListLanguages languages={languages} />
        <img src={country.flags.svg} width={200} height={200} alt={`Flag of ${country.name.common}`}></img>
      </div>
    )
  }
  return (
    <p>{country.name.common} <button onClick={() => onButtonPress(country)}>show</button></p>
  )
}

const ListLanguages = ({languages}) => {
  return (
    <ul>
      {languages.map(language => <PrintLanguage key={language} language={language}/>)}
    </ul>
    )
}

const PrintLanguage = ({language}) => {
  return (
    <li>{language}</li>
  )
}

/*
const PrintWeather = ({country}) => {
  const api_key = import.meta.env.VITE_SOME_KEY

  return (
    <h2>{`Weather in ${country.capital}`}</h2>

  )
} */


export default App