const getWeatherData = async loc => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${
    process.env.APP_API_KEY
  }`

  try {
    const response = await fetchWeather(url)
    return await weatherData(response)
  } catch (e) {
    console.error(e)
  }
}

const fetchWeather = url => fetch(url, { mode: 'cors' })

const celsius = temp => Math.round(temp - 273.15)
const fahrenheit = temp => Math.round(temp * (9 / 5)) + 32

const weatherData = async response => {
  const city = await response.json()
  return {
    name: city.name,
    high: {
      c: Math.round(celsius(city.main.temp_max)),
      get f() {
        return Math.round(fahrenheit(this.c))
      }
    },
    low: {
      c: Math.round(celsius(city.main.temp_min)),
      get f() {
        return Math.round(fahrenheit(this.c))
      }
    },
    current: {
      c: Math.round(celsius(city.main.temp)),
      get f() {
        return Math.round(fahrenheit(this.c))
      }
    },
    condition: city.weather[0].main,
    conditionId: city.weather[0].id
  }
}

export default getWeatherData
