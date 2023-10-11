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

  const size = (countries) => {
    if (countries) return countries.length
    return 0
  }

  /* handlers */
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <div>
      <SearchBar search={search} handler={handleSearchChange}/>
      <ListCountries countries={FilterCountries(search, countries)} 
      size={size(FilterCountries(search, countries))} />
    </div>
  )
}

const SearchBar = ({search, handler}) => {
  return (
    <p>find countries <input value={search} onChange={handler}/></p>
  )
}

const FilterCountries = (search, countries) => {
  if (!countries) return null

  const filteredList = countries.map(country => country.name.common.toLowerCase().includes(search.toLowerCase()))  
  ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  : countries
  return (filteredList)
}

const ListCountries = ({countries, size}) => {
  if (!countries || size >= 10 || size <= 0) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  return (
    <div>
      {countries.map(country => <PrintCountry key={country.name.common} country={country} size={size}/>)}
    </div>
  )
}

const PrintCountry = ({country, size}) => {
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
    <p>{country.name.common} <button>show</button></p>
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