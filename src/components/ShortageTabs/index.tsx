import TabContent from './TabContent'
import TabRoot from './TabsRoot'

import Daily from '@/app/(admin)/shortage/(daily)/Daily'
import Indicated from '@/app/(admin)/shortage/Indicated'
import Manager from '@/app/(admin)/shortage/Manager'
import Opportunity from '@/app/(admin)/shortage/Opportunity'

export function ShortageTabs() {
  return (
    <TabRoot>
      <TabContent value="tab1">
        <Daily />
      </TabContent>
      <TabContent value="tab2">
        <Indicated />
      </TabContent>
      <TabContent value="tab3">
        <Manager />
      </TabContent>
      <TabContent value="tab4">
        <Opportunity />
      </TabContent>
    </TabRoot>
  )
}
