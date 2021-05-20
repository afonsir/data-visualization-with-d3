import { select, arc } from 'd3'

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const g = svg.append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)

const face = g.append('circle')
  .attr('r', height / 2)
  .attr('fill', 'yellow')
  .attr('stroke', 'black')

const eyeRadius = 30
const eyeSpacing = 100
const eyeYOffset = -70
const eyebrowWidth = 70
const eyebrowHeight = 15
const eyebrowYOffset = -70

const eyesG = g
  .append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`)

const leftEye = eyesG
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', -eyeSpacing)

const rightEye = eyesG
  .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', eyeSpacing)

const eyebrowsG = eyesG
  .append('g')
    .attr('transform', `translate(0, ${eyebrowYOffset})`)

eyebrowsG
  .transition().duration(2000)
    .attr('transform', `translate(0, ${eyebrowYOffset - 50})`)
  .transition().duration(2000)
    .attr('transform', `translate(0, ${eyebrowYOffset})`)

const leftEyebrow = eyebrowsG
  .append('rect')
    .attr('x', -eyeSpacing - eyebrowWidth / 2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight)

const rightEyebrow = eyebrowsG
  .append('rect')
    .attr('x', eyeSpacing - eyebrowWidth / 2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight)

const mouth = g
  .append('path')
    .attr('d', arc()({
      innerRadius: 150,
      outerRadius: 170,
      startAngle: Math.PI / 2,
      endAngle: Math.PI * 3 / 2
    }))
