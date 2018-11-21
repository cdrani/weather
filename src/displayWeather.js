import getWeatherData from './weatherApi'

const tabItems = document.getElementsByClassName('tab-item')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const content = document.getElementById('content')

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
  })
})

searchInput.addEventListener('keypress', async e => {
  if (e.which == 13) renderData()
})

const renderData = async () => {
  const searchVal = searchInput.value
  const weatherData = await getWeatherData(searchVal)
  if (weatherData) {
    updateElementText('h1', weatherData.name)
    updateElementText('h1', weatherData.current.c, '\u2103')
    updateElementText('h1', weatherData.current.f, '\u2109')
  }
}

searchBtn.addEventListener('click', async () => {
  renderData()
})
