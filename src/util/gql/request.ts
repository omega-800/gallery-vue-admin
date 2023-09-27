export const entityQueryFields = `
id
date_added
date_updated
date_deleted
`

export async function makeGQLRequest(queryStr: string): Promise<{ data: any }> | never {

    const endpoint = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PATH}`;

    const query = JSON.stringify({ query: queryStr })

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

    console.log(query)

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

export const stringifyForGQL = (obj: any): string => JSON.stringify(obj).replace(/"([^(")"]+[^\\"]+)":/g, "$1:")
export const mapIdArr = (obj: any, propname: string) => ({ ...obj, [`${propname}_ids`]: obj[`${pluralName(propname)}`].map((item: { id: string }) => item.id) })
export const pluralName = (name: string): string => name.endsWith('y') ? name.slice(0, -1) + 'ies' : name + 's'

export function fillDate(file: any): any {
    if (file.date_added) {
        file.date_added = new Date(file.date_added)
    }
    if (file.date_deleted) {
        file.date_deleted = new Date(file.date_deleted)
    }
    if (file.date_updated) {
        file.date_updated = new Date(file.date_updated)
    }
    return file
}