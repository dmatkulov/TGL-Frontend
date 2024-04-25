export interface Region {
  _id: string;
  name: string;
  lang: string;
}
export interface RegionResponse {
  message: string;
  regions: Region[];
}
