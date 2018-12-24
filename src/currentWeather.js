import { celsius, fahrenheit } from './utils'

const getCurrentWeatherData = async response => {
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
  }
}

export default getCurrentWeatherData
