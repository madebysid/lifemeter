import { readFile, writeFile } from "fs";

import paths from "../constants/paths";

class StorageService {
  constructor () {
    console.log(`[StorageService] Preferences path: ${paths.data.preferences}`);
  }

  __getContent = (): Promise<object> => {
    return new Promise(resolve => {
      readFile(paths.data.preferences, { encoding: "utf8" }, (err, data) => {
        let content: object;

        try {
          content = JSON.parse(data);
        } catch (e) {
          content = {};
        } finally {
          return resolve(content);
        }
      });
    });
  }

  setItem = async (key: string, value: any): Promise<any> => {
    let content: object = await this.__getContent();
    content[key] = value;

    return new Promise((resolve, reject) => {
      return writeFile(
        paths.data.preferences,
        JSON.stringify(content),
        err => {
          if (err) {
            return reject(err);
          }

          return resolve(value);
        }
      );
    })
  }

  getItem = async (key: string): Promise<any> => {
    let content: object = await this.__getContent();
    return content[key];
  };
};

export default new StorageService();