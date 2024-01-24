export interface FormDetail {
     title: string;
     fields: Field[]
}
export interface Field {
     label: string;
     type: string;
     required?: boolean;
     options?: string[]
}
export interface FormRequest {
     title: string;
     fields: CreateField[]
}
export interface CreateField {
     label: string;
     type: string;
     required?: boolean;
     options?: string
}