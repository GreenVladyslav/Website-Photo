const postData = async(url, data) => {

    let res = await fetch(url, {
        method: 'POST',
        body: data
    });

    return await res.text();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could nor fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResource};
