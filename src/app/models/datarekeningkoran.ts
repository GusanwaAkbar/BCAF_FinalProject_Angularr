import { IDataRekeningKoran } from "../interfaces/i-datarekeningkoran";

export class DataRekeningKoran implements IDataRekeningKoran {



    constructor(
        public id: number,
        public nominal: number,
        public deskripsi: string,
        public verifikasi: string,
        public checker1: boolean,
        public checker2: boolean,
        public created: string,
        public updated: string,
        public createdBy: string
    ) {

    }
}
