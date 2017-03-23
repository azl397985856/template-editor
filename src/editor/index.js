import { to_xml, to_json } from 'xmljson';

// usage https://github.com/ExactTarget/node-xmljson
export function XMLToJSON() {
    // TODO
}
// usage https://github.com/ExactTarget/node-xmljson
export function JSONToXML(items, pageConfig) {
    const body = items.map(item => {
        // TODO style

        // const style ={
        //     width: item.width,
        //     height: item.height // and so on 
        // }
        // var styleText = ""; // let doen't work
        // const style = item.style;
        // for(let key in style) {
        //     styleText += `${key}:${style[key]};`;
        // }
        // item.layout.$.style = undefined;

        let XML;
        to_xml(JSON.stringify({
            ...item,
            // style: styleText
        }), (error, data) => {
            // remove the surounding tag : <data></data>
            XML = data.slice(6, -7);
        })
        return XML;
    }).join(' ');
    // other params such as pageSize should
    // attach to the layout tag below before returned;
    return `<layout>${body}</layout>`
}