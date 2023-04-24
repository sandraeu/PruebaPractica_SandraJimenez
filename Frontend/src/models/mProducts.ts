export interface mAllProducts{
    response : [
        {
            categoria_hija : string,
            categoria_padre: string,
            producto: string,
            stock : string
        }
    ]
}

export interface mProducts {
    "categoria_hija" : string,
    "categoria_padre": string,
    "producto": string,
    "stock": string
}