/**
 * 单位转换工具类.
 */
var Unit = {

	scale: 1,
	/**
	 * 像素转毫米
	 * @param px
	 * @returns {number}
	 */
	toMillimeter (px) {
		///96dpi  25.4mm = 96px  1PX =  0.264583333mm  1mm = 3.77952px;
		return Number((Number(px) * 0.264583333).toFixed(2)) / Unit.scale;
	},

	/**
	 * 毫米转像素
	 * @param mm
	 * @returns {number}
	 */
	toPixel (mm) {
		///96dpi  25.4mm = 96px  1PX =  0.264583333mm  1mm = 3.77952px;
		return Number((3.77952 * Number(mm)).toFixed(2)) * Unit.scale;
	},

	/**
	 * pt 转毫米
	 * @param pt
	 * @returns {number}
	 */
	ptToMillimeter (pt) {
		//磅（1/72 英寸）== (1/72 * 25.4)mm
		return Number(pt) * 1 / 72 * 25.4;
	}
};

export default Unit;
