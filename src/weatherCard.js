import { formatDate } from './utils'
import conditionGif from './conditions'

const weatherCard = ({
  name,
  country,
  condition,
  sunrise,
  sunset,
  current: { c: cc },
  high: { c: hc },
  low: { c: lc }
}) => {
  const card = `
    <div class="card column" id="card">
      <div class="columns">
        <div class="column">
          <div class="card-header">
            <div class="card-title h1">${name}, ${country}</div>
            <div class="card-subtitle text-gray">
              Current Weather as of ${formatDate()}
            </div>
          </div>
          <div class="card-body columns">
            <div class="column col-6">
              <img 
                width="100%"
                src="${conditionGif(condition)}" 
              />
            </div>
            <div class="column col-6">
              <h1 class="h5">condition: ${condition}</h1>
              <h1 class="h5">Current: ${cc}\u2103</h1>
              <h1 class="h5">Low: ${lc}\u2103</h1>
              <h1 class="h5">High: ${hc}\u2103</h1>
              <h1 class="h5">Sunrise: ${formatDate(sunrise)}</h1>
              <h1 class="h5">Sunset: ${formatDate(sunset)}</h1>
            </div>
          </div>
          <div class="card-footer">
            <button id="refresh-btn" class="btn btn-primary">Refresh</button>
          </div>
        </div>
      </div>
    </div>
    `
  columns.insertAdjacentHTML('beforeend', card)
}

export default weatherCard
