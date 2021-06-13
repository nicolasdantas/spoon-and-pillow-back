// environnement
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const db = 'mongodb://127.0.0.1:27017/wilderdb';

export interface IConfig {
  db: string;
  options: any;
  serverPort: number;
}

export const config: IConfig = {
  db,
  options,
  serverPort: 3000,
};
