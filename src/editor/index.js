import { to_xml, to_json } from 'xmljson';
import Unit from '../util/unit';

// usage https://github.com/ExactTarget/node-xmljson
export function XMLToJSON() {
    // TODO
}
// usage https://github.com/ExactTarget/node-xmljson
export function JSONToXML(items, pageConfig = {
    top: "0",
    width: "180",
    left: "0",
    height: "60",
    style: ""
}) {
    const body = items.map(item => {
        // TODO style

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
    Unit.scale = window.devicePixelRatio;
    const { toMillimeter } = Unit;
    const baseLayout =`<?xml version="1.0" encoding="UTF-8"?>
        <layout
            xmlns="http://cloudprint.cainiao.com/print"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://cloudprint.cainiao.com/print http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpml_schema.xsd"
			xmlns:editor="http://cloudprint.cainiao.com/schema/editor"
            top="${toMillimeter(pageConfig.top)}"
            left="${toMillimeter(pageConfig.left)}"
            width="${toMillimeter(pageConfig.width)}"
            height="${toMillimeter(pageConfig.height)}"
            style="${pageConfig.style}"
        >
    `
    return `${baseLayout}${body}</layout>`
}