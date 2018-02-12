export let caseSpecs = [
  {
    label: 'Case id',
    item_key: 'caseNumber',
    value: ''
  },
  {
    label: 'State',
    item_key: 'state',
    value: '',
    component: 'STATUS'
  },
  {
    label: 'Application date',
    item_key: 'applicationDate',
    value: ''
  },
  {
    label: 'Certification',
    item_key: 'service.code',
    value: ''
  },
  {
    label: 'Level',
    item_key: 'level'
  },
  {
    label: 'Auditor',
    item_key: 'auditor.name',
    value: ''
  },
  {
    label: 'Updated',
    item_key: 'modified',
    value: ''
  }]

export let customerProfileSpecs = [
  {
    label: 'First name',
    item_key: 'firstName',
    value: ''
  },
  {
    label: 'Last name',
    item_key: 'lastName',
    value: ''
  },
  {
    label: 'Customer No.',
    item_key: 'customerId',
    value: ''
  },
  {
    label: 'Phone number',
    item_key: 'phoneNumber',
    value: ''
  },
  {
    label: 'Mobile number',
    item_key: 'mobileNumber',
    value: ''
  },
  {
    label: 'E-mail',
    item_key: 'email',
    value: ''
  },
  {
    label: 'Website',
    item_key: 'website',
    value: ''
  },
  {
    label: 'Postal address',
    item_key: 'postalAddress',
    value: ''
  },
  {
    label: 'Postal code',
    item_key: 'postalCode',
    value: ''
  },
  {
    label: 'City',
    item_key: 'city',
    value: ''
  }
]

export let reviewResultSpecs = [
  {
    label: 'First name',
    component: 'REVIEW',
    item_key: 'name',
    value: ''
  },
  {
    label: 'Last name',
    component: 'REVIEW',
    item_key: 'last-name',
    value: ''
  },
  {
    label: 'E-mail',
    component: 'REVIEW',
    item_key: 'email',
    value: ''
  }
]

export let certificateSpecs = [
  {
    label: 'Certificate number',
    item_key: 'certificateNumber',
    value: ''
  },
  {
    label: 'Issue date',
    item_key: 'issueDate',
    value: ''
  },
  {
    label: 'Validity period (years)',
    item_key: 'validityPeriod',
    value: ''
  },
  {
    label: 'Expiry date',
    item_key: 'expiryDate',
    value: ''
  }
]
