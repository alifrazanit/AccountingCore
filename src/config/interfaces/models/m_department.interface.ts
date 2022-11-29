export interface m_departmentCreateInterface {
    department_code: string;
    departement: string;
    id_subdepartment: number;
    is_active: 'Y' | 'N';
}

export interface m_departmentUpdateInterface{
    department_code: string;
    departement: string;
    is_active: 'Y' | 'N';
}