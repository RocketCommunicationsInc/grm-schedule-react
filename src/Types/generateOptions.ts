export type GenerateOptions = {
  iron: number[];
  ground: string;
  priority: string;
  doy: number;
  pass: number;
  equipment: any;
  satellite: any;
  aos: string | number | Date;
  los: string | number | Date;
  mode: any;
};

export type DefaulOptions = {
  irons: number[];
  grounds: string;
  priorities:string;
  doy: number;
  pass: string;
  passes?: { id: string; aos: string; los: string }[];
  modes: string;
  configs: any;
};
