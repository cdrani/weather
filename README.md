# weather

Live: [weather](https://cdrani.github.io/weather)

# Overview
This is a weather application built using the [openweathermap](https://openweathermap.org) api to fetch weather data from cities around the world. On load, the weather data pertaining your current location via your [geolocation ip](https://geoip-db.com/json/). Subsequent searches are added to a cities list, thus allowing for switching between cities.

## UI

App was designed completey using [spectrecss](https://picturepan2.github.io/spectre/), and although the ui is sparse, the weather data is placed alongside a gif of the current weather condition for fun and immediacy. On the 5-Day tab, a map of the current location is displayed, with a sparkline chart of the 5-Day temperature highs and lows displayed on the chart. Currently this chart is not very readable, essentially missing a legend, data points, axis, etc, but will be most likely be replaced with a better charting library.

## Preview

![weather app](weather.png)
