const request = require("request-promise");
const https = require("https");
const cheerio = require("cheerio");
const CryptoJS = require("crypto-js");
const Config_Model = require("../Models/Config_Model");
const fs = require("fs");

const Article_Model = require("../Models/Article_Model");

class Download_Controller {
  constructor(domain, protocol) {
    this.domain = domain;
    this.url = protocol + domain;
    this.path = "./Databases/";

    var config_Model = new Config_Model();
    var configData = config_Model.getData();
    this.tagss = configData.map((config) => {
      if (config.domain === this.domain) {
        return config.tags;
      }
    });
  }

  // ham DownloadHTML tra ve mot promise
  DownloadHTML(Domain_Dir) {
    var URL = this.url;
    return new Promise(function (getResult, getError) {
      request(URL, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const File_HTML_Path = Domain_Dir + "/page.html";
          fs.writeFileSync(File_HTML_Path, html);
          getResult(File_HTML_Path);
          return File_HTML_Path;
        } else {
          getError(error);
          return error;
        }
      });
    });
  }

  ProcessHTML(File_HTML_Path) {
    const html = fs.readFileSync(File_HTML_Path, {
      encoding: "utf8",
      flag: "r",
    });
    // console.log("Day la html" + html);
    if (this.DownloadHTML == "error") {
      return;
    } else {
      const $ = cheerio.load(html);
      var pageNew = [];
      this.tagss.forEach((tags) => {
        if (tags) {
          tags.forEach((tag) => {
            $(tag.selector).each((index, el) => {
              let id = "",
                title = "",
                link = "",
                thumb = "",
                newUpdate = false,
                desc = "",
                category = "";
              category = tag.category;
              // console.log(id);
              if (tag.resource.title.attr === "@") {
                title = $(el).find(tag.resource.title.selector).text();
                // console.log("Day la title " + title);
              } else {
                title = $(el)
                  .find(tag.resource.title.selector)
                  .attr(tag.resource.title.attr);
                //    console.log("Day la title " + $(el).find(tag.resource.title.selector))
              }
              if(title != undefined) {
                id = CryptoJS.MD5(title).toString(CryptoJS.enc.Base64);
              } else {
                id = "";
              }

              if (tag.resource.link.attr === "@") {
                link = $(el).find(tag.resource.link.selector).text();
              } else {
                link = $(el)
                  .find(tag.resource.link.selector)
                  .attr(tag.resource.link.attr);
                // console.log("Day la link " + link);
              }

              // them url cho trang dantri.com.vn

              if (link != undefined && link[0] == "/") {
                link = "https://dantri.com.vn" + link;
              }

              if (tag.resource.thumb.attr === "@") {
                thumb = $(el).find(tag.resource.thumb.selector).text();
              } else {
                thumb = $(el)
                  .find(tag.resource.thumb.selector)
                  .attr(tag.resource.thumb.attr);
                // console.log("Day la thumb " + thumb);
              }

              //tai thumbnails ve may
              // if (thumb != undefined) {
              //   this.DownloadImage(
              //     thumb,
              //     `./Databases/${this.domain}/img/${id}.jpg`,
              //     function () {
              //       console.log("done");
              //     }
              //   );
              //   // thumb = `./img/${id}.jpg`;
              // }

              if (tag.resource.desc.attr === "@") {
                desc = $(el).find(tag.resource.desc.selector).text();
                // console.log("Day la desc " + desc);
              } else {
                desc = $(el)
                  .find(tag.resource.thumb.selector)
                  .attr(tag.resource.desc.attr);
              }
              pageNew.push({ id, category, title, link, thumb, desc, newUpdate });
            });
          });
        }
      });
      let Article_DB_Path = "./Databases/" + this.domain + "/Article_DB.json";

      let article = new Article_Model("."+Article_DB_Path)
      let articles = article.getData();

      if(articles.length != 0 ) {     
        pageNew = pageNew.filter((news) => {
          return !articles.find((article) => {
            return article.id == news.id
          })
        })
        pageNew.forEach((article) => {
          article.newUpdate = true;
        })
      }
      let newArticles = pageNew.concat(articles)
      console.log(typeof pageNew)
      if (newArticles.length > 100) {
        newArticles.splice(100,newArticles.length);
      }
      fs.writeFileSync(
        Article_DB_Path,
        JSON.stringify(newArticles)
      );
    }
  }

  DownloadImage(uri, filename, callback) {
    // neu ton tai thu muc img
      request.head(uri, function (err, res, body) {
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);
        request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
      });
  }

  DeleteImage(Domain_Dir) {
    fs.unlink(`${Domain_Dir}/img`, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = Download_Controller;
