// import {
//   GoogleMap,
//   GoogleMapProps,
//   HeatmapLayer,
//   LoadScript,
//   HeatmapLayerProps,
//   MarkerF,
//   MarkerProps,
//   LoadScriptProps,
// } from '@react-google-maps/api'

// import { useTheme } from 'next-themes'
// import React, { useEffect, useState } from 'react'
// import { Props } from 'react-apexcharts'
// import { darkModeStyles } from './styles/dark-mode'
// import { datapoints } from './data/datapoints'

// interface IDataPoint {
//   lat: number
//   lng: number
//   name: string
// }

// const libraries = ['visualization'] as LoadScriptProps['libraries']

// const containerStyle: GoogleMapProps['mapContainerStyle'] = {
//   width: '100%',
//   height: '100%',
// }

// const alwaysStyles = [
//   {
//     featureType: 'poi',
//     elementType: 'labels',
//     stylers: [{ visibility: 'off' }],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'labels.icon',
//     stylers: [{ visibility: 'off' }],
//   },
// ]

// const center = {
//   lat: -15.799665090411168,
//   lng: -48.12442563524614,
// }

// const heatmapOptions: HeatmapLayerProps['options'] = {
//   radius: 10,
// }

// const markerOptions: MarkerProps['options'] = {}

// const GoogleMapsComponent: React.FC<Props> = () => {
//   const [map, setMap] = useState<google.maps.Map>()
//   const [mapLoaded, setMapLoaded] = useState(false)
//   const [visibleMarkers, setVisibleMarkers] = useState<IDataPoint[]>([])
//   const [points, setPoints] = useState<google.maps.LatLng[]>([])
//   const { theme } = useTheme()

//   const options: GoogleMapProps['options'] = {
//     disableDefaultUI: true, // Desabilita a UI padrão para um visual mais limpo
//     fullscreenControl: true,
//     zoomControl: true, // Opcional: habilita o controle de zoom se necessário
//     styles:
//       theme === 'dark' ? [...darkModeStyles, ...alwaysStyles] : alwaysStyles,
//   }

//   useEffect(() => {
//     console.log(mapLoaded)
//     if (!mapLoaded) return
//     console.log(mapLoaded)

//     const convertedData = datapoints.map(
//       (point) => new google.maps.LatLng(point.lat, point.lng),
//     )

//     setPoints(convertedData)
//   }, [mapLoaded])

//   useEffect(() => {
//     if (!map) return

//     const onZoomChanged = () => {
//       const currentZoom = map.getZoom() || 12

//       const visible = currentZoom >= 17 ? datapoints : []

//       setVisibleMarkers(visible)
//     }

//     google.maps.event.addListener(map, 'zoom_changed', onZoomChanged)
//     onZoomChanged()

//     return () => google.maps.event.clearListeners(map, 'zoom_changed')
//   }, [map, points])

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyBThGMFC4JPC0q3d33oJk4C9l-47QB3RfE"
//       libraries={libraries}
//       onLoad={() => {
//         console.log('loaded')
//         return setMapLoaded(true)
//       }}
//       onUnmount={() => {
//         console.log('loaded')
//       }}
//     >
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={12}
//         options={options}
//         onLoad={setMap}
//         onUnmount={() => {
//           console.log('loaded')
//         }}
//       >
//         {mapLoaded && (
//           <>
//             <HeatmapLayer data={points} options={heatmapOptions} />
//             {visibleMarkers.map((point, index) => (
//               <MarkerF
//                 key={index}
//                 position={{ lat: point.lat, lng: point.lng }}
//                 label={point.name}
//                 options={markerOptions}
//               />
//             ))}
//             {/* {polygonData.map((polygon, index) => (
//               <Polygon
//                 key={index}
//                 paths={polygon.paths}
//                 options={polygon.options}
//               />
//             ))} */}
//           </>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   )
// }

// export default GoogleMapsComponent

