export type Status =
  | 'off'
  | 'standby'
  | 'normal'
  | 'caution'
  | 'serious'
  | 'critical';

  export type Priority = "Low" | "Medium" | "High"

  export type GroundStation = "CTS" | "GTS" | "TCS" | "VTS" | "DGS" | "NHS"

  export type ContactState = "Upcoming" | "Executing" | "Complete" | "Failed"