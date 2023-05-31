import { SetStateAction } from 'react';
import { RuxButton, RuxContainer } from '@astrouxds/react';

import { useAppActions } from 'hooks/useAppActions';
import './ManageContact.css';

type PropTypes = {
  action?: any;
  handleAction: (action?: SetStateAction<any>) => void;
};

const ManageContact = ({ handleAction }: PropTypes) => {
  const { resetSelectedContact } = useAppActions();

  const handleClose = () => {
    handleAction();
    resetSelectedContact();
  };

  return (
    <RuxContainer className='Manage-contact'>
      <header slot='header'>Filter</header>
      <footer slot='footer'>
        <RuxButton secondary onClick={handleClose}>
          Close
        </RuxButton>
      </footer>
    </RuxContainer>
  );
};

export default ManageContact;
