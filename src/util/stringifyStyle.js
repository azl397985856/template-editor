export function stringifyStyle(style) {
    // const style ={
    //     width: item.width,
    //     height: item.height // and so on 
    // }
    var styleText = ""; // let doen't work
    for(let key in style) {
        styleText += `${key}:${style[key]};`;
    }
    return styleText;
}