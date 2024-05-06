import {Context, Hono} from "hono"
import {webError, webOK} from "@/pkg/web/response"
import {logError, logResponse, tracingStart} from "@/pkg/web/tracing"
import {getMyTodos} from "@/internal/app/todos/usecase/get_my_todos"
import {ITodoUC, TodoUC} from "@/internal/app/todos/usecase/port"

export default function handler(): Hono {
    const app = new Hono().basePath("/todos")
    const uc = new TodoUC()

    app.get("/", (ctx: Context) => myTodos(uc, ctx))
    return app
}

async function myTodos(uc: ITodoUC, ctx: Context): Promise<Response> {
    const { span, ctx: newCtx  } = tracingStart(ctx,"myTodos")

    try {
        const todos = await getMyTodos(uc, newCtx)
        logResponse(span, todos)
        return webOK(ctx, { code: 200, message: "Success get my todos", data: todos })
    } catch (err: unknown) {
        logError(span, err)
        return webError(ctx, { code: 400, error: err })
    }
}