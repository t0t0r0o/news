class Config_Model {
    constructor() {
        this.path = "../Databases/Config_DB.json";
    }

    getData() {
        return require(this.path);
    }
}
module.exports = Config_Model;