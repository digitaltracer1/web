'use client'

import GoogleMapsComponent, {
  IDataPoint,
} from '@/components/charts/google/maps/GoogleMapsComponent'
import { useSeller } from '@/context/seller-context'
import { SellerProps } from './page'

export default function MapSeller({ params }: SellerProps) {
  const { info } = useSeller()

  const dataSeller = info?.dataSale.find((data) => params.id === data.sellerId)

  // const saleByCoordinates: IDataPoint[] = dataSeller?.sales?.map(
  //   (item) => item.clientInfo.geojson,
  // )

  const saleByCoordinates =
    dataSeller?.sales
      ?.filter(
        (item) =>
          item.clientInfo.geojson &&
          typeof item.clientInfo.geojson.lat === 'number' &&
          !isNaN(item.clientInfo.geojson.lat) &&
          typeof item.clientInfo.geojson.lng === 'number' &&
          !isNaN(item.clientInfo.geojson.lng),
      )
      .map((item) => item.clientInfo.geojson)
      .filter((geojson): geojson is IDataPoint => geojson !== undefined) ?? []

  return <GoogleMapsComponent datapoints={saleByCoordinates} />
}
