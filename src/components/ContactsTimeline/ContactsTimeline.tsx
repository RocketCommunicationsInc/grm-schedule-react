import { Fragment } from 'react';
import {
  RuxButton,
  RuxRuler,
  RuxTimeline,
  RuxTimeRegion,
  RuxTrack,
} from '@astrouxds/react';

import { groupByToMap, setGroup } from 'utils/grouping';
import { useAppContext } from 'providers/AppProvider';
import { useAppActions } from 'hooks/useAppActions';
import { useTracks } from './useTracks';
import { usePlayhead } from './usePlayhead';
import './ContactsTimeline.css';
import type { Status, Actions } from 'Types';
import type { Contact } from '@astrouxds/mock-data';
type PropTypes = {
  handleAction: (action: Actions) => void;
  zoom: any;
};

const setSubLabel = (event: any) => event.equipment.split(' ')[1];

const ContactsTimeline = ({ handleAction, zoom }: PropTypes) => {
  const { setSelectedContact } = useAppActions();
  const { state } = useAppContext();
  const [tracks, setTracks] = useTracks(state.searchedRegionContacts) as any;
  const selectedId = state.selectedContact?.id;

  const handleClick = (contact: any) => {
    handleAction('details');
    setSelectedContact(contact);
  };

  return (
    <div className='timeline-wrapper'>
      <RuxTimeline
        className='Contacts-timeline'
        start={state.start.toISOString()}
        end={state.end.toISOString()}
        playhead={usePlayhead(state.start)}
        interval='hour'
        zoom={zoom}
      >
        {state.searchedRegionContacts.map(([label, events]: any) => {
          const subRegions = setGroup(groupByToMap(events, setSubLabel));
          const expanded = tracks[label];

          return (
            <Fragment key={label}>
              <RuxTrack>
                <div slot='label' className='Contacts-timeline__label'>
                  <RuxButton
                    icon={
                      expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                    }
                    iconOnly
                    borderless
                    onClick={() => setTracks(label)}
                  />
                  <p>{label}</p>
                </div>
                {!expanded &&
                  events.map(
                    (e: {
                      beginTimestamp?: any;
                      endTimestamp?: any;
                      id?: any;
                      satellite: number;
                      ground: string;
                      status?: any;
                      name?: any;
                      equipment?: string;
                    }) => {
                      const start = new Date(e.beginTimestamp);
                      const end = new Date(e.endTimestamp);

                      return (
                        <RuxTimeRegion
                          key={e.id}
                          start={start.toISOString()}
                          end={end.toISOString()}
                          status={e.status}
                          onClick={() => handleClick(e)}
                          selected={e.id === selectedId}
                        >
                          <div className='Contacts-timeline__title'>
                            {e.satellite} {e.ground} {setSubLabel(e)}
                          </div>
                        </RuxTimeRegion>
                      );
                    }
                  )}
              </RuxTrack>

              {expanded &&
                subRegions.map(([subLabel, subEvents]) => (
                  <RuxTrack key={subLabel} className='sub-track'>
                    <div slot='label' className='sub-label'>
                      {subLabel}
                    </div>
                    {subEvents.map((se: Contact) => {
                      const start = new Date(se.beginTimestamp);
                      const end = new Date(se.endTimestamp);

                      return (
                        <RuxTimeRegion
                          key={se.id}
                          start={start.toISOString()}
                          end={end.toISOString()}
                          status={se.status as Status}
                          onClick={() => handleClick(se)}
                          selected={se.id === selectedId}
                        >
                          <div className='Contacts-timeline__title'>
                            {se.name} {setSubLabel(se)}
                          </div>
                        </RuxTimeRegion>
                      );
                    })}
                  </RuxTrack>
                ))}
            </Fragment>
          );
        })}

        <RuxTrack slot='ruler'>
          <RuxRuler />
        </RuxTrack>
      </RuxTimeline>
    </div>
  );
};

export default ContactsTimeline;
