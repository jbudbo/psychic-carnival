(async function (navigator, document) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }

    customElements.define('voting-category', class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById("voting-category");
            const templateContent = template.content;

            const shadowRoot = this.attachShadow({mode:"open"});
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    });

    const catResponse = await fetch('./categories.json');
    const catJson = await catResponse.json();

    const main = document.getElementsByTagName("main")[0];
    const tbl = main.getElementsByTagName("table")[0];
    const dataRow = tbl.getElementsByTagName("tbody")[0];

    for (const cat of catJson.categories){
        const cleanCat = cat.replace(" ","-");

        const catLabel = document.createElement("label");
        catLabel.htmlFor = cleanCat;
        catLabel.innerText = cat;

        const tdCat = document.createElement("td");
        tdCat.appendChild(catLabel);

        const input = document.createElement("input");
        input.type = "number";
        input.max = catJson.maxCarNumber;
        input.min = catJson.minCarNumber;
        input.name = cleanCat;
        input.id = cleanCat;

        const tdInput = document.createElement("td");
        tdInput.appendChild(input);

        const tr = document.createElement("tr");
        tr.appendChild(tdCat);
        tr.appendChild(tdInput);

        dataRow.appendChild(tr);
    }
}(window.navigator, window.document));