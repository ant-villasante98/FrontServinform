import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, map, of } from "rxjs";

export function VerifyTokenGuard(path?: string): CanActivateFn {
    return () => {
        let userToken: any;
        if (sessionStorage.getItem("tokenServinform") == null) {
            console.log("No se pudo obtene el token")
            return inject(Router).createUrlTree(["/auth/login"]);
        }
        let router = inject(Router);

        return inject(AuthService)
            .verifyToken()
            .pipe(
                catchError((err) => {
                    console.error(`Error en le verificacion del token `)
                    console.table(err.error)
                    sessionStorage.removeItem("tokenServinform");
                    console.info(err.error)
                    return of({ sucess: false })
                }),
                map((value: any) => {
                    if (value == null || !value?.sucess) {
                        console.log(`El token no es valido ${value}`)
                        return router.createUrlTree(["/auth", "login"]);
                    }

                    userToken = value.token;

                    if (path) {
                        return router.createUrlTree([path]);
                    }

                    return true;
                })
            )


    }
}

export function VerifySession(): CanActivateFn {
    return () => {
        if (sessionStorage.getItem("tokenServinform")) {
            return inject(Router).createUrlTree(["/dashboard"])
        }
        return true;
    }
}