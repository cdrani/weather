import conditionGif from './conditions'
import { createElement, formatDate, getWeatherData } from './utils'
import getCurrentWeatherData from './currentWeather'
import getFiveDayWeatherData from './fiveDayWeather'
import weatherCard from './components/weatherCard'
import weatherGraph from './components/weatherGraph'
import sparkLine from './sparkline'

const tabItems = document.getElementsByClassName('options')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const columns = document.getElementById('columns')
const sidebar = document.getElementById('menu')
const weather = document.getElementById('weather')
const chart = document.getElementById('chart')

;[...tabItems].forEach(tabItem => {
  tabItem.addEventListener('click', () => {
    const active = document.querySelector('.tab-item.active')
    active.classList.remove('active')
    tabItem.classList.add('active')
    const city = document.querySelector('.bg-primary.text-light')
    renderData(city.innerText)
  })
})

const capitalize = str => str[0].toUpperCase() + str.substr(1)

const cityList = () => {
  const cities = document.querySelectorAll('[data-city]')
  const cityNames = [...cities].map(city => city.innerText)
  return cityNames
}

const notInCityLIst = city => !cityList().includes(capitalize(city))

searchInput.addEventListener('keypress', async e => {
  if (e.which === 13 && notInCityLIst(searchInput.value)) {
    removeCurrentActiveLink()
    renderData()
  }
})

searchBtn.addEventListener('click', async () => {
  if (searchInput.value && notInCityLIst(searchInput.value)) {
    removeCurrentActiveLink()
    await renderData()
  }
})

const displayLocation = async res => {
  const data = await res.json()
  if (data) {
    await renderData(data.city)
  }
}

export const getUserLocation = async () => {
  const loc = await fetch('https://geoip-db.com/json/', { mode: 'cors' })
  return await displayLocation(loc)
}

const addToSideMenu = name => {
  const noDuplications = [...document.querySelectorAll('[data-city]')]
  if (noDuplications.filter(link => link.text === name).length === 0) {
    const anchor = createElement('a', 'btn text-light bg-primary btn-sm', {
      city: name,
      text: name
    })
    anchor.addEventListener('click', setAsActiveLink)
    const liContainer = createElement('li', 'menu-item')
    const liDivider = createElement('li', 'divider')
    liContainer.appendChild(anchor)
    sidebar.appendChild(liContainer)
    sidebar.appendChild(liDivider)
  }
}

const clearCard = () => {
  const card = document.getElementById('card')
  if (card) {
    columns.removeChild(card)
  }
}

const refetchData = async city => {
  let data
  if (document.querySelector('.options.active').id === 'current') {
    data = await getWeatherData(city, getCurrentWeatherData)
  } else {
    data = await getWeatherData(city, getFiveDayWeatherData, 'forecast')
  }

  if (data) {
    clearCard()
    if (document.querySelector('.options.active').id === 'current') {
      weatherCard(data)
    } else {
      weatherGraph(data)
      sparkLine(data.temps)
    }
  }
}

const renderData = async (city = searchInput.value) => {
  let weatherData

  if (document.querySelector('.options.active').id === 'current') {
    weatherData = await getWeatherData(city, getCurrentWeatherData)
  } else {
    weatherData = await getWeatherData(city, getFiveDayWeatherData, 'forecast')
  }

  if (weatherData) {
    clearCard()
    if (document.querySelector('.options.active').id === 'current') {
      weatherCard(weatherData)
    } else {
      weatherGraph(weatherData)
      sparkLine(weatherData.temps)
    }

    weather.classList.remove('d-none')
    addToSideMenu(weatherData.name)
  }

  searchInput.value = ''
}

// export const setupRefreshAction = () => {
//   const refreshBtn = document.getElementById('refresh-btn')
//   const city = document.querySelector('.bg-primary').innerText
//   console.log('city', city)

//   if (refreshBtn) {
//     refreshBtn.addEventListener('click', e => {
//       refetchData(city)
//     })
//   }
// }

const removeCurrentActiveLink = () => {
  const currentlyActive = document.querySelector('.bg-primary.text-light')
  if (currentlyActive) {
    currentlyActive.classList.remove('bg-primary', 'text-light')
    currentlyActive.classList.add('bg-secondary', 'text-dark')
  }
}

const setAsActiveLink = async e => {
  removeCurrentActiveLink()
  e.target.classList.remove('bg-secondary', 'text-dark')
  e.target.classList.add('bg-primary', 'text-light')
  clearCard()
  let data
  if (document.querySelector('.options.active').id === 'current') {
    data = await getWeatherData(e.target.dataset.city, getCurrentWeatherData)
    weatherCard(data)
  } else {
    data = await getWeatherData(
      e.target.dataset.city,
      getFiveDayWeatherData,
      'forecast'
    )
    weatherGraph(data)
    sparkLine(data.temps)
  }
}
