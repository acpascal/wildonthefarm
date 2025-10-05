import { Model } from '@stackbit/types';

export const Locale: Model = {
  type: 'object',
  name: 'Locale',
  label: 'Locale',
  labelField: 'label',
  fields: [
    {
      type: 'string',
      name: 'label',
      label: 'Label',
      required: false,
      default: 'EN',
      hidden: false,
      localized: false
    },
    {
      type: 'string',
      name: 'value',
      label: 'Value',
      description: 'The value for the locale',
      required: false,
      default: 'en',
      hidden: false,
      localized: false
    }
  ]
}