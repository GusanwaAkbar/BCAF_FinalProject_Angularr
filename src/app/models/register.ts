import { IRegister } from "../interfaces/i-register";

export class Register implements IRegister {

    constructor(
        public username: string,
        public email: string,
        public noHp: string,
        public tanggalLahir: string,
        public password: string,
        public alamat: string,
        public namaLengkap: string
    ) {}

    
}
