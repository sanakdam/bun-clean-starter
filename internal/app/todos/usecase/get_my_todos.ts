import {Context} from "hono"
import {parseError} from "@/pkg/helpers/error"
import {myTodos, MyTodosRow} from "@/gen/todos/query/query_todos_sql"
import {ITodoUC} from "@/internal/app/todos/usecase/port"
import {logResult, tracingStart} from "@/pkg/web/tracing"


export async function getMyTodos(uc: ITodoUC, ctx: Context): Promise<MyTodosRow[] | Error> {
    try {
        const span = ctx.get("trace")
        const rows = await myTodos(uc.query)
        logResult(span, rows)
        return rows
    } catch (err: unknown) {
        return parseError(err)
    }
}