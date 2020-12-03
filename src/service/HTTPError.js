export default class HTTPError extends Error {
    constructor(status, ...params) {
        super(...params);
        this.status = status;
    }
}
