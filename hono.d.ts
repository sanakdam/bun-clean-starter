import {Tracing} from "@/pkg/web/tracing"

declare module "hono" {
    interface ContextVariableMap {
        trace: Tracing
    }
}