type configType = {
    env: string | undefined
    mongodbStr: string |  undefined
    frontendUrl: string | undefined
    port: number
    cloudinary: object
}

class Config {
    #config: configType = {
        'env': process.env.APP_ENV,
        'mongodbStr': process.env.MONGODB_CONNECTION_STRING,
        'frontendUrl': process.env.FRONTEND_URL,
        'port': parseInt(process.env.PORT || '7000'), 
        'cloudinary': {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
        },
    }

    getConfig(key: keyof configType, defaultVal?: any): any {
        if (this.#config[key] !== undefined) {
            return this.#config[key] as any
        }

        return defaultVal;
    }
}
 
export default new Config()