document.addEventListener('DOMContentLoaded', () => {
    const output = document.querySelector('[data-output]');

    document.querySelector('[data-headers]').addEventListener('click', async (e) => {
        e.preventDefault();

        if (output) {
            output.innerHTML = '';
        }

        const {headers: url} = e.target.dataset;
        const response = await fetch(url, {
            mode: 'cors',
        });
        const headers = await response.json();

        console.log(headers);
        if (output) {
            output.innerHTML = JSON.stringify(headers, null, 2);
        }
    });

    document.querySelector('[data-graphql]').addEventListener('click', async (e) => {
        e.preventDefault();

        const tokenElement = document.querySelector('[data-token]');
        const token = tokenElement ? tokenElement.value : null;
        if (!token) {
            console.warn('No token found');
            return;
        }

        if (output) {
            output.innerHTML = '';
        }

        const {graphql: url} = e.target.dataset;

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`,
            },
            body: JSON.stringify({
                operationName: 'AggregateOneList',
                query: `query AggregateOneList { aggregateone: AggregateOneView {id name } }`,
                variables: {},
            }),
        });
        const aggregates = await response.json();

        console.log(aggregates);
        if (output) {
            output.innerHTML = JSON.stringify(aggregates, null, 2);
        }
    });
});
