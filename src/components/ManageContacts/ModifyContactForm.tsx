import {
  RuxCheckbox,
  RuxContainer,
  RuxDatetime,
  RuxInput,
  RuxOption,
  RuxSelect,
} from '@astrouxds/react';
import EquipmentIcons from 'common/EquipmentIcons/EquipmentIcons';
import type { DefaulOptions } from 'Types';

type PropTypes = {
  options: DefaulOptions;
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
          {options.state.map((state) => (
            <RuxOption key={state} label={state} value={state} />
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
        <ul className='Contact-list__passes'>
          <div slot='toolbar' className='Contact-list__header'>
            <span>Contact</span>
            <span>AOS</span>
            <span>LOS</span>
          </div>
          {options.passes.map(({ id, aos, los }, i) => (
            <li
              key={id + i}
              className={values.pass === i ? 'selected' : undefined}
              onClick={() => handleSelectPass(i)}
            >
              <span>{id}</span>
              <RuxDatetime
                date={aos}
                hour='2-digit'
                minute='2-digit'
                second='2-digit'
              />
              <RuxDatetime
                date={los}
                hour='2-digit'
                minute='2-digit'
                second='2-digit'
              />
            </li>
          ))}
        </ul>

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

        <RuxContainer>
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
      </section>
    </form>
  );
};

export default ModifyContactForm;