import {
  GoogleMap,
  GoogleMapProps,
  HeatmapLayer,
  MarkerF,
  useJsApiLoader,
  LoadScriptProps,
} from '@react-google-maps/api'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { darkModeStyles } from './styles/dark-mode'

export interface IDataPoint {
  lat: number
  lng: number
  name: string
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: -15.799665090411168,
  lng: -48.12442563524614,
}

const alwaysStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
]

const darkThemeGradient = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)',
]

const lightThemeGradient = [
  'rgba(102, 255, 0, 0)',
  'rgba(147, 255, 0, 1)',
  'rgba(193, 255, 0, 1)',
  'rgba(238, 255, 0, 1)',
  'rgba(244, 227, 0, 1)',
  'rgba(249, 198, 0, 1)',
  'rgba(255, 170, 0, 1)',
  'rgba(255, 113, 0, 1)',
  'rgba(255, 57, 0, 1)',
  'rgba(255, 0, 0, 1)',
]

const libraries: LoadScriptProps['libraries'] = ['visualization']

const GoogleMapsComponent = ({ datapoints }: { datapoints: IDataPoint[] }) => {
  const { theme } = useTheme()
  const [map, setMap] = useState<google.maps.Map>()
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBThGMFC4JPC0q3d33oJk4C9l-47QB3RfE',
    libraries,
  })

  const [visibleMarkers, setVisibleMarkers] = useState<IDataPoint[]>([])
  const [points, setPoints] = useState<google.maps.LatLng[]>([])

  const options: GoogleMapProps['options'] = {
    disableDefaultUI: true, // Desabilita a UI padrão para um visual mais limpo
    fullscreenControl: true,
    zoomControl: true, // Opcional: habilita o controle de zoom se necessário
    styles:
      theme === 'dark' ? [...darkModeStyles, ...alwaysStyles] : alwaysStyles,
  }

  const heatmapOptions = {
    radius: 20,
    opacity: 0.6,
    gradient: theme === 'dark' ? darkThemeGradient : lightThemeGradient,
  }

  // Ajuste para criar os objetos LatLng apenas após o script do Google Maps ser carregado
  useEffect(() => {
    if (isLoaded && datapoints) {
      setPoints(
        datapoints.map(
          (point) => new window.google.maps.LatLng(point.lat, point.lng),
        ),
      )
      setVisibleMarkers(datapoints) // Aqui você pode definir quais marcadores serão visíveis
    }
  }, [datapoints, isLoaded])

  // Listen for zoom changes and adjust visible markers
  useEffect(() => {
    if (!map) return

    if (isLoaded && map) {
      const handleZoomChanged = () => {
        const currentZoom = map.getZoom()
        // Verifique se currentZoom não é undefined antes de comparar
        if (currentZoom !== undefined && currentZoom >= 17) {
          setVisibleMarkers(datapoints)
        } else {
          setVisibleMarkers([])
        }
      }

      // Adiciona listener de zoom_changed
      map.addListener('zoom_changed', handleZoomChanged)

      // Executa imediatamente para configurar o estado inicial
      handleZoomChanged()

      // Limpa o listener quando o componente é desmontado ou o mapa muda
      return () => {
        google.maps.event.clearListeners(map, 'zoom_changed')
      }
    }
  }, [datapoints, isLoaded, map])

  const markerIcon = (color: string) => {
    const hexColor = color.replace('#', '%23')

    return {
      url: `data:image/svg+xml;utf-8,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
          <path fill="${hexColor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
        </svg>`,

      scaledSize: new google.maps.Size(38, 38),
    }
  }

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={options}
      onLoad={setMap}
    >
      <HeatmapLayer data={points} options={heatmapOptions} />
      {visibleMarkers.map((marker, index) => (
        <MarkerF
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={markerIcon(theme === 'dark' ? '#457a38' : '#457a38')}
          title={`${marker.name}`}
        />
      ))}
    </GoogleMap>
  )
}

export default GoogleMapsComponent
