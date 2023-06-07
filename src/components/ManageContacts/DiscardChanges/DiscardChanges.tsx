import { RuxButton } from '@astrouxds/react';

type PropTypes = {
  setVerifyDiscard: (verifyDiscard: boolean) => void;
  handleClose: () => void;
};

const DiscardChanges = ({ setVerifyDiscard, handleClose }: PropTypes) => {
  return (
    <div className='discard-changes-wrapper'>
      <div>
        <p>Unsaved changes have been detected.</p>
        <p>Do you wish to continue working or discard changes?</p>
      </div>
      <div className='discard-changes-buttons'>
        <RuxButton secondary onClick={() => setVerifyDiscard(false)}>
          Continue Working
        </RuxButton>
        <RuxButton onClick={handleClose}>Discard Changes</RuxButton>
      </div>
    </div>
  );
};

export default DiscardChanges;
