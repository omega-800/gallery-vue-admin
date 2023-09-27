export enum FieldType {
    string = 'string',
    number = 'number',
    boolean = 'boolean'
}

export interface FormField {
    name: string,
    type: FieldType,
    value: any,
    default?: any,
    nullable?: boolean,
}