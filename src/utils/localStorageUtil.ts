export class LocalStorageUtil {
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return undefined;
    }
  }

  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }
}

const localStorageUtil = new LocalStorageUtil();
export default localStorageUtil;
