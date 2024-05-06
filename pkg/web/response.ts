import {Context} from "hono"
import {StatusCode} from "hono/utils/http-status"
import {parseError} from "@/pkg/helpers/error"

export type OkResponse = {
    code: StatusCode
    message: string
    data?: any
}

export type ErrorResponse = {
    code: StatusCode
    error: unknown
}

export function webOK(ctx: Context, resp: OkResponse): Response {
    return ctx.json({ message: resp.message, data: resp.data }, resp.code)
}

export function webError(ctx: Context, resp: ErrorResponse): Response {
    const err = parseError(resp.error)

    return ctx.json({ message: err.message }, resp.code)
}