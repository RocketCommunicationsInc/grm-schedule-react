import { Fragment } from 'react';
import { RuxMonitoringIcon, RuxIcon } from '@astrouxds/react';

import './EquipmentIcons.css';

type PropTypes = {
  equipmentString: string;
};

const EquipmentIcons = ({ equipmentString }: PropTypes) => {
  return (
    <div className='equipment-icons'>
      {equipmentString
        .split(' ')
        .map((equipmentSubString: string, index: number) => (
          <Fragment key={equipmentSubString}>
            {index !== 0 && <RuxIcon icon='arrow-right-alt' />}
            <RuxMonitoringIcon
              status='normal'
              icon='center-focus-weak'
              label={equipmentSubString}
            />
          </Fragment>
        ))}
    </div>
  );
};

export default EquipmentIcons;
