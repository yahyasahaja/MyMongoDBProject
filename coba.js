class MyPromise {
    constructor(func) {
        this.fungsi = func;
        this.cb = null;
        this.hasil = {};
    }

    then(callback) {
        var myThis = this;
        this.cb = callback;
        this.fungsi(this.resolve.bind(this));
        return new MyPromise(resolve => {
            myThis.done = () => resolve(myThis.hasil.h);
        });
    }

    resolve(...args) {
        //if (this == undefined) return;
        this.hasil.h = this.cb.bind(this)(...args);
        if (this.done) this.done();
    }
}

var p = new Promise((resolve) => {
    setTimeout(() => resolve('good'), 1000);
});

p.then(cb => {
    console.log('ke sini');
    return (new Promise((resolve) => {
        setTimeout(() => resolve('good'), 1000);
    })).then(cb => {console.log("kesini lagi"); return (new Promise((resolve) => {
        setTimeout(() => resolve('good'), 1000);
    })).then(cb => cb);}); 
})
.then(a => { console.log(a); return "hmm"})
.then(a => console.log(a, "end"));

(new Promise((resolve, reject) => resolve('a')));