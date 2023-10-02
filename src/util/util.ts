import type { FileData, Video, Image } from "@/types/gql/response/File";

export const uuid = (): string => Date.now() + Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 12);
export const isVideo = (file: FileData): file is Video => file.__typename == 'Video'
export const isImage = (file: FileData): file is Image => file.__typename == 'Image'
export const fullFileName = (file: FileData): string => `${file.file_name_orig}.${file.file_type}`
export const fileAlt = (file: FileData): string => file.alt || file.description || file.name || ''
export const formatDate = (date: Date): string => date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
export const formatPrice = (price: number): string => "CHF " + (Math.round(price * 100) / 100).toFixed(2)
export function humanFileSize(bytes: number, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) return bytes + ' B';

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
}

export function humanTime(seconds: number): string {
    const levels = [
        [Math.floor(seconds / 31536000), 'years'],
        [Math.floor((seconds % 31536000) / 86400), 'days'],
        [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
        [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
        [(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
    ];
    let returntext = '';

    for (let i = 0, max = levels.length; i < max; i++) {
        if (levels[i][0] === 0) continue;
        returntext += ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? levels[i][1].toString().substr(0, levels[i][1].toString().length - 1) : levels[i][1]);
    };
    return returntext.trim();
}

export function deepCopy(src: any) {
    let target: any = Array.isArray(src) ? [] : {};
    for (let prop in src) {
        let value = src[prop];
        if (value && value instanceof Date) {
            target[prop] = new Date(value.getTime());
        } else if (value && typeof value === 'object') {
            target[prop] = deepCopy(value);
        } else {
            target[prop] = value;
        }
    }
    return target;
}
export const isValid = (initial: any, current?: any) => isNotEmpty(current) && isNotInitial(initial, current)
export const isNotEmpty = (value: any) => (value.length > 0 || typeof value == 'boolean' || typeof value == 'number' || value instanceof Date)
export const isNotInitial = (initial: any, current?: any) => initial.toString() != current.toString()