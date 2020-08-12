const post = require('./scripts/templates/prompt')
module.exports = (plop) => {
    plop.setGenerator('post', post);
}