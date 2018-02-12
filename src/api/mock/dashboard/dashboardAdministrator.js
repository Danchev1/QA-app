import { CASE_STATES } from '@/api/config'

export default [
  {
    id: 1,
    state: CASE_STATES.ASSIGNING_REVIEWER,
    reminder_increment: 1,
    reminder: new Date().toISOString(),
    auditor: null,
    accepted: null,
    service: {
      id: 1,
      name: 'Service Name',
      short_name: 'Service Short Name',
      code: 'CEX'
    },
    customer: 'fred@flintstone.com',
    issues: []
  },
  {
    id: 2,
    state: CASE_STATES.ASSIGNING_REVIEWER,
    reminder_increment: 1,
    reminder: new Date().toISOString(),
    auditor: 3,
    accepted: new Date().toISOString(),
    service: {
      id: 2,
      name: 'Service Name 2',
      short_name: 'Service Short Name 2',
      code: 'FUNK'
    },
    customer: 'magnus@magnusson.com',
    issues: []
  }
]
