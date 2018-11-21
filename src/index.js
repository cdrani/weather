import displayWeather from './displayWeather'
import weatherApi from './weatherApi'

const load = () => {
  const content = document.getElementById('content')

  const weather = displayWeather('edmonton')

  content.insertAdjacentHTML('beforeend', weather)
  return content
}

load()
