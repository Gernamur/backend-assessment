/**
 * Expects a promise and returns a positional result array
 * 
 * @param {Promise} p Promise to deestructure
 * @return {Array} [result, error]
 * @author Germán Navarro <gernamur@gmail.com>
 */
const to = function (p) {
    return p.then(data => [data]).catch(error => [null, error]);
}
/**
 * Expect an array of promises and returns a positional result array
 * 
 * @param {Array<Promise>} p
 * @return {Array} [result, error]
 * @author Germán Navarro <gernamur@gmail.com>
 * 
 */
const toAll = function (p) {
    return Promise.all(p).then(data => [data]).catch(error => [null, error])
}
/**
 * 
 * @param {Array<Promise>} p 
 * @return {Array} [result, error]
 * @author Germán Navarro <gernamur@gmail.com>
 * 
 */
const toFirst = function (p) {
    return Promise.race(p).then(data => [data]).catch(error => [null, error])
}

export { to, toAll, toFirst }