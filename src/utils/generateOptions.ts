import data from 'data/contacts.json';
import { options } from 'data/options';
import { getDayOfYear } from './date';
import { randomContacts, randomIndex, randomInt } from './random';
import { GenerateOptions } from 'Types';

export const setPassesId = ({ contactSatellite, contactEquipment }: any) => {
  return `${contactSatellite} ${contactEquipment.split(' ')[1]}`;
};

const unique = (arr: any[]) => [...new Set(arr)];

export const generateOptions = (modifyOptions: GenerateOptions) => {
  const contacts = randomContacts(8);

  const irons = Array.from({ length: 8 }, () => randomInt(60_000, 90_000));

  const configs = Array.from({ length: 5 }, (_, i) => ({
    label: `Config ${i + 1}`,
    value: data[randomIndex(data)].contactEquipment,
  }));

  const passes = contacts.map((contact) => ({
    id: setPassesId(contact),
    aos: new Date(contact.contactBeginTimestamp * 1000).toISOString(),
    los: new Date(contact.contactEndTimestamp * 1000).toISOString(),
  }));

  return {
    irons: modifyOptions
      ? [modifyOptions.iron, ...irons.slice(1).sort()]
      : irons.sort(),
    grounds: modifyOptions
      ? unique([modifyOptions.ground, ...options.grounds])
      : options.grounds,
    priorities: modifyOptions
      ? unique([modifyOptions.priority, ...options.priorities])
      : options.priorities,
    doy:
      modifyOptions?.doy ||
      getDayOfYear(contacts[0].contactBeginTimestamp * 1000),
    pass: modifyOptions?.pass === 0 ? 0 : -1,
    passes: modifyOptions
      ? [
          {
            id: setPassesId({
              contactEquipment: modifyOptions.equipment,
              contactSatellite: modifyOptions.satellite,
            }),
            aos: new Date(modifyOptions.aos).toISOString(),
            los: new Date(modifyOptions.los).toISOString(),
          },
          ...passes.slice(1),
        ]
      : passes,
    modes: modifyOptions
      ? unique([modifyOptions.mode, ...options.modes])
      : options.modes,
    configs: modifyOptions
      ? [
          { label: 'Config 1', value: modifyOptions.equipment },
          ...configs.slice(1),
        ]
      : configs,
    state: modifyOptions
      ? unique([modifyOptions.state, ...options.state])
      : options.state,
    details: [modifyOptions.details],
  };
};
