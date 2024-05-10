import { AuthenUseCase, RegisterCredentials, SocialLogin, UsernamePasswordLoginCredentials } from "../domain";
import { GoogleLoginUseCase, LinkedInLoginUsecase, UsernamePasswordLoginUseCase } from "./login";

export class Auth0UseCase implements AuthenUseCase {
    constructor() { }
    
    usernamePasswordLogin(credentials: UsernamePasswordLoginCredentials) {
        new UsernamePasswordLoginUseCase(credentials).login();
    }
    
    googleLogin() {
        new GoogleLoginUseCase().login();
    }
    
    linkedInLogin: SocialLogin = () => {
        new LinkedInLoginUsecase().login();
    }

    register(credentials: RegisterCredentials) {
        throw new Error('Not implemented');
    }
    
}