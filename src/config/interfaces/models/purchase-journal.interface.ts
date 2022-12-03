export interface purchaseJournalInterface {
    id_jp: number;
    jp_code: string;
    transaction_date: Date;
    created_date: Date;
    updated_date: Date;
    reason_update: string;
    created_by: string;
    dis_term: number;
    ed_dist_term: number;
    ed_term: number;
    id_supplier: number;
    id_customer: number;
}