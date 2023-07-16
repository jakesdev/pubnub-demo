import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }

  public async getMongoConfig() {
    return {
      uri: 'mongodb+srv://jakesnguyen:qre1Fp20OX3gDJGt@cluster0.si6dnwc.mongodb.net/',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
