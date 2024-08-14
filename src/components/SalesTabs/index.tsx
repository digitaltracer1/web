import ListSellers from '@/app/(admin)/sellers/list-sellers'
import TabContent from './TabContent'
import TabRoot from './TabsRoot'

export function SalesTabs() {
  return (
    <TabRoot>
      <TabContent value="tab1">
        <ListSellers paramUrl={'sellers'} />
      </TabContent>
      <TabContent value="tab2">
        <div>Under Constructions</div>
      </TabContent>
    </TabRoot>
  )
}
