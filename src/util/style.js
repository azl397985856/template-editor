export function stringifyStyle (style) {
	var styleText = ''; // let doen't work
	for (const key in style) {
		styleText += `${key}:${style[key]};`;
	}
	return styleText;
}
export function parseStyle (styleText) {
	const style = {};
	styleText.split(';').forEach(q => {
		const key = q.split(':')[0];
		const value = q.split(':')[1];
		style[key] = value;
	})
	return style;
}
