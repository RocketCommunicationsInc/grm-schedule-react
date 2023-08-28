import {
  RuxCheckbox,
  RuxContainer,
  RuxDatetime,
  RuxInput,
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
import { capitalize } from 'utils/labels';
import { addCommaToEquipString } from 'utils/utils';

type PropTypes = {
  options: DefaultOptions;
  values: any;
  setValues: (prev: any) => void;
};

const ModifyContactForm = ({ options, values, setValues }: PropTypes) => {
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
          label='Priority'
          size='small'
          onRuxchange={(e) => handleSelect('priority', e.target.value)}
        >
          {options.priorities.map((priority) => (
            <RuxOption key={priority} label={priority} value={priority} />
          ))}
        </RuxSelect>

        <RuxSelect
          label='State'
          size='small'
          onRuxchange={(e) => handleSelect('state', e.target.value)}
        >
          {options.state.map((state, i) => (
            <RuxOption
              key={i}
              label={capitalize(state) as string}
              value={state}
            />
          ))}
        </RuxSelect>

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

        <RuxInput
          onRuxinput={(e) => handleSelect('doy', e.target.value.slice(0, 3))}
          label='DOY'
          placeholder={options.doy.toString()}
          size='small'
          max='365'
          type='number'
        />

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

        <RuxSelect
          label='Command Mode'
          size='small'
          onRuxchange={(e) => handleSelect('mode', e.target.value)}
        >
          {options.modes.map((mode) => (
            <RuxOption key={mode} label={mode} value={mode} />
          ))}
        </RuxSelect>

        <span className='active-cb'>
          <label>Active</label>
          <RuxCheckbox checked />
        </span>

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
          <p>{addCommaToEquipString(values.equipment)}</p>

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

export default ModifyContactForm;
