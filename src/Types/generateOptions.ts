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
  state: any;
  details: string;
};

export type DefaultOptions = {
  irons: (number | number[])[];
  grounds: string[];
  priorities: string[];
  doy: number;
  pass: number;
  passes: { id: string; aos: string; los: string }[];
  modes: string[];
  configs: any[];
  state: string[];
  details: string[];
};
