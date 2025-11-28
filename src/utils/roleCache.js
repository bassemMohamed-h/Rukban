export const roleCache = {
  data: null, // cached roles
  lastUpdated: null,
  clear() {
    this.data = null;
    this.lastUpdated = null;
  },
  set(roles) {
    this.data = roles;
    this.lastUpdated = new Date();
  },
  get() {
    return this.data;
  },
  isValid() {
    // Optional TTL: e.g., 5 minutes
    const TTL = 5 * 60 * 1000;
    return this.data && (Date.now() - this.lastUpdated.getTime()) < TTL;
  }
};
