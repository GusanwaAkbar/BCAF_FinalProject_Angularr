export interface IDataRekeningKoran {
    id: number
    nominal: number
    deskripsi: String
    verifikasi: String
    checker1: Boolean
    checker2: Boolean
    created: string
    updated: string
    createdBy: string // Change the type to the appropriate one if known
}