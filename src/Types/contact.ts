import { ContactState, GroundStation, Priority, Status } from './commonTypes';

export type Contact = {
  _id: string;
  contactId: string;
  contactStatus: string | Status;
  contactName: number;
  contactGround: GroundStation
  contactSatellite: string;
  contactEquipment: string;
  contactState: ContactState;
  contactStep: string;
  contactDetail: string;
  contactBeginTimestamp: number;
  contactEndTimestamp: number;
  contactLatitude: number;
  contactLongitude: number;
  contactAzimuth: number;
  contactElevation: number;
  contactResolution: string;
  contactResolutionStatus: Status;
  contactPriority: Priority;
  alerts: [
    {
      errorId: string;
      errorSeverity: string;
      errorCategory: string;
      errorMessage: string;
      longMessage: string;
      errorTime: number;
      selected: boolean;
      new: boolean;
      expanded: boolean;
    }
  ];
};
