export const preview = `http://${import.meta.env.VITE_FILE_HOST}:${import.meta.env.VITE_FILE_PORT}${import.meta.env.VITE_FILE_CROP}/`;
export const vidEnding = '.webm'
export const imgEnding = '.webp'

export const previewPathVid = (filename: string) => preview + filename + vidEnding
export const previewPath = (filename: string) => preview + filename + imgEnding
export const thumbPath = (filename: string) => preview + filename + imgEnding + '/thumbnail'