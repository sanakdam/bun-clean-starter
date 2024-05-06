import * as config from "@/config/config"

export enum TracingType {
    Response = 'Response',
    Error = 'Error',
    Request = 'Request',
}

type Log = {
    type: TracingType
    timestamp: number
    value: string
}

class Tracing {
    name: string
    logs: Log[] = []

    constructor(name: string) {
        console.debug(name)
        this.name = name
    }

    addEvent(type: TracingType, log: any): Tracing {
        switch (type) {
            case TracingType.Request:
                console.warn(this.name, JSON.stringify(log))
                break
            case TracingType.Response:
                console.info(this.name, JSON.stringify(log))
                break
            default:
                console.error(this.name, JSON.stringify(log))
        }

        this.logs.push({
            type: type,
            timestamp: Date.now(),
            value: JSON.stringify(log),
        })
        return this
    }
}

export function start(name: string): Tracing | null {
    if (config.get().app.debug) {
        console.debug(name)
        return new Tracing(name)
    }

    return null
}

export function logRequest(span: Tracing | null, log: any): Tracing | null {
    if (span == null) return null

    return span.addEvent(TracingType.Request, log)
}

export function logResponse(span: Tracing | null, log: any): Tracing | null {
    if (span == null) return null

    return span.addEvent(TracingType.Response, log)
}

export function logError(span: Tracing | null, log: any): Tracing | null {
    if (span == null) return null

    return span.addEvent(TracingType.Error, log)
}
