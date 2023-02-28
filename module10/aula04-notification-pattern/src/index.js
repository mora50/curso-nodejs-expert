import { createServer } from 'http'
import HeroEntity from './heroEntity.js'
import { statusCodes } from './util/httpStatusCodes.js'



async function handler(request, response) {
    for await (const data of request) {
        try {
            const parsedData = JSON.parse(data)
            // simulando um outro erro, por exemplo de banco de dados
            if (Reflect.has(parsedData, "connectionError")) {
                // só um erro generico para trazer outro cenário de erro inexperado
                throw new Error("error connecting to DB!")
            }
            const hero = new HeroEntity(parsedData)
            if (!hero.isValid()) {
                response.writeHead(statusCodes.BAD_REQUEST)
                response.end(hero.notications.join('\n'))
                continue;
            }

            // cadastra no banco de dados.. 

            response.writeHead(statusCodes.OK)
            response.end()

        } catch (error) {


            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            response.end()
        }
    }

}

createServer(handler).listen(3000, () => console.log('running at 3000'))

/*
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "80"}'
*/