import { CASE_STATES } from '@/api/config'

export default [
  {
    id: 1,
    service: {
      id: 1,
      name: 'Service Name',
      short_name: 'Service Short Name',
      code: 'CEX'
    },
    customer: 'fred@flintstone.com',
    cases: [
      {
        id: 1,
        state: CASE_STATES.ACTION_REQUIRED,
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
        issues: [
          {
            id: 1,
            form_field: {
              id: 21,
              uid: 'technical-knowledge',
              input_type: 'file',
              label: 'Technical knowledge',
              layout: {
                layout_type: 'horizontal',
                position: 1
              },
              properties: {
                accept_file_type: '.pdf,.csv,.txt,.xls,.xlsx,.doc,.docx'
              }
            },
            state: CASE_STATES.ACTION_REQUIRED,
            message: 'Need to upload verified information about technical knowledge. This could be lorem.',
            value: 'Issue Value'
          },
          {
            id: 2,
            form_field: {
              id: 22,
              uid: 'experience',
              input_type: 'file',
              label: 'Experience',
              layout: {
                layout_type: 'horizontal',
                position: 2
              },
              properties: {
                accept_file_type: '.pdf,.csv,.txt,.xls,.xlsx,.doc,.docx'
              }
            },
            state: CASE_STATES.ACTION_REQUIRED,
            message: 'Need to prove your experience. Please download pre-filed template here' +
            ' and upload when you have the signatures of your employer.',
            value: 'Issue Value'
          }
        ]
      },
      {
        id: 2,
        state: CASE_STATES.DONE,
        reminder_increment: 1,
        reminder: new Date().toISOString(),
        auditor: 3,
        accepted: new Date().toISOString(),
        service: {
          id: 1,
          name: 'Service Name',
          short_name: 'Service Short Name',
          code: 'CEX'
        },
        customer: 'fred@flintstone.com',
        issues: []
      }
    ]
  },
  {
    id: 2,
    service: {
      id: 2,
      name: 'Service Name 2',
      short_name: 'Service Short Name 2',
      code: 'FUNK'
    },
    customer: 'fred@flintstone.com',
    cases: [
      {
        id: 3,
        state: CASE_STATES.DONE,
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
        customer: 'fred@flintstone.com',
        issues: []
      },
      {
        id: 4,
        state: CASE_STATES.DONE,
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
        customer: 'fred@flintstone.com',
        issues: []
      }
    ]
  }
]
