document.addEventListener('DOMContentLoaded', () => {
    const output = document.querySelector('[data-output]');

    document.querySelector('[data-headers]').addEventListener('click', async (e) => {
        e.preventDefault();

        if (output) {
            output.innerHTML = '';
        }

        const { headers: url } = e.target.dataset;
        const response = await fetch(url, {
            mode: 'cors',
        });
        const headers = await response.json();

        console.log(headers);
        if (output) {
            output.innerHTML = JSON.stringify(headers, null, 2);
        }
    });

    document.querySelector('[data-graphql-query]').addEventListener('click', async (e) => {
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

        const { graphqlQuery: url } = e.target.dataset;

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`,
            },
            body: JSON.stringify({
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

    document.querySelector('[data-graphql-mutation]').addEventListener('click', async (e) => {
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

        const { graphqlMutation: url } = e.target.dataset;

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`,
            },
            body: JSON.stringify({
                query: `
                    mutation createProperty($type: String) {
                        createProperty(
                            type: $type, 
                            prefilled: false, 
                            rooms: 1.5, 
                            livingSpace: 2, 
                            constructionYear: 2024, 
                            address: { 
                                street: "Technoparkstrasse", 
                                streetNumber: "1", 
                                zip: "8005", 
                                city: "Zürich", 
                                country: "Switzerland"
                            }
                        ) {
                            id
                        }
                    }`,
                variables: {
                    type: 'home',
                },
            }),
        });
        const id = await response.json();

        console.log(id);
        if (output) {
            output.innerHTML = JSON.stringify(id, null, 2);
        }
    });
});
