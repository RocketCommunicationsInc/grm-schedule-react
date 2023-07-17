export type Status =
  | 'off'
  | 'standby'
  | 'normal'
  | 'caution'
  | 'serious'
  | 'critical';

export type Actions = 'add' | 'modify' | 'manage' | 'details' | 'filter' | '';

export type Priortiy = 'low' | 'medium' | 'high'

export type Ground = 'cts' | 'hts' | 'dgs' | 'tcs'

export type State = 'upcoming' | 'executing' | 'complete' | 'failed'