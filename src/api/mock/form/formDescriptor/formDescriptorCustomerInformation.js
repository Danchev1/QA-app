export default {
  id: 1,
  field_sets: [
    {
      id: 1,
      title: 'Customer information',
      description: '',
      dependencies: [],
      layout: {
        layout_type: 'grid',
        columns: 2,
        title_size: 4,
        title_line_separator: 'under',
        marker: ''
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
          properties: {
            input_required: true
          },
          data_group: 1
        },
        {
          uid: 'last-name',
          input_type: 'text',
          label: 'Last name',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 2
          },
          properties: {
            input_required: true
          },
          data_group: 1
        },
        {
          uid: 'social-security-number',
          input_type: 'text',
          label: 'Social security number',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 3
          },
          properties: {
            input_required: true
          },
          data_group: 2
        },
        {
          uid: 'phone-number',
          input_type: 'text',
          label: 'Phone number',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 4
          },
          data_group: 2
        },
        {
          uid: 'mobile-number',
          input_type: 'text',
          label: 'Mobile number',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 5
          },
          data_group: 3
        },
        {
          uid: 'email',
          input_type: 'email',
          label: 'E-mail',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 6
          },
          properties: {
            input_required: true,
            validation_pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}'
          },
          data_group: 3
        },
        {
          uid: 'postal-address',
          input_type: 'text',
          label: 'Postal address',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 7
          },
          data_group: 4
        },
        {
          uid: 'postal-code',
          input_type: 'number',
          label: 'Postal code',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 8
          },
          properties: {
            max_value: '99999',
            min_value: '0'
          },
          data_group: 4
        },
        {
          uid: 'city',
          input_type: 'text',
          label: 'City',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 9
          },
          data_group: 5
        },
        {
          uid: 'country',
          input_type: 'select',
          label: 'Country',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 10
          },
          properties: {
            options: [
              {option_value: '1', display_name: 'Germany'},
              {option_value: '2', display_name: 'Sweden'},
              {option_value: '3', display_name: 'United States'}
            ]
          },
          data_group: 5
        }
      ]
    },
    {
      id: 2,
      title: 'Invoicing',
      description: '',
      dependencies: [],
      layout: {
        layout_type: 'grid',
        columns: 2,
        title_size: 5,
        title_line_separator: 'under'
      },
      form_fields: [
        {
          uid: 'invoice-reference',
          input_type: 'text',
          label: 'Invoice reference',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 1
          },
          data_group: 6
        },
        {
          uid: 'invoice-distribution',
          input_type: 'select',
          label: 'Invoice distribution',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 2
          },
          properties: {
            options: [
              {option_value: '1', display_name: 'PDF via post'},
              {option_value: '2', display_name: 'PDF via e-mail'}
            ]
          },
          data_group: 6
        },
        {
          uid: 'invoice-a-company',
          input_type: 'checkbox',
          label: 'Invoice a company',
          layout: {
            layout_type: 'vertical',
            column: 2,
            position: 3
          },
          data_group: 6
        }
      ]
    },
    {
      id: 3,
      title: 'This is some bad hat Harry',
      description: '',
      layout: {
        layout_type: 'grid',
        columns: 2,
        title_size: 4,
        title_line_separator: 'under'
      },
      dependencies: [
        {
          dependent_form_field: {
            data_group: 6,
            uid: 'invoice-a-company'},
          required_value: 'true'
        }
      ],
      form_fields: [
        {
          uid: 'company-name',
          input_type: 'text',
          label: 'Company name',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 1
          },
          data_group: 7
        },
        {
          uid: 'registration-number',
          input_type: 'text',
          label: 'Registration no.',
          layout: {
            layout_type: 'vertical',
            column: 2,
            position: 1
          },
          data_group: 8
        },
        {
          uid: 'invoice-address',
          input_type: 'text',
          label: 'Invoice address',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 2
          },
          data_group: 9
        },
        {
          uid: 'invoice-email',
          input_type: 'text',
          label: 'Invoice e-mail',
          layout: {
            layout_type: 'vertical',
            column: 2,
            position: 2
          },
          properties: {
            input_required: true,
            validation_pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}'
          },
          data_group: 9
        },
        {
          uid: 'invoice-postal-code',
          input_type: 'number',
          label: 'Invoice postal code',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 3
          },
          properties: {
            max_value: 99999,
            min_value: 0
          },
          data_group: 10
        },
        {
          uid: 'invoice-city',
          input_type: 'text',
          label: 'Invoice city',
          layout: {
            layout_type: 'vertical',
            column: 2,
            position: 3
          },
          data_group: 10
        }
      ]
    }
  ]
}
