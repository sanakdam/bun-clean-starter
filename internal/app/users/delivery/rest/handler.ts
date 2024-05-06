import {Context, Hono} from "hono"

export default function handler(): Hono {
    const app = new Hono().basePath("/users")
    app.get("/test", (c: Context) => c.json({ message: "test" }))
    return app
}