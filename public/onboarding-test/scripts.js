document.addEventListener('DOMContentLoaded', () => {
    const output = document.querySelector('[data-output]');

    document.querySelector('[data-headers]').addEventListener('click', async (e) => {
        e.preventDefault();

        if (output) {
            output.innerHTML = '';
        }

        const { headers: url } = e.target.dataset;
        const response = await fetch(url, {
            mode: "cors"
        });
        const headers = await response.json();

        console.log(headers);
        if (output) {
            output.innerHTML = JSON.stringify(headers, null, 2)
        }
    })
})
