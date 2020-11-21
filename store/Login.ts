import { proxy } from "valtio";
import type { LoginState } from "../models/Login";

const loginState = proxy<LoginState>({ email: "", password: "" });

export { loginState };
