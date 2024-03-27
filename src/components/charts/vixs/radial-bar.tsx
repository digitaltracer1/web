import React from 'react'
import { Group } from '@visx/group'
import { Pie } from '@visx/shape'
import { ParentSize } from '@visx/responsive'
import { useSpring, animated, to } from '@react-spring/web'

const percentage = 70 // A porcentagem a ser exibida

// Cria os dados para o gráfico
const mockData = (value: number) => [
  { label: 'filled', value },
  { label: 'empty', value: 100 - value },
]

const RadialChart = () => {
  // Animação da porcentagem de 0 até o valor final
  const { value } = useSpring({
    from: { value: 0 },
    to: { value: percentage },
    config: { duration: 1000 },
  })

  return (
    <ParentSize>
      {({ width, height }) => {
        const radius = Math.min(width, height) / 2
        const centerY = height / 2
        const centerX = width / 2
        const strokeWidth = 10
        const innerRadius = radius - strokeWidth // Subtrai para adicionar padding

        const data = mockData(value.get())

        return (
          <svg width={width} height={height}>
            <Group top={centerY} left={centerX}>
              <Pie
                data={data}
                pieValue={(d) => d.value}
                outerRadius={radius}
                innerRadius={innerRadius}
                cornerRadius={3}
              >
                {(pie) =>
                  pie.arcs.map((arc, index) => {
                    const fill = arc.data.label === 'filled' ? '#fff' : '#333'
                    return (
                      <path
                        key={`arc-${index}-${arc.data.label}`}
                        d={pie.path(arc) || ''}
                        fill={fill}
                      />
                    )
                  })
                }
              </Pie>
              {/* Centraliza a legenda e porcentagem */}
              <text
                fill="#fff"
                x={0}
                y={-15}
                fontSize={15}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                Devoluções
              </text>
              <animated.text
                fill="#fff"
                x={0}
                y={15}
                fontSize={20}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {to(value, (n) => `${n.toFixed(2)}%`)}
              </animated.text>
            </Group>
          </svg>
        )
      }}
    </ParentSize>
  )
}

export default RadialChart
