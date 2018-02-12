export default {
  id: 3,
  field_sets: [
    {
      id: 10,
      title: 'CEX Checklist',
      description: 'This serves as description on how to operate on this checklist.',
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 4,
        title_line_separator: 'under'
      },
      form_fields: [
        {
          id: 31,
          uid: 'checklist-item-1',
          input_type: 'radio',
          label: 'Customer Information',
          layout: {
            layout_type: 'horizontal',
            position: 1
          },
          properties: {
            input_required: true,
            options: [
              {option_value: '1', display_name: 'Accept'},
              {option_value: '2', display_name: 'Reject'}
            ]
          }
        }
      ]
    },
    {
      id: 11,
      title: '',
      description: '',
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 4,
        title_line_separator: ''
      },
      dependencies: [
        {
          dependent_form_field: 31,
          required_value: '1'
        }
      ],
      form_fields: [
        {
          id: 32,
          uid: 'checklist-item-1-comment',
          input_type: 'text',
          label: 'Comment',
          layout: {
            layout_type: 'horizontal',
            position: 1
          }
        }
      ]
    },
    {
      id: 12,
      title: '',
      description: '',
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 4,
        title_line_separator: ''
      },
      dependencies: [
        {
          dependent_form_field: 31,
          required_value: '2'
        }
      ],
      form_fields: [
        {
          id: 33,
          uid: 'checklist-item-1-comment',
          input_type: 'text',
          label: 'Comment',
          layout: {
            layout_type: 'horizontal',
            position: 1
          },
          properties: {
            input_required: true
          }
        }
      ]
    },
    {
      id: 13,
      title: '',
      description: '',
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 4,
        title_line_separator: ''
      },
      form_fields: [
        {
          id: 34,
          uid: 'checklist-item-2',
          input_type: 'radio',
          label: 'Certificate Information',
          layout: {
            layout_type: 'horizontal',
            position: 1
          },
          properties: {
            input_required: true,
            options: [
              {option_value: '1', display_name: 'Accept'},
              {option_value: '2', display_name: 'Reject'}
            ]
          }
        }
      ]
    },
    {
      id: 14,
      title: '',
      description: '',
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 4,
        title_line_separator: ''
      },
      dependencies: [
        {
          dependent_form_field: 34,
          required_value: '1'
        }
      ],
      form_fields: [
        {
          id: 35,
          uid: 'checklist-item-2-comment',
          input_type: 'text',
          label: 'Comment',
          layout: {
            layout_type: 'horizontal',
            position: 1
          }
        }
      ]
    },
    {
      id: 15,
      title: '',
      description: '',
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 4,
        title_line_separator: ''
      },
      dependencies: [
        {
          dependent_form_field: 34,
          required_value: '2'
        }
      ],
      form_fields: [
        {
          id: 36,
          uid: 'checklist-item-2-comment',
          input_type: 'text',
          label: 'Comment',
          layout: {
            layout_type: 'horizontal',
            position: 1
          },
          properties: {
            input_required: true
          }
        }
      ]
    }
  ]
}
