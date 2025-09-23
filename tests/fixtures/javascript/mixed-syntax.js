const EventEmitter = require('events');

class DataProcessor extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.cache = new Map();
  }

  process(data) {
    if (this.cache.has(data.id)) {
      return this.cache.get(data.id);
    }

    const result = this.transform(data);
    this.cache.set(data.id, result);
    this.emit('processed', result);

    return result;
  }

  transform(data) {
    return {
      ...data,
      processed: true,
      timestamp: Date.now(),
    };
  }

  clearCache() {
    this.cache.clear();
    this.emit('cache-cleared');
  }
}

module.exports = DataProcessor;
