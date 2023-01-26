import { RuxDatetime, RuxInput, RuxOption, RuxSelect } from '@astrouxds/react';

const ManageContactsForm = ({ options, values, setValues }) => {
  const handleSelectPass = (i) => {
    setValues((prev) => ({
      ...prev,
      pass: prev.pass === i ? -1 : i,
      dirty: true,
    }));
  };

  const handleSelect = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value, dirty: true }));
  };

  return (
    <form>
      <section>
        <h6>1. Choose a Contact to Reserve</h6>

        <RuxSelect
          label='IRON'
          size='small'
          onRuxchange={(e) => handleSelect('iron', e.target.value)}
        >
          {options.irons.map((iron) => (
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

        <RuxSelect label='DOY' disabled size='small'>
          <RuxOption label={options.doy} value={options.doy} />
        </RuxSelect>

        <div className='Contact-list'>
          <div className='Contact-list__header'>
            <span>Contact</span>
            <span>AOS</span>
            <span>LOS</span>
          </div>

          <ul className='Contact-list__passes'>
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
        </div>
      </section>

      <section>
        <h6>2. Configure Reservation Options</h6>

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
          label='Command Mode'
          size='small'
          onRuxchange={(e) => handleSelect('mode', e.target.value)}
        >
          {options.modes.map((mode) => (
            <RuxOption key={mode} label={mode} value={mode} />
          ))}
        </RuxSelect>

        <RuxSelect
          label='Equipment String'
          size='small'
          onRuxchange={(e) => handleSelect('equipment', e.target.value)}
        >
          {options.configs.map(({ label, value }) => (
            <RuxOption key={label} label={label} value={value} />
          ))}
        </RuxSelect>

        <RuxInput size='small' readonly value={values.equipment} />
      </section>
    </form>
  );
};

export default ManageContactsForm;
