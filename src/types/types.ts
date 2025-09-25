export interface Message {
    id: string,
    role: 'user' | 'assistant',
    message: string,
    image?: string
}

export interface Chat {
    id:string,
    title: string,
    message: Message[]
}