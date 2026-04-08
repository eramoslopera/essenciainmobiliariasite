const { JSDOM } = require("jsdom");

async function test() {
    const response = await fetch('https://procesos.apinmo.com/portal/kyeroagencias3/1909-kyero-eCSz1ipe-facilitea.xml');
    const text = await response.text();
    const dom = new JSDOM(text, { contentType: "text/xml" });
    const xmlDoc = dom.window.document;

    const properties = [];
    const propertyNodes = xmlDoc.getElementsByTagName("property");

    console.log("Found property nodes:", propertyNodes.length);

    for (let i = 0; i < Math.min(propertyNodes.length, 2); i++) {
        const node = propertyNodes[i];

        const getTag = (tagName) => {
            const el = node.getElementsByTagName(tagName)[0];
            return el ? el.textContent || "" : "";
        };
        const id = parseInt(getTag("id"));
        if (!id) continue;
        console.log("Parsed ID:", id, getTag("town"), getTag("price"));
    }
}

test();
