import { ReadStream } from "fs";

interface GiffyPostData {
    api_key: string,
    file: {
        value: ReadStream
        options: {
            filename: string
            contentType: string
        }
    }
}

export { GiffyPostData }