//import FormData from "form-data";

export interface IFileResult {
  url: string;
  name: string;
}

export interface IQueryFile {
  folder: string;
  file: FormData;
}
