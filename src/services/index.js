
const mockTemplate = `<?xml version="1.0" encoding="UTF-8"?>
		<layout  id="CUSTOM_AREA"
			
			xmlns="http://cloudprint.cainiao.com/print"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://cloudprint.cainiao.com/print http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpml_schema.xsd"
			xmlns:editor="http://cloudprint.cainiao.com/schema/editor"
			  top="140" width="100" height="40"  style="zIndex:1;overflow:hidden;">
				
		<layout  id="element_layout_6DEE830A63CB864D"
			
			 left="5" top="5" width="90" height="6" editor:_for_="element_text_EFAD21DE69AD5F72" style="zIndex:2;overflow:visible;">
				
		<text
			editor:component="65203"
			editor:_printName_="寄件人_省"
			style="fontFamily:Microsoft YaHei;fontSize:20"
		>
		<![CDATA[<%=_data.sender_province%>]]>
		</text>
		</layout>
		<layout  id="element_layout_6DEE830A63CB854D"
			
			 left="55" top="45" width="190" height="6" editor:_for_="element_text_EFAD21DE69AD5F72" style="zIndex:2;overflow:visible;">
				
		<text
			editor:component="65203"
			editor:_printName_="寄件人"
			style="fontFamily:Monospace;fontWeight:bold;"
		>
		<![CDATA[<%=_data.sender%>]]>
		</text>
		</layout>
		</layout>
`
module.exports = {
	getTemplate: (url) => {
		return mockTemplate;
	},
	postTemplate: (url, data) => {
		return null;
	}
}
