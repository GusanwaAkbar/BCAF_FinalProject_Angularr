import { S } from "@fullcalendar/core/internal-common";
import { IDataRekeningKoran } from "../interfaces/i-datarekeningkoran";
import { IDataRekeningKoranPost } from "../interfaces-post/i-data-rekening-koran-post";

export class DataRekeningKoranPost implements IDataRekeningKoranPost {

    deskripsi: string;
    nominal: number;

}
