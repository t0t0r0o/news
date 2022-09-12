const fs = require("fs");

const Article_Model = require("../Models/Article_Model");
const Config_Model = require("../Models/Config_Model");
const Download_Controller = require("./Download_Controller");

class GetData_Controller {
  constructor() {}

  GetConfigData() {
    this.config = new Config_Model();
    return this.config.getData();
  }

  async GetArticleData() {
    var dataRetun = [];
    var configData = this.GetConfigData();
    var Database_Dir = "./Databases/";
    configData.map((data) => {
      //khai bao bien nay de truyen vao json dong 38
      var domain = data.domain;
      var Domain_Dir = Database_Dir + data.domain;
      // Neu ton tai thu muc co ten domain
      if (fs.existsSync(Domain_Dir)) {
        var Article_DB_Path = Domain_Dir + "/Article_DB.json";

        // Them vao thu muc img neu khong ton tai
        if (!fs.existsSync(`${Domain_Dir}/img`)) {
          fs.mkdirSync(`${Domain_Dir}/img`);
        }
        // Neu ton tai file chua cac bai viet cua 1 domain
        if (fs.existsSync(Article_DB_Path)) {
          var article = new Article_Model("." + Article_DB_Path);
          var articles = article.getData();

          // Neu file chua bai viet
          if (articles.length != 0) {
            dataRetun.push({ domain, articles });
            articles.forEach((article) => {
              // console.log(article);
            });
          }
          // Neu file khong chua bai viet nao
          else {
            this.DownloadPageFile(data, Domain_Dir);
          }
        }
        // Neu khong ton tai file chua cac bai viet cua 1 domain
        else {
          const pageNew = [];
          fs.writeFileSync(
            "./Databases/" + data.domain + "/Article_DB.json",
            JSON.stringify(pageNew)
          );
          this.GetArticleData();
        }
      }
      // Neu khong ton tai thu muc co ten domain
      else {
        fs.mkdirSync("./Databases/" + data.domain);
        this.GetArticleData();
      }
    });
    return dataRetun;
  }

  // Ham goi den ham Download_Controller.DownloadHTML()
  // khai bao async va try..catch de cho Controller.DownloadHTMl() chay
  async DownloadPageFile(data, Domain_Dir) {
    var download_Controller = new Download_Controller(
      data.domain,
      data.protocol
    );
    var File_HTML_Path = "./Databases/" + data.domain + "/page.html";
    try {
      // bien promise doi ket qua tra ve tu download_Controller.DownloadHTML
      await download_Controller.DownloadHTML(Domain_Dir);
      // console.log("70: " + File_HTML_Path);
    } catch (error) {
      console.log("73:" + error);
    }
    download_Controller.ProcessHTML(File_HTML_Path);
    // console.log("86 Process HTML");
  }

  handleDownloadPageFile() {
    var Database_Dir = "./Databases/";
    var configData = this.GetConfigData();
    configData.map((data) => {
      var Domain_Dir = Database_Dir + data.domain;
      var Article_DB_Path = Domain_Dir + "/Article_DB.json";
      if (!fs.existsSync(Domain_Dir)) {
        fs.mkdirSync("./Databases/" + data.domain);
      }
      if (!fs.existsSync(Article_DB_Path)) {
        const pageNew = [];
        fs.writeFileSync(
          "./Databases/" + data.domain + "/Article_DB.json",
          JSON.stringify(pageNew)
        );
      }
      this.DownloadPageFile(data, Domain_Dir);
    });
  }

  // ListenChange() {
  //   var Database_Dir = "./Databases/";
  //   var configData = this.GetConfigData();
  //   fs.watch("./Databases/Config_DB.json", (eventType, filename) => {
  //     configData.map((data) => {
  //       var Domain_Dir = Database_Dir + data.domain;
  //       var download_Controller = new Download_Controller(
  //         data.domain,
  //         data.protocol
  //       );
  //       this.DownloadPageFile(data, Domain_Dir);
  //     });
  //     console.log("\nThe file", filename, "was modified!");
  //     console.log("The type of change was:", eventType);
  //   });
  // }
}
module.exports = GetData_Controller;
