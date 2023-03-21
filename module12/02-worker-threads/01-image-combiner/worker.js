import axios from 'axios'
import sharp from 'sharp'

async function downloadFiles(url) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  })

  return response.data
}

async function onMessage({ image, background }) {
  const firstLayer = await sharp(await downloadFiles(image)).toBuffer()

  const secondLayer = await sharp(await downloadFiles(background))
    .composite([{ input: firstLayer, gravity: sharp.gravity.south }])
    .toBuffer()

  return secondLayer.toString('base64')
}

export default onMessage
