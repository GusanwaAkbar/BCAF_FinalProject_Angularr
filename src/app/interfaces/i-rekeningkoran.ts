import { IDataRekeningKoran } from "./i-datarekeningkoran";

export interface IRekeningKoran {


    id: number;
    namaRekeningKoran: string;
    created: number;
    updated: number;
    createdBy: string;
    updatedBy: string;
    dataRekeningKoranList: IDataRekeningKoran[]; // You can replace 'any[]' with the appropriate type if you have the structure defined for this array
    done: boolean;
   
  
}



