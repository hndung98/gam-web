// Type Imports
import type { MCCType } from '@/types/mccs/mccTypes'

export const db: MCCType = {
  mccData: [
    {
      id: 1,
      name: 'MCC 1001',
      avatar: '/images/avatars/1.png',
      customer: 'Stanfield Baser',
      customerId: '879861',
      email: 'sbaser0@boston.com',
      country: 'Australia',
      countryFlag: '/images/cards/australia.png',
      countryCode: 'lk',
      currency: 'USD',
      timezone: 'GMT+5',
      connecting: true,
      type: 'All',
      mccs: 5,
      cids: 20,
      createdAt: '8/16/2025',
      status: 'Active'
    },
    {
      id: 2,
      name: 'MCC 1002',
      avatar: '/images/avatars/2.png',
      customer: 'Laurie Dax',
      customerId: '178408',
      email: 'ldax1@lycos.com',
      country: 'Australia',
      countryFlag: '/images/cards/australia.png',
      countryCode: 'ru',
      currency: 'USD',
      timezone: 'GMT+5',
      connecting: true,
      type: 'Only me',
      mccs: 5,
      cids: 20,
      createdAt: '7/20/2025',
      status: 'Active'
    },
    {
      id: 3,
      name: 'MCC 1003',
      avatar: '/images/avatars/3.png',
      customer: 'Maxine Kenrick',
      customerId: '221092',
      email: 'mkenrick2@eepurl.com',
      country: 'Australia',
      countryFlag: '/images/cards/australia.png',
      countryCode: 'gt',
      currency: 'USD',
      timezone: 'GMT+5',
      connecting: false,
      type: 'All',
      mccs: 5,
      cids: 20,
      createdAt: '8/30/2025',
      status: 'Inactive'
    }
  ]
}
