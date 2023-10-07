import { entityQueryFields } from "./entity";

export async function makeGQLRequest(queryStr: string): Promise<{ data: any }> | never {

    const endpoint = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PATH}`;

    const query = JSON.stringify({ query: queryStr })
    console.log(query)
    const headers = {
        "content-type": "application/json",
        //'Content-Length': query.length.toString(),
        //'User-Agent': 'Node',
        //"Authorization": "<token>"
    };

    const options = {
        "method": "POST",
        "headers": headers,
        "body": query
    };

    const response = await fetch(endpoint, options);
    const data = await response.json();

    if (data.errors) {
        console.log("errors: ", data.errors);
        throw new Error(data.errors)
    } else {
        console.log("data: ", data);
        return data;
    }
}

export const returnKeysAndDate = (obj: any, added?: boolean): string => Object.keys(obj).map(key => idToName(key)).join(' ') + (added ? entityQueryFields : ' date_updated')
export const stringifyForGQL = (obj: any): string => JSON.stringify(obj).replace(/"([^(")"]+[^\\"]+)":/g, "$1:")
export const pluralName = (name: string): string => name.endsWith('y') ? name.slice(0, -1) + 'ies' : name + 's'
export const singularName = (name: string): string => name.endsWith('ies') ? name.slice(0, -3) + 'y' : name.slice(0, -1)
const idField = ' { id }'
export const idToName = (name: string): string => name.endsWith('_id') ? name.slice(0, -3) + idField : name.endsWith('_ids') ? pluralName(name.slice(0, -4)) + idField : name

export function mapIdArr(obj: any, propnames: string[]) {
    return {
        ...obj, ...propnames.reduce((newObj: any, key: string) => {
            const values = obj[key as keyof typeof obj];
            if (values !== undefined && values !== null) {
                if (key.endsWith('s')) {
                    newObj[singularName(key) + '_ids'] = values.map((item: { id: string }) => item.id);
                } else {
                    newObj[key + '_id'] = values.id;
                }
            }
            return newObj;
        }, {})
    }
}

export function fillDate(entity: any): any {
    if (entity.date_added) entity.date_added = new Date(entity.date_added)
    if (entity.date_deleted) entity.date_deleted = new Date(entity.date_deleted)
    if (entity.date_updated) entity.date_updated = new Date(entity.date_updated)
    if (entity.available_from) entity.available_from = new Date(entity.available_from)
    if (entity.available_to) entity.available_to = new Date(entity.available_to)
    return entity
}

export function removeNullVals(data: any) {
    return Object.keys(data).reduce((newObj: any, key) => {
        const value = data[key as keyof typeof data];
        if (value !== null) {
            newObj[key] = value;
        }
        return newObj;
    }, {});
}