import MCCListTable from '@/views/mccs/MCCListTable'

// Data Imports
import { getMCCData } from '@/app/server/actions'
import CollapsibleTable from '@/views/mccs/CollapsibleTable'

export default async function MCCListTablePage() {
  // Vars
  const data = await getMCCData()

  return (
    <>
      <MCCListTable mccData={data?.mccData} />
      <div className='mt-6'>
        <CollapsibleTable />
      </div>
    </>
  )
}
