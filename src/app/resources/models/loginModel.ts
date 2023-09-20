import { environment } from "src/environments/environment";

export class LoginUser {
    username ?: string = '';
    password ?: string = '';
    request_token ?: string = environment.request_token;
}
