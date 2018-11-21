import getWeatherData from './weatherApi'

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
  })
})

searchInput.addEventListener('keypress', async e => {
  if (e.which == 13) renderData()
})

const weatherCard = ({ name, condition, current: { c, f } }) => {
  const card = `
  <div class="card column" id="card">
    <div class="card-image" style="width: 30%">
      <img 
        src="https://media.giphy.com/media/z4Qquuhfjc3QI/giphy-downsized.gif" 
        width="100%"  
        class="image-fit-contain" 
      />
    </div>
    <div class="card-header">
      <div class="card-title h5">${name}</div>
      <div class="card-subtitle text-gray">Current Weather</div>
    </div>
    <div class="card-body">
      ${condition}
      ${c}\u2103
      ${f}\u2109
    </div>
    <div class="card-footer">
      <button id="refresh-btn" class="btn btn-primary">Refresh</button>
    </div>
  </div>
  `
  columns.insertAdjacentHTML('beforeend', card)
}

const addToSideMenu = ({ name }) => {
  const menuItem = `
    <li class="menu-item bg-primary">
      <a href="#" data-city="${name}"> 
        <i class="icon icon-link"></i> 
        ${name}
      </a>
    </li>
    <li class="divider"></li>
  `
  sidebar.insertAdjacentHTML('beforeend', menuItem)
}

const clearCard = () => {
  const card = document.getElementById('card')
  if (card) {
    columns.removeChild(card)
  }
}

const renderData = async () => {
  const searchVal = searchInput.value
  const weatherData = await getWeatherData(searchVal)
  if (weatherData) {
    clearCard()
    weatherCard(weatherData)
    weather.classList.remove('d-none')
    refetchData(weatherData.name)
    addToSideMenu(weatherData)
  }

  searchInput.value = ''
}

searchBtn.addEventListener('click', async () => {
  renderData()
})

const refetchData = async city => {
  const refreshBtn = document.getElementById('refresh-btn')
  refreshBtn.addEventListener('click', async () => {
    const data = await getWeatherData(city)
    if (data) {
      clearCard()
      weatherCard(data)
      weather.classList.remove('d-none')
    }
  })
}
