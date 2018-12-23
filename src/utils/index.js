const formatDigits = digit => (digit < 10 ? `0${digit}` : digit)

export const formatDate = (date = Date.now()) => {
  const d = new Date(date)
  const hour = formatDigits(d.getHours())
  const min = formatDigits(d.getMinutes())
  return `${hour}:${min}`
}

export const createElement = (element, classes, options = {}) => {
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

export const fetchWeather = url => fetch(url, { mode: 'cors' })

export const celsius = temp => Math.round(temp - 273.15)

export const fahrenheit = temp => Math.round(temp * (9 / 5)) + 32

export const getWeatherData = async (city, cb, type = 'weather') => {
  const url = `https://api.openweathermap.org/data/2.5/${type}?q=${city}&appid=${
    process.env.APP_API_KEY
  }`

  try {
    const response = await fetchWeather(url)
    return await cb(response)
  } catch (e) {
    console.error(e)
  }
}
