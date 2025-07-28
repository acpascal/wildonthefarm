import { Model } from '@stackbit/types';

export const DateRangeFormControl: Model = {
  type: 'object',
  name: 'DateRangeFormControl',
  label: 'Date Range Form Control',
  labelField: 'label',
  fields: [
    {
      type: 'string',
      name: 'name',
      label: 'Name',
      description: 'Must be unique and not contain whitespace. This is the property name that will be sent to the server with this field value.',
      required: true,
      default: 'date_range',
      hidden: false,
      localized: false
    },
    {
      type: 'string',
      name: 'label',
      label: 'Label',
      required: false,
      default: 'Date Range',
      hidden: false,
      localized: false
    },
    {
      type: 'boolean',
      name: 'hideLabel',
      label: 'Hide label',
      required: false,
      default: false,
      hidden: false,
      localized: false
    },
    {
      type: 'boolean',
      name: 'hideLabel',
      label: 'Hide label',
      required: false,
      default: false,
      hidden: false,
      localized: false
    },
    {
      type: 'boolean',
      name: 'hideFromLabel',
      label: 'Hide From label',
      required: false,
      default: false,
      hidden: false,
      localized: false
    },
    {
      type: 'boolean',
      name: 'hideToLabel',
      label: 'Hide To label',
      required: false,
      default: false,
      hidden: false,
      localized: false
    },
    {
      type: 'string',
      name: 'fromLabel',
      label: 'From text',
      required: false,
      default: 'From',
      hidden: false,
      localized: false
    },
    {
      type: 'string',
      name: 'fromPlaceholder',
      label: 'From placeholder text',
      required: false,
      default: 'From',
      hidden: false,
      localized: false
    },
    {
      type: 'string',
      name: 'toPlaceholder',
      label: 'To placeholder text',
      required: false,
      default: 'To',
      hidden: false,
      localized: false
    },
    {
      type: 'string',
      name: 'toLabel',
      label: 'To text',
      required: false,
      default: 'To',
      hidden: false,
      localized: false
    },
    {
      type: 'boolean',
      name: 'isRequired',
      label: 'Is the field required?',
      required: false,
      default: false,
      hidden: false,
      localized: false
    },
    {
      type: 'enum',
      name: 'width',
      label: 'Width',
      required: false,
      default: 'full',
      hidden: false,
      localized: false,
      options: [
        {
          label: 'Full',
          value: 'full'
        },
        {
          label: 'One half',
          value: '1/2'
        }
      ],
      group: 'styles',
      controlType: 'button-group'
    }
  ],
  fieldGroups: [
    {
      name: 'styles',
      label: 'Styles',
      icon: 'palette'
    }
  ]
};