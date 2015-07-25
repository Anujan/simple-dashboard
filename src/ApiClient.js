import superagent from 'superagent';
import config from 'config';

class ApiClient {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            let request = superagent[method](this.formatUrl(path));
            if (options && options.params) {
              request.query(options.params);
            }
            if (__SERVER__) {
              if (req.get('cookie')) {
                request.set('cookie', req.get('cookie'));
              }
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                reject(res.body || err);
              } else {
                resolve(res.body);
              }
            });
          });
        };
      });
  }

  formatUrl(path) {
    let adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (__SERVER__) {
      return 'http://localhost:' + config.apiPort + adjustedPath;
    }
    return '/api' + adjustedPath;
  }
}

export default ApiClient;
