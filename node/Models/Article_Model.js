class Article_Model {
    constructor(Article_DB_Path) {
        this.path = Article_DB_Path;
    }

    getData() {
        const article = require(this.path);
        return article;
    }

}

module.exports = Article_Model