export interface createInterface{
    uom_name: string;
    description: string;
    uom_code: string;
}

export interface updateInterface{
    uom_name: string;
    description: string;
    is_active: 'N' | 'Y'
}