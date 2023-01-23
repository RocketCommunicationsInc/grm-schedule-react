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
import { useTracks } from './useTracks';
import { usePlayhead } from './usePlayhead';
import './ContactsTimeline.scss';

const setSubLabel = (event) => event.contactEquipment.split(' ')[1];

const ContactsTimeline = ({ handleDetails, zoom }) => {
  const { state } = useAppContext();
  const [tracks, setTracks] = useTracks(state.regions);

  return (
    <RuxTimeline
      className='Contacts-timeline'
      start={state.start.toISOString()}
      end={state.end.toISOString()}
      playhead={usePlayhead(state.start)}
      interval='hour'
      zoom={zoom}
    >
      {state.regions.map(([label, events]) => {
        const subRegions = setGroup(groupByToMap(events, setSubLabel));
        const expanded = tracks[label];

        return (
          <Fragment key={label}>
            <RuxTrack>
              <div slot='label' className='Contacts-timeline__label'>
                <RuxButton
                  icon={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  iconOnly
                  borderless
                  onClick={() => setTracks(label)}
                />
                <p>{label}</p>
              </div>
              {!expanded &&
                events.map((e) => {
                  const start = new Date(e.contactBeginTimestamp * 1000);
                  const end = new Date(e.contactEndTimestamp * 1000);

                  return (
                    <RuxTimeRegion
                      key={e.contactId}
                      start={start.toISOString()}
                      end={end.toISOString()}
                      status={e.contactStatus}
                      onClick={handleDetails}
                    >
                      <div className='Contacts-timeline__title'>
                        {e.contactSatellite} {setSubLabel(e)}
                      </div>
                    </RuxTimeRegion>
                  );
                })}
            </RuxTrack>

            {expanded &&
              subRegions.map(([subLabel, subEvents]) => (
                <RuxTrack key={subLabel} className='sub-track'>
                  <div slot='label' className='sub-label'>
                    {subLabel}
                  </div>
                  {subEvents.map((se) => {
                    const start = new Date(se.contactBeginTimestamp * 1000);
                    const end = new Date(se.contactEndTimestamp * 1000);

                    return (
                      <RuxTimeRegion
                        key={se.contactId}
                        start={start.toISOString()}
                        end={end.toISOString()}
                        status={se.contactStatus}
                        onClick={handleDetails}
                      >
                        <div className='Contacts-timeline__title'>
                          {se.contactSatellite} {setSubLabel(se)}
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
  );
};

export default ContactsTimeline;
