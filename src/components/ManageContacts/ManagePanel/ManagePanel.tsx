import { RuxButton, RuxContainer, RuxIcon } from '@astrouxds/react';
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
    <RuxContainer className='manage-panel'>
      <div onClick={() => handleAction('add')}>
        Add Contact
        <RuxIcon icon='arrow-right' size='small' />
      </div>
      <div onClick={() => handleAction('filter')}>
        Filter Contacts
        <RuxIcon icon='arrow-right' size='small' />
      </div>
      <footer slot='footer'>
        <RuxButton size='small' secondary onClick={handleClose}>
          Close
        </RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ManagePanel;
