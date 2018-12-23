import SparkLine from 'sparklines'
const sparkLine = data => {
  const average = data.reduce((a, b) => a + b) / data.length
  SparkLine.draw(document.getElementById('chart'), data, {
    width: 500,
    height: 300,
    maxColor: 'red',
    minColor: 'blue',
    lineWidth: 4,
    fillBelow: true,
    minLine: true,
    maxLine: true,
    averageLine: true
  })
}

export default sparkLine
