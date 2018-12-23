import { formatDate } from './utils'

const columns = document.getElementById('columns')

const weatherGraph = ({ map, name, country, temps }) => {
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
              src="${map}" 
            />
          </div>
          <div class="column col-6" id="chart">
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
export default weatherGraph
