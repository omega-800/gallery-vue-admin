export interface CreateFileInput {
    file_type: string
    file_name: string
    file_name_orig: string
    width: number
    height: number
    width_prev: number
    height_prev: number
    size: number
}

export interface CreateVideoInput extends CreateFileInput {
    duration: number
    fps: number
    fps_prev: number
}

export interface AdditionalFileInput {
    name?: string,
    edited?: boolean,
}
export interface AdditionalImageInput extends AdditionalFileInput {
    alt?: string,
}