
export function parseError(err: unknown): Error {
    if (err instanceof Error) {
        return err
    }

    return new Error("Something went wrong")
}