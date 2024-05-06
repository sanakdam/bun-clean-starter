import {serve} from "@hono/node-server"
import {OpenAPIHono} from "@hono/zod-openapi"
import {swaggerUI} from "@hono/swagger-ui"
import * as config from "@/config/config"

async function main(): Promise<void> {
    try {
        const err = await config.initConfig()
        if (err !== null) {
            
        }

        const server = initServer()

        server.doc("/doc", {
            openapi: "3.0.0",
            info: {
                version: config.get().app.version,
                title: config.get().app.name,
            },
        })

        server.get("/ui", swaggerUI({ url: "/doc" }))
    } catch (err: unknown) {

    }
}

function initServer(): OpenAPIHono {
    const server = new OpenAPIHono()

    const port = parseInt(config.get().app.port)
    console.log(`Server is running on port ${port}`)

    serve({
        fetch: server.fetch,
        port,
    })

    return server
}

export default main