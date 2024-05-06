import {dbRead, dbWrite} from "@/config/config"
import {Pool} from "pg"

export type ITodoUC = {
    query: Pool
    command: Pool
}

export class TodoUC implements ITodoUC {
    query: Pool = dbRead()
    command: Pool = dbWrite()
}