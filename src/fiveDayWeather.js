const getFiveDayWeatherData = async city => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
    process.env.APP_API_KEY
  }`

  try {
    const response = await fetchWeather(url)
    return await fiveDayWeatherData(response)
  } catch (e) {
    console.error(e)
  }
}

const fetchWeather = url => fetch(url, { mode: 'cors' })

const fiveDayWeatherData = async response => {
  const cityData = await response.json()
  const {
    list,
    city: {
      name,
      country,
      coord: { lat, lon }
    }
  } = cityData
  return {
    map: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/static/${lon},${lat},10.0,0,0/500x300?access_token=${
      process.env.MAP_TOKEN
    }`,
    name,
    country,
    temps: list.map(data => data.main.temp)
  }
}

export default getFiveDayWeatherData
