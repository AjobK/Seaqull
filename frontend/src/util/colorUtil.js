import { sha256 } from 'js-sha256'

class ColorUtil {
    static getUniqueColorBasedOnString(inputString='none') {
        return `hsl(${~~(parseInt(sha256(inputString).substr(0, 2), 16) * 1.4)}, 40%, 60%)`;
    }
}

export default ColorUtil