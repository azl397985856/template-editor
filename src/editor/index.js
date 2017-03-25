import { to_xml as toXML, to_json as toJSON } from 'xmljson';

import { toMillimeter } from '../util/unit';
import { stringifyStyle, parseStyle } from '../util/style';
import { unescape } from '../util/str';

// usage https://github.com/ExactTarget/node-xmljson
export function XMLToJSON (xml) {
	let template;

	toJSON(xml, (error, data) => {
		if (error) {
			console.error('XMLToJSON(xml): parsing error', error);
		} else {
			template = data;
		}
	})
	if (!template) return [];
	const page = template.layout;
	const items = page.layout;
	const printItems = [];

	// 生成print-items
	// more filed to be translated
	// see http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpmlSpec.html#chapter3
	for (const key in items) {
		const ret = {};
		const item = items[key];
		ret.id = item.$.id;
		ret.pos = item.$;
		// style : fontFamily fontWeight and so on
		ret.style = parseStyle(item.text.$.style);
		ret.title = item.text.$['editor:_printName_'];
		// key: filed which to be replaced when printed
		ret.key = item.text._.match(/\..*%/)[0].slice(1, -1);
		printItems.push(ret);
	}
	return printItems;
}
// usage https://github.com/ExactTarget/node-xmljson
export function JSONToXML (items, pageConfig = {
	top: '0',
	width: '180',
	left: '0',
	height: '60',
	style: ''
}) {
		// more filed to be translated
		// see http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpmlSpec.html#chapter3
	const parsedItems = items.map(item => {
		const ret = {};
		const { top, left, width, height } = item.pos || {};
		if (!item.id) return ret;
		ret.layout = {};
		ret.layout.$ = {};
		ret.layout.text = {};
		ret.layout.text._ = `<![CDATA[<%=_data.${item.key}%>]]>`;
		ret.layout.text.$ = {};
		ret.layout.text.$.style = stringifyStyle(item.style || {});
		ret.layout.$ = {
			width: toMillimeter(width),
			height: toMillimeter(height),
			left: toMillimeter(left),
			top: toMillimeter(top)
		};
		return ret;
	})
	const body = unescape(parsedItems.map(item => {
		let XML;
		toXML(JSON.stringify({
			...item
		}), (error, data) => {
			if (error) {
				console.error(error);
			} else {
				// remove the surounding tag : <data></data>
				XML = data.slice(6, -7);
			}
		});
		return XML;
	}).join(' ')
	);
	const scale = window.devicePixelRatio;
	const { top, left, width, height, style } = pageConfig;
	const baseLayout = `<?xml version="1.0" encoding="UTF-8"?>
        <layout
            xmlns="http://cloudprint.cainiao.com/print"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://cloudprint.cainiao.com/print http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpml_schema.xsd"
			xmlns:editor="http://cloudprint.cainiao.com/schema/editor"
            top="${toMillimeter(top, scale)}"
            left="${toMillimeter(left, scale)}"
            width="${toMillimeter(width, scale)}"
            height="${toMillimeter(height, scale)}"
            style="${style}"
        >
    `
	return `${baseLayout}${body}</layout>`
}
