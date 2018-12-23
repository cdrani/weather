const getWeatherData = async city => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
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
    country: city.sys.country,
    sunrise: city.sys.sunrise * 1000,
    sunset: city.sys.sunset * 1000,
    high: {
      c: celsius(city.main.temp_max),
      get f() {
        return Math.round(fahrenheit(this.c))
      }
    },
    low: {
      c: celsius(city.main.temp_min),
      get f() {
        return fahrenheit(this.c)
      }
    },
    current: {
      c: celsius(city.main.temp),
      get f() {
        return fahrenheit(this.c)
      }
    },
    condition: city.weather[0].main,
    conditionId: city.weather[0].id
  }
}

export default getWeatherData
