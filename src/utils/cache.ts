class LocalCache {
  // 写入本地缓存
  setCache(key: string, value: any) {
    // setItem要求key与value都是string类型 所以将value转为string
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  //   获取本地缓存
  getCache(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  //   删除缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  // 清空缓存
  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
