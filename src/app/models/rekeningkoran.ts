import { IRekeningKoran } from "../interfaces/i-rekeningkoran";
import { IDataRekeningKoran } from "../interfaces/i-datarekeningkoran";

export class RekeningKoran implements IRekeningKoran{



    constructor(
        public id: number,
        public namaRekeningKoran: string,
        public created: number,
        public updated: number,
        public createdBy: string,
        public updatedBy: string,
        public dataRekeningKoranList: IDataRekeningKoran[],
        public done: boolean
      ) {

     
        
      }


}
