import {ExecutionContext, Hono, Env, Context} from "hono"
import {cors} from "hono/cors"
import setupApp from "@/internal/app/setup"
import * as config from "@/config/config"
import {webError} from "@/pkg/web/response"

function initServer(): Hono {
    const app = new Hono()

    app.use("*", cors())

    return app
}

type Server = {
    fetch: (request: Request, Env?: (Env["Bindings"] | {}), executionCtx?: ExecutionContext) => (Response | Promise<Response>),
    port: number
}

function main(): Server | undefined {
    const err = config.initConfig()
    if (err !== null) {
        console.error(err)
        return
    }

    const app = initServer()

    setupApp(app)

    app.get("*", function (ctx: Context): Response {
        return webError(ctx, { code: 404, error: new Error("Route not found") })
    })

    const port = parseInt(config.get().app.port)
    console.info(`Server is running on port ${port}`)

    return {
        fetch: app.fetch,
        port,
    }
}

export default main()