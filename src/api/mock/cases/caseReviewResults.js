export default [
  {
    id: 1,
    state: {
      value: 1,
      display: 'Pending',
      level: 1
    },
    value: 'Fred',
    form_data: [
      {
        data_group: 'customer',
        data_objects: [
          {
            uid: 'name',
            value: 'Fred'
          }
        ]
      }
    ],
    field_sets: [
      {
        id: null,
        title: null,
        description: null,
        dependencies: [],
        layout: {
          title_size: 1,
          title_line_separator: null,
          layout_type: 'grid',
          columns: 1,
          marker: null
        },
        form_fields: [
          {
            uid: 'name',
            input_type: 'text',
            label: 'Name',
            layout: {
              layout_type: 'vertical',
              column: 1,
              position: 1
            },
            properties: null,
            data_group: 'customer'
          }
        ]
      }
    ],
    finding: {
      id: 1,
      description: 'Name cannot be Fred you know.',
      responsible: {
        value: 1,
        display: 'Customer'
      },
      comments: [
        {
          id: 1,
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting ' +
          'industry. Lorem Ipsum has been the industry\'s standard dummy text ever since ' +
          'the 1500s, when an unknown printer took a galley of type and scrambled it to make a ' +
          'type specimen book. ',
          created: '2017-12-12 13:00',
          owner: {
            profile_type_id: 4,
            pk: 1,
            name: 'Stanimir Valchev',
            user_pk: 2,
            profile_type_display: 'Customer'
          }
        }
      ]
    }

  },
  {
    id: 2,
    state: {
      value: 1,
      display: 'Pending',
      level: 1
    },
    value: 'Flintstone',
    form_data: [
      {
        data_group: 'customer',
        data_objects: [
          {
            uid: 'last-name',
            value: 'Flinstone'
          }
        ]
      }
    ],
    field_sets: [
      {
        id: null,
        title: null,
        description: null,
        dependencies: [],
        layout: {
          title_size: 1,
          title_line_separator: null,
          layout_type: 'grid',
          columns: 1,
          marker: null
        },
        form_fields: [
          {
            uid: 'last-name',
            input_type: 'text',
            label: 'Last name',
            layout: {
              layout_type: 'vertical',
              column: 1,
              position: 1
            },
            properties: null,
            data_group: 'customer'
          }
        ]
      }
    ],
    finding: {}
  },
  {
    id: 3,
    state: {
      value: 1,
      display: 'Pending',
      level: 1
    },
    value: 'fred@flintsone.se',
    form_data: [
      {
        data_group: 'customer',
        data_objects: [
          {
            uid: 'email',
            value: 'lqlql@mail.bg'
          }
        ]
      }
    ],
    field_sets: [
      {
        id: null,
        title: null,
        description: null,
        dependencies: [],
        layout: {
          title_size: 1,
          title_line_separator: null,
          layout_type: 'grid',
          columns: 1,
          marker: null
        },
        form_fields: [
          {
            uid: 'email',
            input_type: 'text',
            label: 'E-mail',
            layout: {
              layout_type: 'vertical',
              column: 1,
              position: 1
            },
            properties: null,
            data_group: 'customer'
          }
        ]
      }
    ],
    finding: {}
  },
  {
    id: 4,
    state: {
      value: 1,
      display: 'Pending',
      level: 1
    },
    value: '',
    form_data: [
      {
        data_group: 'service_information',
        data_objects: [
          {
            uid: 'qualification',
            value: 'data.pdf'
          }
        ]
      }
    ],
    field_sets: [
      {
        id: null,
        title: null,
        description: null,
        dependencies: [],
        layout: {
          title_size: 1,
          title_line_separator: null,
          layout_type: 'grid',
          columns: 1,
          marker: null
        },
        form_fields: [
          {
            uid: 'qualification',
            input_type: 'file',
            label: 'Qualification',
            layout: {
              layout_type: 'vertical',
              column: 1,
              position: 1
            },
            properties: null,
            data_group: 'service_information'
          }
        ]
      }
    ],
    finding: {}
  }
]
