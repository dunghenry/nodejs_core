const http = require("http");
const dt = require("./time");
const url = require("url");
const fs = require("fs");
const uc = require("upper-case");
const events = require("events");
const formidable = require("formidable");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
// console.log(process.env.URL);
// event emmiter
const eventEmitter = new events.EventEmitter();
const myHandle = () => console.log("Handle event!");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("The date and time are currently: " + dt.myDateTime());
    // res.end();
    const q = url.parse(req.url, true);
    res.write(uc.upperCase(q.pathname));
    eventEmitter.on("oke", myHandle);
    eventEmitter.emit("oke");
    return res.end();
  })
  .listen(5000);

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(4000);

http
  .createServer(function (req, res) {
    if (req.url == "/upload") {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        // D:\nodejs_core
        var oldpath = files.fileUpload.filepath;
        var newpath = process.env.URL + files.fileUpload.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write("File uploaded and moved!");
          res.end();
        });
        res.write("File uploaded");
        res.end();
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<form action="upload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="fileUpload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");
      return res.end();
    }
  })
  .listen(8080);

http
  .createServer(async function (req, res) {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: "trandungksnb00@gmail.com",
      subject: "Send Message",
      html: `<h1>Hello</h1>`,
    };
    const result = await transporter.sendMail(mailOptions);
    if (result) {
      console.log(result);
      res.write("Verification email sent successfully!");
      return res.end();
    } else {
      res.write("Verification email sent failed!");
      return res.end();
    }
  })
  .listen(7000);
