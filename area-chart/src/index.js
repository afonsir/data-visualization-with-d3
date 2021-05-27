import {
  select,
  csv,
  scaleLinear,
  scaleTime,
  extent,
  max,
  axisLeft,
  axisBottom,
  area,
  curveBasis,
  format
} from 'd3'

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {
  const xValue = d => d.year
  const xAxisLabel = 'Time'

  const yValue = d => d.population
  const yAxisLabel = 'Population'

  const title = 'World Population'

  const margin = {
    top:    60,
    right:  45,
    bottom: 55,
    left:   80
  }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
  
  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0])
    .nice()
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  const xAxis = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10)
  
  const yAxisTickFormat = number =>
    format('.1s')(number)
      .replace('G', 'B')

  const yAxis = axisLeft(yScale)
    .tickFormat(yAxisTickFormat)
    .tickSize(-innerWidth)
    .tickPadding(10)
  
  const yAxisG = g.append('g').call(yAxis)
  
  yAxisG.selectAll('.domain').remove()

  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -40)
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
  
  const areaGenerator = area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
    .curve(curveBasis)
  
  g.append('path')
    .attr('class', 'line-path')
    .attr('d', areaGenerator(data))

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', 45)
    .text(title)
}

csv('world-population-by-year-2015.csv').then(data => {

  data.forEach(d => {
    d.population = +d.population
    d.year = new Date(d.year)
  })

  render(data)
})