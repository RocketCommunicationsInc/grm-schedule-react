import { useState, useEffect } from 'react';
import { RuxMonitoringIcon } from '@astrouxds/react';
import CytoscapeComponent from 'react-cytoscapejs';
import type { ElementDefinition } from 'cytoscape';
import CenterFocusWeak from '@astrouxds/astro-web-components/dist/collection/icons/center-focus-weak.svg';

import './EquipmentIcons.css';

type PropTypes = {
  equipmentString: string;
};

const EquipmentIcons = ({ equipmentString }: PropTypes) => {
  const [elements, setElements] = useState<ElementDefinition[]>([]);

  useEffect(() => {
    const cytoElements: ElementDefinition[] = [];
    const subStringArr = equipmentString.split(' ');
    subStringArr.forEach((equipmentSubString, index) => {
      cytoElements.push({
        data: { id: equipmentSubString, name: equipmentSubString },
        classes: 'node',
      });
      if (subStringArr[index - 1]) {
        cytoElements.push({
          data: {
            id: `${subStringArr[index - 1]}-${subStringArr[index]}`,
            source: subStringArr[index - 1],
            target: subStringArr[index],
          },
        });
      }
    });
    setElements(cytoElements);
  }, [equipmentString]);

  return (
    <div className='equipment-icons'>
      {/* {equipmentString.split(' ').map((equipmentSubString: string) => (
        <RuxMonitoringIcon
          key={equipmentSubString}
          status='normal'
          icon='center-focus-weak'
          label={equipmentSubString}
        />
      ))} */}
      <CytoscapeComponent
        elements={elements}
        style={{ height: '100%', width: '100%' }}
        layout={{ name: 'grid', rows: 2, cols: 4 }}
        stylesheet={[
          {
            selector: 'node',
            css: {
              label: 'data(name)',
              'text-valign': 'bottom',
              color: '#FFFFFF',
              shape: 'rectangle',
              'background-image': `url(${CenterFocusWeak})`,
            },
          },
        ]}
      />
    </div>
  );
};

export default EquipmentIcons;
