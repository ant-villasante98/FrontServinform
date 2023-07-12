export interface IUser {
    email: string
    password: string
    nombre: string
    apellido: string
    idRol: number
}

export interface IUserSession {
    token: string;
    userName: string;
    userEmail: string;
    // validity: string;
    refreshToken?: string;
    expiredTime: Date;
    rol: string;
}