'use client'

// MUI Imports
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

export default function Toolbar() {
  return (
    <div className='flex gap-2'>
      <TextField id='outlined-basic' label='Input keyword' />
      <FormControl className='w-[150px]'>
        <InputLabel id='demo-basic-select-outlined-label'>Connecting</InputLabel>
        <Select label='Age' defaultValue='' id='demo-basic-select-outlined' labelId='demo-basic-select-outlined-label'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className='w-[150px]'>
        <InputLabel id='demo-basic-select-outlined-label'>Type</InputLabel>
        <Select label='Age' defaultValue='' id='demo-basic-select-outlined' labelId='demo-basic-select-outlined-label'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className='w-[150px]'>
        <InputLabel id='demo-basic-select-outlined-label'>Status</InputLabel>
        <Select label='Age' defaultValue='' id='demo-basic-select-outlined' labelId='demo-basic-select-outlined-label'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button variant='contained' color='secondary'>
        Filter
      </Button>
      <Button variant='contained'>Create MCC</Button>
    </div>
  )
}
