import Promise from './index.js';

var p = new Promise((resolve, reject) => {
    console.log(1111, 'Promise', resolve, reject);
    
    resolve();
}).then(() => {
    console.log(1111, 'then resolve');
}, () => {
    console.log(1111, 'then reject');
}).then(() => {
    console.log(1111, 'then resolve2');
}, () => {
    console.log(1111, 'then reject2');
});

console.log(2222, 'other', p);