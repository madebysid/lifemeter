import { readFile, writeFile } from "fs";
import { app } from "electron";

const FILE = `${app.getPath("userData")}/preferences.json`;

const getContent = async (): Promise<object> => {
  return new Promise((resolve, reject) => {
    readFile(FILE, { encoding: "utf8" }, (err, data) => {
      if (err) {
        return reject({});
      }

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

export const setItem = async (key: string, value: string | number): Promise<string|number> => {
  let content: object = await getContent();
  content[key] = value;

  return new Promise((resolve, reject) => {
    return writeFile(FILE, JSON.stringify(content), { encoding: "utf8" }, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(value);
    })
  })
}

export const getItem = async (key: string): Promise<string | number> => {
  let content: object = await getContent();
  return content[key];
};