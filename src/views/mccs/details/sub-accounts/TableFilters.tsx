// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// Type Imports
import type { SubAccount } from '@/types/mccs/subAccountTypes'

const TableFilters = ({
  setData,
  subAccountData
}: {
  setData: (data: SubAccount[]) => void
  subAccountData?: SubAccount[]
}) => {
  // States
  const [accountType, setAccountType] = useState<SubAccount['type']>('')

  useEffect(
    () => {
      const filteredData = subAccountData?.filter(account => {
        if (accountType && account.type !== accountType) return false

        return true
      })

      setData(filteredData ?? [])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accountType, subAccountData]
  )

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth>
            <InputLabel id='type-select'>Type</InputLabel>
            <Select
              fullWidth
              id='select-type'
              label='Type'
              value={accountType}
              onChange={e => setAccountType(e.target.value)}
              labelId='type-select'
            >
              <MenuItem value=''>Select Type</MenuItem>
              <MenuItem value='Google Ads'>Google Ads</MenuItem>
              <MenuItem value='MCC'>MCC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
