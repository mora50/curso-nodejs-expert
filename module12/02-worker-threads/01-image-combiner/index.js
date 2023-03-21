import { createServer } from 'http'
import { fileURLToPath, parse } from 'url'
import { dirname } from 'path'
import Piscina from 'piscina'

const currentFolder = dirname(fileURLToPath(import.meta.url))

const workerFileName = 'worker.js'

async function joinImages(images) {
  const piscina = new Piscina({
    filename: `${currentFolder}/${workerFileName}`,
  })

  console.log(piscina.threads.length)

  return await piscina.run(images)
}

const handler = async (req, res) => {
  if (req.url.includes('joinImages')) {
    const {
      query: { background, img },
    } = parse(req.url, true)

    const response = await joinImages({
      image: img,
      background,
    })

    res.writeHead(200, {
      'Content-Type': 'text/html',
    })

    res.end(
      `<img style="width: 100wd; height: 100vh;" src="data:image/jpeg;base64,${response}" />`
    )
    return
  }

  return res.end('ok')
}

createServer(handler).listen(3000, () => console.log('running at 3000 port'))
