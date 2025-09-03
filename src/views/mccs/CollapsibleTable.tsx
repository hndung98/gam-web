'use client'

// React Imports
import { useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'

// Third-party Imports
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table'

// Type Imports
import type { Customer } from '@/types/apps/ecommerceTypes'
import type { Locale } from '@configs/i18n'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type MCCAccount = {
  id: number
  name: string
  customer: string
  customerId: string
  avatar: string
  country: string
  countryFlag?: string
  email: string
  connecting: boolean
  timezone: string
  currency: string
  type: string
  status: string
  mccs: number
  cids: number
  createdAt: string
  subRows?: MCCAccount[]
}

const data: MCCAccount[] = [
  {
    id: 1,
    name: '879861.boston',
    customer: 'Stanfield Baser',
    customerId: '879861',
    avatar: '/images/avatars/1.png',
    country: 'Australia',
    countryFlag: '/images/cards/australia.png',
    email: 'sbaser0@boston.com',
    connecting: true,
    timezone: 'GMT+10:00',
    currency: 'USD',
    mccs: 5,
    cids: 60,
    status: 'enable',
    type: 'all',
    createdAt: '2025/08/16',
    subRows: [
      {
        id: 11,
        name: '178408.lycos',
        avatar: '/images/avatars/2.png',
        customer: 'Laurie Dax',
        customerId: '178408',
        country: 'Australia',
        countryFlag: '/images/cards/australia.png',
        email: 'ldax1@lycos.com',
        connecting: true,
        timezone: 'GMT+10:00',
        currency: 'USD',
        mccs: 5,
        cids: 60,
        status: 'enable',
        createdAt: '2025/08/16',
        type: 'all'
      },
      {
        id: 12,
        name: '221092.eepurl',
        avatar: '/images/avatars/3.png',
        customer: 'Maxine Kenrick',
        customerId: '221092',
        email: 'mkenrick2@eepurl.com',
        country: 'Australia',
        countryFlag: '/images/cards/australia.png',
        connecting: true,
        timezone: 'GMT+10:00',
        currency: 'USD',
        mccs: 5,
        cids: 60,
        status: 'enable',
        createdAt: '2025/08/16',
        type: 'all'
      }
    ]
  },
  {
    id: 2,
    name: '952795.santos',
    avatar: '/images/avatars/4.png',
    customer: 'Min',
    customerId: '952795',
    email: 'Min@santos.com',
    country: 'China',
    countryFlag: '/images/cards/china.png',
    connecting: true,
    timezone: 'GMT+10:00',
    currency: 'USD',
    mccs: 5,
    cids: 60,
    status: 'enable',
    createdAt: '2025/08/16',
    type: 'all'
  }
]

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

type MCCTypeWithAction = MCCAccount & {
  actions?: string
}

// Column Definitions
const columnHelper = createColumnHelper<MCCTypeWithAction>()

export default function CollapsibleTable() {
  const [expanded, setExpanded] = useState({})

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<MCCTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row, getValue }) => (
          <div className='flex gap-2'>
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
            <div
              className={`flex items-center ${row.getCanExpand() ? 'cursor-pointer' : ''}`}
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getCanExpand() && (
                <span className='mr-2'>
                  {row.getIsExpanded() ? (
                    <i className='ri-arrow-down-s-fill' />
                  ) : (
                    <i className='ri-arrow-right-s-fill' />
                  )}
                </span>
              )}
              {getValue<string>()}
            </div>
          </div>
        )
      },
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
          <Typography
            component={Link}
            color='text.primary'
            href={getLocalizedUrl(`/mccs/${row.original.id}`, locale as Locale)}
            className='font-medium hover:text-primary'
          >
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('customer', {
        header: 'Owner',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {getAvatar({ avatar: row.original.avatar, customer: row.original.customer })}
            <div className='flex flex-col items-start'>
              <Typography
                component={Link}
                color='text.primary'
                href={getLocalizedUrl(`/apps/ecommerce/customers/details/${row.original.customerId}`, locale as Locale)}
                className='font-medium hover:text-primary'
              >
                {row.original.customer}
              </Typography>
              <Typography variant='body2'>{row.original.email}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <img src={row.original.countryFlag} height={22} />
            <Typography>{row.original.country}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('timezone', {
        header: 'Timezone',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.timezone}</Typography>
      }),
      columnHelper.accessor('currency', {
        header: 'Currency',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.currency}</Typography>
      }),
      columnHelper.accessor('connecting', {
        header: 'Connecting',
        cell: ({ row }) => (
          <Chip
            label={row.original.connecting ? 'Connected' : 'Not connected'}
            variant='tonal'
            color={row.original.connecting ? 'success' : 'warning'}
            size='small'
          />
        )
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row }) => (
          <Chip
            label={row.original.type}
            variant='tonal'
            color={row.original.type === 'All' ? 'info' : 'default'}
            size='small'
          />
        )
      }),
      columnHelper.accessor('actions', {
        header: '',
        cell: ({ row }) => (
          <div className='flex items- justify-end'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary text-[22px]'
              options={[
                {
                  text: 'Edit',
                  icon: 'ri-edit-line',
                  menuItemProps: {
                    onClick: () => {
                      console.log(`Edit: ${row.original.id}`)
                    }
                  }
                },
                {
                  text: 'Check connecting',
                  icon: 'ri-phone-find-line',
                  menuItemProps: {
                    onClick: () => {
                      console.log(`Check connecting: ${row.original.id}`)
                    }
                  }
                },
                {
                  text: 'Disconnect',
                  icon: 'ri-stop-circle-line',
                  menuItemProps: {
                    onClick: () => {
                      console.log(`Disconnect: ${row.original.id}`)
                    }
                  }
                },
                {
                  text: 'Detail',
                  icon: 'ri-slideshow-view',
                  menuItemProps: {
                    onClick: () => {
                      console.log(`Detail: ${row.original.id}`, row.original)
                    }
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const getAvatar = (params: Pick<Customer, 'avatar' | 'customer'>) => {
    const { avatar, customer } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(customer as string)}
        </CustomAvatar>
      )
    }
  }

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    getCoreRowModel: getCoreRowModel(),
    state: { expanded },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: row => row.subRows
  })

  return (
    <>
      <Card>
        <div className='overflow-x-auto'>
          <table className='w-full rounded-lg shadow'>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className='px-4 py-2 text-left'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className='hover:bg-gray-600'>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className={`px-4 py-2 ${row.depth > 0 ? 'pl-10' : ''}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component='div'
            className='border-bs'
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' }
            }}
            onPageChange={(_, page) => {
              table.setPageIndex(page)
            }}
            onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
          />
        </div>
      </Card>
    </>
  )
}
