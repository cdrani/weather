import getWeatherData from './weatherApi'
import getFiveDayWeatherData from './fiveDayWeather'
import conditionGif from './conditions'
import weatherCard from './weatherCard'
import weatherGraph from './weatherGraph'
import { formatDate } from './utils'

const tabItems = document.getElementsByClassName('options')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const columns = document.getElementById('columns')
const sidebar = document.getElementById('menu')
const weather = document.getElementById('weather')

const updateElementText = (el, text, units = '') => {
  const element = document.createElement(el)
  element.textContent = `${text}${units}`
  content.appendChild(element)
}

;[...tabItems].forEach(tabItem => {
  tabItem.addEventListener('click', () => {
    const active = document.querySelector('.tab-item.active')
    active.classList.remove('active')
    tabItem.classList.add('active')
    const cityList = document.querySelectorAll('[data-city]')
    if (cityList.length >= 1) {
      ;[...cityList].forEach(el =>
        el.addEventListener('click', setAsActiveLink)
      )
      const el = document.getElementsByClassName('bg-primary')[0]
      const city = el.innerText
      renderData(city)
    }
  })
})

searchInput.addEventListener('keypress', async e => {
  if (e.which === 13) renderData()
})


const createElement = (element, classes, options = {}) => {
  const el = document.createElement(element)

  for (let option in options) {
    if (option === 'city') {
      el.dataset.city = options[option]
    } else {
      const text = document.createTextNode(options[option])
      el.appendChild(text)
    }
  }
  el.classList = classes
  return el
}

const addToSideMenu = ({ name }) => {
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

const renderData = async city => {
  const searchVal = city || searchInput.value
  let weatherData

  if (document.querySelector('.options.active').id === 'current') {
    weatherData = await getWeatherData(searchVal)
  } else {
    weatherData = await getFiveDayWeatherData(searchVal)
  }

  if (weatherData) {
    clearCard()
    removeCurrentActiveLink()
    if (document.querySelector('.options.active').id === 'current') {
      weatherCard(weatherData)
    } else {
     weatherGraph(weatherData)
    }

    weather.classList.remove('d-none')
    refetchData(weatherData.name)
    addToSideMenu(weatherData)
  }

  searchInput.value = ''
}

searchBtn.addEventListener('click', async () => {
  await renderData()
})

const removeCurrentActiveLink = () => {
  const currentlyActive = document.querySelector('.bg-primary')
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
    data = await getWeatherData(e.target.dataset.city)
    weatherCard(data)
  } else {
    data = await getFiveDayWeatherData(e.target.dataset.city)
    weatherGraph(data)
  }
}

const refetchData = async city => {
  const refreshBtn = document.getElementById('refresh-btn')
  let data
  refreshBtn.addEventListener('click', async () => {
    if (document.querySelector('.options.active').id === 'current') {
      data = await getWeatherData(city)
    } else {
      data = await getFiveDayWeatherData(city)
    }

    if (data) {
      clearCard()
      if (document.querySelector('.options.active').id === 'current') {
        weatherCard(data)
      } else {
        weatherGraph(data)
      }
    }
  })
}
