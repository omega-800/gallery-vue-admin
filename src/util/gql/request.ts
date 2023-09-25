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