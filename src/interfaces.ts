interface Credentials {
    email:string,
    password:string
}

interface Token {

    token:string

}

interface checkedUser {

    status?: string,
    error?: string,
    allowed:boolean
}

export {
    Credentials,
    Token,
    checkedUser
}