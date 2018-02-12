export default [
  {
    id: 1,
    state: {
      value: 1,
      level: 1,
      display: 'Action Needed'
    },
    case_id: 1,
    title: 'Social security number',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet',
    field_sets: [
      {
        id: 1,
        title: '',
        description: '',
        dependencies: [],
        layout: {
          layout_type: 'grid',
          columns: 1,
          title_size: 4,
          title_line_separator: '',
          marker: ''
        },
        form_fields: [
          {
            uid: 'social-security',
            input_type: 'text',
            label: 'Social security number',
            layout: {
              layout_type: 'vertical',
              column: 1,
              position: 1
            },
            properties: null,
            data_group: 'native'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    state: {
      value: 1,
      level: 1,
      display: 'Action Needed'
    },
    title: 'Experience',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet',
    field_sets: [
      {
        id: 1,
        title: '',
        description: '',
        dependencies: [],
        layout: {
          layout_type: 'grid',
          columns: 1,
          title_size: 4,
          title_line_separator: '',
          marker: ''
        },
        form_fields: [
          {
            uid: 'experience',
            input_type: 'file',
            label: 'Experience',
            layout: {
              layout_type: 'grid',
              column: 1,
              position: 1
            },
            properties: null,
            data_group: 'native'
          }
        ]
      }
    ]
  }
]
