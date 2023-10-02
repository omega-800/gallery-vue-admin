export interface Entry {
    id: string
    date_added: Date
    date_updated: Date
    date_deleted?: Date
    entity_type: string
    favorite: boolean
}

export interface UniqueNamedEntry extends Entry {
    name: string
    description?: string
    color?: `#${string | number}`
}

export interface DescEntry extends Entry {
    name: string
    description?: string
}
