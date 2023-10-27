import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [capital, setCapital] = useState(null)
  
  const api_key = import.meta.env.VITE_SOME_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
  
  useEffect(() => {
    if (!countries) {
      console.log('fetching countries...')
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
        })
    }
  }, []
  )

  useEffect(() => {
    if (capital) {
      console.log('fetching weather...')
      axios
        .get(url)
        .then(response => {
          setWeatherData(response.data)
      })
    }
  }, [capital]
  )

  const handleSearchChange = (event) => {
    setSearch(event.target.value)

    if (filterCountries(event.target.value, countries).length === 1) {
      const selectedCapital = filterCountries(event.target.value, countries)[0].capital[0]
      setCapital(selectedCapital)
    }
  }

  /* fills countrys name to searchbar by pressing show */
  const showCountry = (country) => setSearch(country.name.common.toLowerCase())

  /* filter countries by search */
  const filterCountries = (search, countries) => {
    const filteredList = countries.map(country => country.name.common.toLowerCase().includes(search.toLowerCase()))  
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : countries

    return filteredList
  }

  if (!countries) return null
  return (
    <div>
      <SearchBar search={search} handler={handleSearchChange}/>
      <ListCountries 
      countries={filterCountries(search, countries)} 
      size={filterCountries(search, countries).length} 
      onButtonPress={showCountry} weather={weatherData}/>
    </div>
  )
}

/* searchbar */
const SearchBar = ({search, handler}) => {
  return (
    <p>find countries <input value={search} onChange={handler}/></p>
  )
}

/* show countries as a list */
const ListCountries = ({countries, size, onButtonPress, weather}) => {
  if (size <= 0 || size >= 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  return (
    <div>
      {countries.map(country => 
      <PrintCountry key={country.name.common} country={country} size={size} weather={weather} onButtonPress={onButtonPress}  />)}
    </div>
  )
}

/* print information of one country or many countries names */
const PrintCountry = ({country, size, weather, onButtonPress}) => {
  if (size === 1) {
    if (!weather) return null
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital.join(', ')}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ListLanguages languages={Object.keys(country.languages).map((key) => country.languages[key])} />
        <img src={country.flags.svg} height={150} alt={`Flag of ${country.name.common}`}></img>
        <PrintWeather weather={weather} />
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

const PrintWeather = ({weather}) => {
  const celsius = Math.round((weather.main.temp - 273.15) * 100) / 100 

  return (
    <div>
      <h2>{`Weather in ${weather.name}`}</h2>
      <p>{`temperature ${celsius} Celsius`}</p>
      <p></p>
      <p>{`wind ${weather.wind.speed} m/s`}</p>
    </div>
    )
}

export default App