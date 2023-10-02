export enum FieldType {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    color = 'color',
    entity = 'entity',
    entities = 'entities'
}

export interface FormField {
    name: string,
    value: any,
    nullable?: boolean,
    unique?: boolean,
    dependsOn?: string
}

export interface FormFields {
    [key: string]: FormField
}