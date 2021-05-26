import {
  select,
  csv,
  scaleLinear,
  scaleTime,
  extent,
  axisLeft,
  axisBottom
} from 'd3'

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {
  const xValue = d => d.timestamp
  const xAxisLabel = 'Timestamp'

  const yValue = d => d.temperature
  const yAxisLabel = 'Temperature'

  const title = 'A Week in San Francisco'

  const circleRadius = 6

  const margin = {
    top:    60,
    right:  45,
    bottom: 55,
    left:   90
  }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()
  
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  const xAxis = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10)
  
  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)
  
  const yAxisG = g.append('g').call(yAxis)
  
  yAxisG.selectAll('.domain').remove()

  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -60)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text(yAxisLabel)

  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`)

  xAxisG.select('.domain').remove()

  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 50)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
    .text(xAxisLabel)

  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius)

  g.append('text')
    .attr('class', 'title')
    .attr('y', -15)
    .text(title)
}

csv('temperature-in-san-francisco.csv').then(data => {

  data.forEach(d => {
    d.temperature = +d.temperature
    d.timestamp = new Date(d.timestamp)
  })

  render(data)
})