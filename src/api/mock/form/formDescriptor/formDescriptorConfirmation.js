export default {
  'id': 1,
  'field_sets': [
    {
      'id': 1,
      'title': 'Account activation',
      'description': 'Choose password and activate account',
      'dependencies': [],
      'layout': {
        'title_size': 1,
        'title_line_separator': '',
        'layout_type': 'grid',
        'columns': 1,
        'marker': ''
      },
      'form_fields': [
        {
          'id': 1,
          'uid': 'password',
          'input_type': 'PASSWORD',
          'label': 'New password',
          'layout': {
            'layout_type': 'vertical',
            'column': 1,
            'position': 1
          },
          'properties': {
            'default_value': '',
            'options': [],
            'accept_file_type': '',
            'max_value': null,
            'min_value': null,
            'multiple_options': null,
            'validation_pattern': '',
            'placeholder_hint': '',
            'input_readonly': null,
            'input_required': true
          },
          'data_group': 1
        },
        {
          'id': 2,
          'uid': 'password_confirm',
          'input_type': 'PASSWORD',
          'label': 'Confirm password',
          'layout': {
            'layout_type': 'vertical',
            'column': 1,
            'position': 1
          },
          'properties': null,
          'data_group': 1
        }
      ]
    }
  ]
}
