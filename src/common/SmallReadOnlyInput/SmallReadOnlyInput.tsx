import { RuxInput } from '@astrouxds/react';

type PropTypes = {
  label?: string;
  value: string;
};

const SmallReadOnlyInput = ({ label, value }: PropTypes) => (
  <RuxInput label={label} readonly value={value} size='small' />
);

export default SmallReadOnlyInput;
