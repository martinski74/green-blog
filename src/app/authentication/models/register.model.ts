export class RegisterModel{
    constructor(
       public username: string,
       public password: string,
       public email: string,
       public age?: number
    ){}
}