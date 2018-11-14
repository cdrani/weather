const fetchWeather = async loc => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${
    process.env.APP_API_KEY
  }`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export default fetchWeather
