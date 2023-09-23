import { useFileStore } from '@/stores/files'

export async function loadFiles() {

    const endpoint = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_PATH}`;


    const query = JSON.stringify({
        query: ` {
            files {
                id
                date_added
                date_updated
                date_deleted
                name
                url
                preview_url
                file_type
                file_name
                width
                height
                __typename
            }
        }`
    })

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

    console.log("errors: ", data.errors);
    console.log("data: ", data);

    const store = useFileStore();
    store.set(data.data.files.map((file: any) => {
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
    }))

    /*
    const options = {
        hostname: import.meta.env.VITE_API_HOST,
        path: import.meta.env.VITE_API_PATH,
        port: import.meta.env.VITE_API_PORT,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': query.length,
            'User-Agent': 'Node',
        },
    };

    const req = http.request(options, (res: any) => {
        let data = '';
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', (d: any) => {
            data += d;
        });
        res.on('end', () => {
            try {
                const result = JSON.parse(data).data;
                const store = useFileStore();
                console.log(result.files)
                store.set(result.files.map((file: any) => {
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
                }))
            } catch (e) {
                console.error(e)
            }
        });
    });

    req.on('error', (error: any) => {
        console.error(error);
    });

    req.write(query);
    req.end();
    */
}