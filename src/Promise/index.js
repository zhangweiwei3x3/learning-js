/**
 * Promise
 */
// resolve
function doResolve() {
    console.log(333, 'doResolve', this.resolveFns);

    setTimeout(() => {
        this.resolveFns.forEach((fn) => {
            fn();
        });
    });
}

// reject
function doReject() {
    console.log(333, 'doReject', this.rejectFns);

    setTimeout(() => {
        this.rejectFns.forEach((fn) => {
            fn();
        });
    });
}

function Promise(fn) {
    if (typeof fn !== 'function') {
        throw new Error('Promise 参数必须是函数');
    }
    this.resolveFns = [];
    this.rejectFns = [];

    fn(doResolve.bind(this), doReject.bind(this));
}

Promise.prototype.then = function (resolve, reject) {
    console.log(333, 'then', resolve, reject);

    if (resolve) {
        if (typeof resolve !== 'function') {
            throw new Error('resolve 必须是函数');
        }

        this.resolveFns.push(resolve);
    }

    if (reject) {
        if (typeof reject !== 'function') {
            throw new Error('reject 必须是函数');
        }
        
        this.rejectFns.push(reject);
    }

    return this;
};

export default Promise;
