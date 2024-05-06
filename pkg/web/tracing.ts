import * as config from "@/config/config"
import {Context} from "hono";

export enum TracingType {
    Start = "Start",
    Response = "Response",
    Result = "Result",
    Error = "Error",
    Request = "Request",
}

type Log = {
    type: TracingType
    timestamp: number
    value: string
}

export class Tracing {
    name: string
    logs: Log[] = []

    constructor(name: string) {
        console.debug(TracingType.Start, name)
        this.name = name
    }

    addEvent(type: TracingType, log: any): Tracing {
        switch (type) {
            case TracingType.Request:
                console.warn(type, this.name, JSON.stringify(log))
                break
            case TracingType.Result:
            case TracingType.Response:
                console.info(type, this.name, JSON.stringify(log))
                break
            default:
                console.error(type, this.name, JSON.stringify(log))
        }

        this.logs.push({
            type: type,
            timestamp: Date.now(),
            value: JSON.stringify(log),
        })
        return this
    }
}

export function tracingStart(ctx: Context, name: string): { ctx: Context, span: Tracing | null } {
    if (config.get().app.debug) {
        const span = new Tracing(name)
        ctx.set("trace", span)
        return { ctx, span }
    }

    return { ctx, span: null }
}

export function logRequest(span: Tracing | null, log: any): Tracing | null {
    if (span == null) return null

    return span.addEvent(TracingType.Request, log)
}

export function logResponse(span: Tracing | null, log: any): Tracing | null {
    if (span == null) return null

    return span.addEvent(TracingType.Response, log)
}

export function logResult(span: Tracing | null, log: any): Tracing | null {
    if (span == null) return null

    return span.addEvent(TracingType.Result, log)
}

export function logError(span: Tracing | null, log: any): Tracing | null {
    if (span == null) return null

    return span.addEvent(TracingType.Error, log)
}
