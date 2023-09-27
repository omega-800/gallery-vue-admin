export interface Range {
    from: number,
    to: number
}

export enum UploadStatus {
    queued = "In queue",
    progress = "In progress",
    done = "Done",
    error = "Error",
}

export interface StateDetails {
    action?: string,
    status: UploadStatus,
    percent?: number
}

export interface UploadEntry {
    id: string,
    file: File,
    state: StateDetails
}

//responses

export interface UploadFileResponse {
    file_name_orig: string,
    file_name_full: string,
    file_name: string,
    size: number,
    file_type: string,
    type: string
}

export interface GeneratePreviewResponse {
    width: number,
    height: number,
    width_prev: number,
    height_prev: number,
}

export interface FileInfo extends UploadFileResponse, GeneratePreviewResponse {
}