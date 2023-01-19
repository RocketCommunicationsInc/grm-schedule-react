import data from 'data/contacts.json';
import { options } from 'data/options';
import { getDayOfYear } from './date';
import { randomContacts, randomIndex, randomInt } from './random';

const setPassesId = ({ contactSatellite, contactEquipment }) => {
  return `${contactSatellite} ${contactEquipment.split(' ')[1]}`;
};

export const generateOptions = () => {
  const contacts = randomContacts(8);

  return {
    irons: Array.from({ length: 8 }, () => randomInt(60_000, 90_000)).sort(),
    grounds: options.grounds,
    priorities: options.priorities,
    doy: getDayOfYear(contacts[0].contactBeginTimestamp * 1000),
    passes: contacts.map((contact) => ({
      id: setPassesId(contact),
      aos: new Date(contact.contactBeginTimestamp * 1000).toISOString(),
      los: new Date(contact.contactEndTimestamp * 1000).toISOString(),
    })),
    modes: options.modes,
    configs: Array.from({ length: 5 }, (_, i) => ({
      label: `Config ${i + 1}`,
      value: data[randomIndex(data)].contactEquipment,
    })),
  };
};
