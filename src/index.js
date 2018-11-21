import displayWeather from './displayWeather'
import weatherApi from './weatherApi'

const load = () => {
  const content = document.getElementById('content')
  const weather = weatherApi('edmonton')

  const display = `<h1>weather app</h1>`

  content.insertAdjacentHTML('beforeend', display)
  return content
}

load()
