import { to_xml as toXML, to_json as toJSON } from 'xmljson';
import { toMillimeter } from '../util/unit';

// usage https://github.com/ExactTarget/node-xmljson
export function XMLToJSON (xml) {
	let json;
	toJSON(xml, (error, data) => {
		if (error) {
			console.error(error);
			return {};
		}
		json = data;
	})
	return json;
}
// usage https://github.com/ExactTarget/node-xmljson
export function JSONToXML (items, pageConfig = {
	top: '0',
	width: '180',
	left: '0',
	height: '60',
	style: ''
}) {
	const body = items.map(item => {
		let XML;
		toXML(JSON.stringify({
			...item
		// style: styleText
		}), (error, data) => {
			if (error) console.rerror(error);
			// remove the surounding tag : <data></data>
			XML = data.slice(6, -7);
		})
		return XML;
	}).join(' ');
	const scale = window.devicePixelRatio;
	const baseLayout = `<?xml version="1.0" encoding="UTF-8"?>
        <layout
            xmlns="http://cloudprint.cainiao.com/print"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://cloudprint.cainiao.com/print http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpml_schema.xsd"
			xmlns:editor="http://cloudprint.cainiao.com/schema/editor"
            top="${toMillimeter(pageConfig.top, scale)}"
            left="${toMillimeter(pageConfig.left, scale)}"
            width="${toMillimeter(pageConfig.width, scale)}"
            height="${toMillimeter(pageConfig.height, scale)}"
            style="${pageConfig.style}"
        >
    `
	return `${baseLayout}${body}</layout>`
}
