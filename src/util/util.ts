import type { FileData, Video, Image } from "@/types/gql/response/File";

export const uuid = (): string => Date.now() + Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 12);
export function isVideo(file: FileData): file is Video {
    return file.__typename == 'Video'
}
export function isImage(file: FileData): file is Image {
    return file.__typename == 'Image'
}
export function humanFileSize(bytes: number, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

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

export function copy(to: any, from: any) {
    console.log(to, from)
    for (const key in from) {
        to[key] = from[key]
    }
}