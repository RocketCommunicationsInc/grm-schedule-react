import { RuxButton } from '@astrouxds/react';
import SmallReadOnlyInput from 'common/SmallReadOnlyInput/SmallReadOnlyInput';
import type { DefaultOptions } from 'Types';

import './AddContactConfirm.css';

type PropTypes = {
  values: {
    doy: number;
    equipment: any;
    ground: string;
    iron: string;
    pass: number;
    priority: string;
    mode: string;
    dirty: boolean;
  };
  options: DefaultOptions;
  handleAdd: () => void;
  setShowAddConfirm: (open: boolean) => void;
};

const datetimeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const AddContactConfirm = ({
  values,
  options,
  handleAdd,
  setShowAddConfirm,
}: PropTypes) => {
  const { iron, ground, doy } = values;
  const aos = Intl.DateTimeFormat('default', datetimeFormatOptions)
    .format(new Date(options.passes[values.pass].aos))
    .slice(0, -3);

  const los = Intl.DateTimeFormat('default', datetimeFormatOptions)
    .format(new Date(options.passes[values.pass].los))
    .slice(0, -3);

  return (
    <div className='add-contact-confirm-wrapper'>
      <p>Please confirm if you wish to add the following contact:</p>
      <SmallReadOnlyInput label='IRON' value={iron} />
      <SmallReadOnlyInput label='Ground Station' value={ground} />
      <SmallReadOnlyInput label='DOY' value={doy.toString()} />
      <SmallReadOnlyInput label='Pre Pass Start' value={aos} />
      <SmallReadOnlyInput label='AOS' value={aos} />
      <SmallReadOnlyInput label='LOS' value={los} />
      <SmallReadOnlyInput label='Post Pass Stop' value={los} />
      <div className='add-contact-confirm-buttons'>
        <RuxButton secondary onClick={() => setShowAddConfirm(false)}>
          Cancel
        </RuxButton>
        <RuxButton onClick={() => handleAdd()}>Add Contact</RuxButton>
      </div>
    </div>
  );
};

export default AddContactConfirm;
