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

const weatherCard = ({
  img,
  name,
  country,
  condition,
  sunrise,
  sunset,
  current: { c: cc },
  high: { c: hc },
  low: { c: lc }
}) => {
  const card = `
  <div class="card column" id="card">
    <div class="columns">
      <div class="card-image column col-6">
        <img 
          src="https://media.giphy.com/media/z4Qquuhfjc3QI/giphy-downsized.gif" 
          width="100%"  
          class="image-fit-contain image-responsive" 
        />
      </div>
      <div class="column">
        <div class="card-header">
          <div class="card-title h1">${name}, ${country}</div>
          <div class="card-subtitle text-gray">
            Current Weather as of ${formatDate()}
          </div>
        </div>
          <img class="image-fit-contain image-responsive center" src="${img}" alt="map">
        <div class="card-body">
          <h1 class="h5">condition: ${condition}</h1>
          <h1 class="h5">Current: ${cc}\u2103</h1>
          <h1 class="h5">Low: ${lc}\u2103</h1>
          <h1 class="h5">High: ${hc}\u2103</h1>
          <h1 class="h5">Sunrise: ${formatDate(sunrise)}</h1>
          <h1 class="h5">Sunset: ${formatDate(sunset)}</h1>
        </div>
        <div class="card-footer">
          <button id="refresh-btn" class="btn btn-primary">Refresh</button>
        </div>
      </div>
    </div>
  </div>
  `
  columns.insertAdjacentHTML('beforeend', card)
}

const formatDate = (date = Date.now()) => {
  const d = new Date(date)
  const hour = formatDigits(d.getHours())
  const min = formatDigits(d.getMinutes())
  return `${hour}:${min}`
}

const formatDigits = digit => (digit < 10 ? `0${digit}` : digit)

const createElement = (element, classes, options = {}) => {
  const el = document.createElement(element)

  for (let option in options) {
    if (option == 'city') {
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

const clearCard = () => {
  const card = document.getElementById('card')
  if (card) {
    columns.removeChild(card)
  }
}

const renderData = async city => {
  const searchVal = city || searchInput.value
  const weatherData = await getWeatherData(searchVal)
  if (weatherData) {
    clearCard()
    removeCurrentActiveLink()
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
  const data = await getWeatherData(e.target.dataset.city)
  weatherCard(data)
}

const refetchData = async city => {
  const refreshBtn = document.getElementById('refresh-btn')
  refreshBtn.addEventListener('click', async () => {
    const data = await getWeatherData(city)
    if (data) {
      clearCard()
      weatherCard(data)
    }
  })
}
