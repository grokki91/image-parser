// Generate path for downloadImages

const generatePathName = (img, index, dir) => {
    let jpeg = /@jpeg$/
    let jpg = /@jpg$/
    let copyImg = img

    if (jpeg.test(img)) {
        copyImg = img.slice(0, -5)
    } else if (jpg.test(img)) {
        copyImg = img.slice(0, -4)
    }

    const pointIndex = copyImg.lastIndexOf('.')
    const exp = copyImg.slice(pointIndex)
    const pathName = `${dir}image_${index}${exp}`

    return pathName
    
}

module.exports = generatePathName