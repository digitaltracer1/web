import { Skeleton } from '@/components/ui/skeleton'
import {
  GoogleMap,
  GoogleMapProps,
  HeatmapLayer,
  InfoWindow,
  LoadScriptProps,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { darkModeStyles } from './styles/dark-mode'
import { useSeller } from '@/context/seller-context'

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
  const { loading } = useSeller()
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries,
  })

  const [visibleMarkers, setVisibleMarkers] = useState<IDataPoint[]>([])
  const [points, setPoints] = useState<google.maps.LatLng[]>([])
  const [selectedMarker, setSelectedMarker] = useState<IDataPoint | null>(null)
  const [heatmapPoints, setHeatmapPoints] = useState<google.maps.LatLng[]>([])

  const options: GoogleMapProps['options'] = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true,
    styles:
      theme === 'dark' ? [...darkModeStyles, ...alwaysStyles] : alwaysStyles,
  }

  const heatmapOptions = {
    radius: 20,
    opacity: 0.6,
    gradient: theme === 'dark' ? darkThemeGradient : lightThemeGradient,
  }

  useEffect(() => {
    if (isLoaded && datapoints && !loading.fetchSaleSellerData) {
      setPoints(
        datapoints.map(
          (point) => new window.google.maps.LatLng(point.lat, point.lng),
        ),
      )
      setVisibleMarkers(datapoints)
    }
  }, [datapoints, isLoaded])

  useEffect(() => {
    if (points.length > 0) {
      let currentIndex = 0
      const intervalId = setInterval(() => {
        if (currentIndex < points.length) {
          setHeatmapPoints((prev) => [...prev, points[currentIndex]])
          currentIndex++
        } else {
          clearInterval(intervalId)
        }
      }, 10) // Adiciona um novo ponto a cada 100ms para um efeito gradual

      return () => clearInterval(intervalId)
    }
  }, [points])

  useEffect(() => {
    if (!map) return

    if (isLoaded && map) {
      const handleZoomChanged = () => {
        const currentZoom = map.getZoom()
        if (currentZoom !== undefined && currentZoom >= 17) {
          setVisibleMarkers(datapoints)
        } else {
          setVisibleMarkers([])
        }
      }

      map.addListener('zoom_changed', handleZoomChanged)
      handleZoomChanged()

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
    return <Skeleton className="w-full h-full rounded-lg  dark:bg-zinc-800" />
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={options}
      onLoad={setMap}
    >
      <HeatmapLayer data={heatmapPoints} options={heatmapOptions} />
      {visibleMarkers.map((marker, index) => (
        <MarkerF
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={markerIcon(theme === 'dark' ? '#ff9000' : '#ff9000')}
          title={`${marker.name}`}
          onClick={() => setSelectedMarker(marker)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
          options={{ disableAutoPan: true }}
        >
          <div className="dark:text-black">
            <h2>{selectedMarker.name}</h2>
            <p>Lat: {selectedMarker.lat}</p>
            <p>Lng: {selectedMarker.lng}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

export default GoogleMapsComponent
