import {
  RuxContainer,
  RuxDatetime,
  RuxOption,
  RuxSelect,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
  RuxTextarea,
} from '@astrouxds/react';
import EquipmentIcons from 'common/EquipmentIcons/EquipmentIcons';
import {
  RuxTextareaCustomEvent,
  RuxInputCustomEvent,
} from '@astrouxds/astro-web-components/dist/types/components';
import type { DefaultOptions } from 'Types';

type PropTypes = {
  options: DefaultOptions;
  values: any;
  setValues: (prev: any) => void;
};

const AddContactForm = ({ options, values, setValues }: PropTypes) => {
  const handleSelectPass = (i: number) => {
    setValues((prev: { pass: number }) => ({
      ...prev,
      pass: prev.pass === i ? -1 : i,
      dirty: true,
    }));
  };

  const handleSelect = (key: string, value: string | string[] | undefined) => {
    setValues((prev: number[]) => ({ ...prev, [key]: value, dirty: true }));
  };

  const handleTextArea = (
    e:
      | RuxTextareaCustomEvent<HTMLRuxTextareaElement>
      | RuxInputCustomEvent<HTMLRuxInputElement>
  ) => {
    setValues((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
      dirty: true,
    }));
  };

  return (
    <form>
      <section>
        <RuxSelect
          label='IRON'
          size='small'
          onRuxchange={(e) => handleSelect('iron', e.target.value)}
        >
          {options.irons.map((iron: any) => (
            <RuxOption key={iron} label={iron} value={iron} />
          ))}
        </RuxSelect>

        <RuxSelect
          label='Ground Station'
          size='small'
          onRuxchange={(e) => handleSelect('ground', e.target.value)}
        >
          {options.grounds.map((ground) => (
            <RuxOption key={ground} label={ground} value={ground} />
          ))}
        </RuxSelect>

        <RuxSelect
          label='Priority'
          size='small'
          onRuxchange={(e) => handleSelect('priority', e.target.value)}
        >
          {options.priorities.map((priority) => (
            <RuxOption key={priority} label={priority} value={priority} />
          ))}
        </RuxSelect>

        <label>Passes ({options.passes.length})</label>
        <div className='pass-plan-wrapper'>
          <RuxTable>
            <RuxTableHeaderRow>
              <RuxTableHeaderCell>Contact</RuxTableHeaderCell>
              <RuxTableHeaderCell>AOS</RuxTableHeaderCell>
              <RuxTableHeaderCell>LOS</RuxTableHeaderCell>
            </RuxTableHeaderRow>
            <RuxTableBody>
              {options.passes.map(({ id, aos, los }, i) => (
                <RuxTableRow
                  key={id + i}
                  className={values.pass === i ? 'selected' : undefined}
                  onClick={() => handleSelectPass(i)}
                >
                  <RuxTableCell>{id}</RuxTableCell>
                  <RuxTableCell>
                    <RuxDatetime
                      date={aos}
                      hour='2-digit'
                      minute='2-digit'
                      second='2-digit'
                    />
                  </RuxTableCell>
                  <RuxTableCell>
                    <RuxDatetime
                      date={los}
                      hour='2-digit'
                      minute='2-digit'
                      second='2-digit'
                    />
                  </RuxTableCell>
                </RuxTableRow>
              ))}
            </RuxTableBody>
          </RuxTable>
        </div>

        <div className='start-stop-time'>
          <div>Pre Pass Start:</div>
          {values.pass !== -1 && options.passes ? (
            <RuxDatetime
              date={options?.passes[values.pass].aos}
              hour='2-digit'
              minute='2-digit'
              second='2-digit'
            />
          ) : (
            <span>---</span>
          )}
        </div>
        <div className='start-stop-time'>
          <div>Post Pass Stop: </div>
          {values.pass !== -1 && options.passes ? (
            <RuxDatetime
              date={options?.passes[values.pass].los}
              hour='2-digit'
              minute='2-digit'
              second='2-digit'
            />
          ) : (
            <span>---</span>
          )}
        </div>
      </section>

      <section>
        <RuxSelect
          label='Command Mode'
          size='small'
          onRuxchange={(e) => handleSelect('mode', e.target.value)}
        >
          {options.modes.map((mode) => (
            <RuxOption key={mode} label={mode} value={mode} />
          ))}
        </RuxSelect>

        <RuxContainer className='equipment-config-container'>
          <div slot='header'>Equipment String</div>
          <RuxSelect
            label='Configuration'
            size='small'
            onRuxchange={(e) => handleSelect('equipment', e.target.value)}
          >
            {options.configs.map(({ label, value }) => (
              <RuxOption key={label} label={label} value={value} />
            ))}
          </RuxSelect>
          <p>{values.equipment}</p>

          <EquipmentIcons equipmentString={values.equipment} />
        </RuxContainer>

        <RuxTextarea
          label='Notes'
          name='details'
          onRuxinput={handleTextArea}
          value={values.details}
        />
      </section>
    </form>
  );
};

export default AddContactForm;
