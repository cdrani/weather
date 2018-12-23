const getFiveDayWeatherData = async response => {
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
