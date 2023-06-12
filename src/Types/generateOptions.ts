export type GenerateOptions = {
  iron: number | any;
  ground: string;
  priority: string;
  doy: number;
  pass: number;
  equipment: any;
  satellite: any;
  aos: string | number | Date;
  los: string | number | Date;
  mode: any;
  state: string | string[];
};

export type DefaulOptions = {
  irons: (number | number[])[];
  grounds: string[];
  priorities: string[];
  doy: number;
  pass: number;
  passes: { id: string; aos: string; los: string }[];
  modes: string[];
  configs: any[];
  state: string[];
};
