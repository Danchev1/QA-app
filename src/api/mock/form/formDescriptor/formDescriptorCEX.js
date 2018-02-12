export default {
  id: 2,
  field_sets: [
    {
      id: 4,
      title: 'Certification information',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 4,
        title_line_separator: 'under'
      },
      form_fields: [
        {
          uid: 'choose-level',
          input_type: 'radio',
          label: 'Choose level',
          layout: {
            layout_type: 'horizontal',
            position: 1
          },
          properties: {
            options: [
              {option_value: '1', display_name: 'N (normal)'},
              {option_value: '2', display_name: 'K (qualified)'}
            ]
          },
          data_group: 1
        }
      ]
    },
    {
      id: 5,
      description: 'In order to make a fair judgement we meed the following verified information. You can either upload documents that verifies this now or wait till later.',
      layout: {
        layout_type: 'list',
        marker: 'disc',
        title_size: 1,
        title_line_separator: ''
      },
      form_fields: [
        {
          uid: 'technical-knowledge',
          input_type: 'file',
          label: 'Technical knowledge',
          layout: {
            layout_type: 'horizontal',
            position: 1
          },
          properties: {
            accept_file_type: '.pdf,.csv,.txt,.xls,.xlsx,.doc,.docx'
          },
          data_group: 1
        },
        {
          uid: 'experience',
          input_type: 'file',
          label: 'Experience',
          layout: {
            layout_type: 'horizontal',
            position: 2
          },
          properties: {
            accept_file_type: '.pdf,.csv,.txt,.xls,.xlsx,.doc,.docx'
          },
          data_group: 1
        },
        {
          uid: 'qualification',
          input_type: 'file',
          label: 'Qualification',
          layout: {
            layout_type: 'horizontal',
            position: 3
          },
          properties: {
            accept_file_type: '.pdf,.csv,.txt,.xls,.xlsx,.doc,.docx'
          },
          data_group: 1
        }
      ]
    },
    {
      id: 6,
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 1,
        title_line_separator: ''
      },
      form_fields: [
        {
          uid: 'exam',
          input_type: 'radio',
          label: 'Exam',
          layout: {
            layout_type: 'vertical',
            position: 1
          },
          properties: {
            options: [
              {option_value: '1', display_name: 'I have taken exam with Veridens'},
              {option_value: '2', display_name: 'I have taken exam with other examiner'},
              {option_value: '3', display_name: 'I want to book exam'},
              {option_value: '4', display_name: 'I decide later'}
            ]
          },
          data_group: 1
        }
      ]
    },
    {
      id: 7,
      layout: {
        layout_type: 'grid',
        columns: 2,
        title_size: 1,
        title_line_separator: ''
      },
      dependencies: [
        {
          dependent_form_field: {
            data_group: 1,
            uid: 'exam'
          },
          required_value: '1'
        }
      ],
      form_fields: [
        {
          uid: 'date-of-exam',
          input_type: 'date',
          label: 'Date of exam',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 1
          },
          properties: {
            max_value: '2017-07-20',
            min_value: '1960-01-01'
          },
          data_group: 1
        }
      ]
    },
    {
      id: 8,
      layout: {
        layout_type: 'grid',
        columns: 2,
        title_size: 1,
        title_line_separator: ''
      },
      dependencies: [
        {
          dependent_form_field: {
            data_group: 1,
            uid: 'exam'
          },
          required_value: '2'
        }
      ],
      form_fields: [
        {
          uid: 'examiner',
          input_type: 'text',
          label: 'Examiner',
          layout: {
            layout_type: 'vertical',
            column: 1,
            position: 1
          },
          data_group: 1
        },
        {
          uid: 'date-of-exam2',
          input_type: 'date',
          label: 'Date of exam',
          layout: {
            layout_type: 'vertical',
            column: 2,
            position: 1
          },
          data_group: 1
        }
      ]
    },
    {
      id: 9,
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 1,
        title_line_separator: ''
      },
      dependencies: [
        {
          dependent_form_field: {
            data_group: 1,
            uid: 'exam'
          },
          required_value: '3'
        }
      ],
      form_fields: [
        {
          uid: 'choose-examination-day',
          input_type: 'radio',
          label: 'Choose examination day',
          layout: {
            layout_type: 'vertical',
            position: 1
          },
          properties: {
            options: [
              {option_value: '1', display_name: 'Karlskrona 2017-06-25'},
              {option_value: '2', display_name: 'Karlskrona 2017-06-30'},
              {option_value: '3', display_name: 'Ronneby 2017-07-02'},
              {option_value: '4', display_name: 'Lund 2017-07-10'}
            ]
          },
          data_group: 1
        }
      ]
    },
    {
      id: 10,
      layout: {
        layout_type: 'list',
        marker: 'none',
        title_size: 1,
        title_line_separator: ''
      },
      form_fields: [
        {
          uid: 'accept-agreements',
          input_type: 'checkbox',
          label: 'I agree on Veridenss terms',
          layout: {
            layout_type: 'horizontal',
            position: 1
          },
          properties: {
            input_required: true
          },
          data_group: 1
        },
        {
          uid: 'add-boverket',
          input_type: 'checkbox',
          label: 'I want to be listed on Boverket',
          layout: {
            layout_type: 'horizontal',
            position: 2
          },
          data_group: 1
        }
      ]
    }
  ]
}
