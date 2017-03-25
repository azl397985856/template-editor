/*  editor单元测试用例
/*  file   : editor.spec.js
/*  author : zhipenglu
/*  date   : 2017-3-3 10:57:45
/*  last   : 2017-3-3 10:58:19
*/
import { expect } from 'chai';
import { to_json as toJSON } from 'xmljson';
import { JSONToXML, XMLToJSON } from '../../src/editor/index.js';
describe('editor ------>', () => {
	it ('JSON to XML: attr only', () => {
		const items = [{
			id: '233433',
			key : 'sender',
			pos: {
				left: 33,
				height: 33,
				top: 3
			}
		}, {
			id : '666666',
			key: 'sender_province',
			pos: {
				left: 99,
				height: 33,
				top: 3
			}
		}];
		let ret;
		toJSON(JSONToXML(items), (error, data) => {
			ret = data;
		})
		console.info(ret.layout.layout)
		expect(ret)
		.to.have.property('layout')
		.to.have.property('layout')
		.to.have.property('1')
		.to.have.property('$')
		.to.have.property('left')
		.to.equal('26.19');
	})
	it ('XML to JSON: attr only', () => {
		// TODO
		return true;
	})
})
