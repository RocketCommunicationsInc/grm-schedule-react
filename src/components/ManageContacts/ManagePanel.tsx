import { RuxButton, RuxIcon } from '@astrouxds/react';
import { useAppActions } from 'hooks/useAppActions';
import './ManagePanel.css';
import { SetStateAction } from 'react';

type PropTypes = {
  handleAction: (action?: SetStateAction<any>) => void;
};

const ManagePanel = ({ handleAction }: PropTypes) => {
  const { resetSelectedContact } = useAppActions();

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  return (
    <div className='manage-panel'>
      <div className='button-row' onClick={() => handleAction('add')}>
        Add Contact
        <RuxIcon icon='arrow-right' size='small' />
      </div>
      <div className='button-row' onClick={() => handleAction('filter')}>
        Filter Contacts
        <RuxIcon icon='arrow-right' size='small' />
      </div>
      <footer slot='footer' className='manage-panel-footer'>
        <RuxButton secondary onClick={handleClose}>
          Close
        </RuxButton>
      </footer>
    </div>
  );
};

export default ManagePanel;
