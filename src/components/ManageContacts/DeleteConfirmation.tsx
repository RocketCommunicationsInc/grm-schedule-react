import {
  RuxButton,
  RuxTable,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
} from '@astrouxds/react';
import { setHhMmSs } from 'utils/date';
import { useAppActions } from 'hooks/useAppActions';
import './DeleteConfirmation.css';

type PropTypes = {
  contact: any;
  setPendingDelete: any;
  handleClose: () => void;
};

const DeleteConfirmation = ({
  contact,
  setPendingDelete,
  handleClose,
}: PropTypes) => {
  const { deleteContact } = useAppActions();

  const handleDelete = () => {
    deleteContact(contact);
    setPendingDelete(false);
    handleClose();
  };

  const handleCancel = () => {
    setPendingDelete(false);
  };

  return (
    <>
      <RuxTable className='delete-confirmation-table'>
        <caption>
          Please confirm if you with to <strong>DELETE</strong> the following
          contact:
        </caption>
        <RuxTableBody>
          <RuxTableRow>
            <RuxTableCell>IRON</RuxTableCell>
            <RuxTableCell>{contact.contactName}</RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxTableCell>Ground Station</RuxTableCell>
            <RuxTableCell>{contact.contactGround}</RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxTableCell>DOY</RuxTableCell>
            <RuxTableCell>{contact.contactDOY}</RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxTableCell>Pre Pass Start</RuxTableCell>
            <RuxTableCell>
              {setHhMmSs(contact.contactBeginTimestamp)}
            </RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxTableCell>AOS</RuxTableCell>
            <RuxTableCell>{setHhMmSs(contact.contactAOS)}</RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxTableCell>LOS</RuxTableCell>
            <RuxTableCell>{setHhMmSs(contact.contactLOS)}</RuxTableCell>
          </RuxTableRow>
          <RuxTableRow>
            <RuxTableCell>Post Pas Stop</RuxTableCell>
            <RuxTableCell>
              {setHhMmSs(contact.contactEndTimestamp)}
            </RuxTableCell>
          </RuxTableRow>
        </RuxTableBody>
      </RuxTable>

      <footer slot='footer'>
        <RuxButton size='small' secondary onClick={handleCancel}>
          Cancel
        </RuxButton>
        <RuxButton size='small' secondary onClick={handleDelete}>
          Delete
        </RuxButton>
      </footer>
    </>
  );
};

export default DeleteConfirmation;
