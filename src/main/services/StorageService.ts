import { readFile, writeFile } from "fs";

import paths from "../constants/paths";
import defaults from "../constants/defaults";

class StorageService {
  constructor() {
    console.log(`[StorageService] Preferences path: ${paths.data.preferences}`);
  }

  get = (): Promise<Preferences> => {
    return new Promise(resolve => {
      readFile(paths.data.preferences, { encoding: "utf8" }, (err, data) => {
        let content: Preferences;

        try {
          content = {
            ...defaults,
            ...JSON.parse(data)
          }
        } catch (e) {
          content = defaults;
        } finally {
          return resolve(content);
        }
      });
    });
  };

  set = (preferences: Preferences) => {
    return new Promise((resolve, reject) => {
      return writeFile(
        paths.data.preferences,
        JSON.stringify(preferences),
        err => {
          if (err) {
            return reject(err);
          }

          return resolve();
        }
      );
    });
  }

  setItem = async (key: string, value: any): Promise<any> => {
    let content: Preferences = await this.get();
    content[key] = value;

    return await this.set(content);
  };

  getItem = async (key: string): Promise<any> => {
    const content: Preferences = await this.get();
    return content[key];
  };
};

export default new StorageService();