import EnhancedTable from '@/components/mcc/table'
import Toolbar from '@/components/mcc/toolbar'

export default function Page() {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Toolbar />
      </div>
      <div>
        <EnhancedTable />
      </div>
    </div>
  )
}
