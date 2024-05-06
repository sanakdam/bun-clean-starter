import {Hono} from "hono"
import userRoute from "@/internal/app/users/delivery/rest/handler"
import todoRoute from "@/internal/app/todos/delivery/rest/handler"

export default function setup(app: Hono) {
    app.route("/", userRoute())
    app.route("/", todoRoute())
}