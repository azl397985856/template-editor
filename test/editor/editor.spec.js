/*  editor单元测试用例
/*  file   : editor.spec.js
/*  author : zhipenglu
/*  date   : 2017-3-3 10:57:45
/*  last   : 2017-3-3 10:58:19
*/
import { expect } from 'chai';
import { to_json, to_xml } from 'xmljson';
import { JSONToXML, XMLToJSON} from '../../src/editor/index.js';
describe('editor ------>', () => {
	it('JSON to XML: attr only', () => {
        const items = [{
            layout: {
                $:{
                    top: 20,
                    width: 66,
                    height: 30,
                    left: 99
                }
            }
        }, {
            layout: {
                $:{
                    top: 20,
                    width: 28,
                    height: 10,
                    left: 99
                }
            }
        }];
		let ret;
        to_json(JSONToXML(items), (error, data) => {
            ret = data;
        })
		expect(ret)
        .to.have.property('layout')
        .to.have.property('layout')
        .to.have.property('1')
        .to.have.property('$')
        .to.have.property('left')
        .to.equal('99');
	})
    it('XML to JSON: attr only', () => {
        // TODO
        return true;
	})
})
