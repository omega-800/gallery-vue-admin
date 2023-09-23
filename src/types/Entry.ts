export interface Entry {
    id: string
    date_added: Date
    date_updated: Date
    date_deleted: Date
}

export interface NamedEntry extends Entry {
    name?: string | null
}

export interface DescEntry extends Entry {
    name: string
    description?: string | null
}

export interface UniqueNamedEntry extends Entry {
    name: string
    description?: string | null
}