interface Credentials {
    email:string,
    password:string
}

interface Token {

    token:string

}

interface CheckedUser {

    status?: string,
    error?: string,
    allowed:boolean
}

interface ErrorMessage {

    status: number,
    messages: string | string[],
}

export {
    Credentials,
    Token,
    CheckedUser,
    ErrorMessage
}