import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const myTodosQuery = `-- name: MyTodos :many
select id, account_id, status, title, description, created_at, updated_at from public.todos`;

export interface MyTodosRow {
    id: string;
    accountId: string | null;
    status: string | null;
    title: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function myTodos(client: Client): Promise<MyTodosRow[]> {
    const result = await client.query({
        text: myTodosQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            accountId: row[1],
            status: row[2],
            title: row[3],
            description: row[4],
            createdAt: row[5],
            updatedAt: row[6]
        };
    });
}

