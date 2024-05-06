import {PoolConfig, Pool} from "pg"
import {load} from "js-yaml"
import {readFileSync} from "node:fs"
import {parseError} from "@/pkg/helpers/error"

type AppConfig = {
    name: string
    host: string
    port: string
    key: string
    version: string
    debug: boolean
}

type DBConfig = {
    primary: PoolConfig
}

type Config = {
    app: AppConfig
    database: DBConfig
}

let config: Config
let poolRead: Pool, poolWrite: Pool

export function initConfig(): Error | null {
    try {
        const reader = readFileSync('./config.yaml', 'utf8')
        config = load(reader) as Config

        const pool = new Pool(config.database.primary)
        poolRead = pool
        poolWrite = pool

        return null
    } catch (err: unknown) {
        return parseError(err)
    }
}

export function get(): Config {
    return config
}

export function dbWrite(): Pool {
    return poolWrite
}

export function dbRead(): Pool {
    return poolRead
}