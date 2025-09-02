// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import SubAccountCard from './SubAccountCard'
import SubAccountListTable from './SubAccountListTable'

// Data Imports
import { getSubAccountsData } from '@/app/server/actions'

const SubAccountsTab = async () => {
  // Vars
  const data = await getSubAccountsData()

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SubAccountCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubAccountListTable subAccountData={data?.subAccountData} />
      </Grid>
    </Grid>
  )
}

export default SubAccountsTab
