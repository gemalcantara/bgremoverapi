var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
const imageToBase64 = require('image-to-base64');
var fs = require('fs');
const util  = require("util");
const execPromise = util.promisify(exec);
class BackgroundRemover{
    constructor(request) {
        this.request = request
      }

     async removeBackground() {
        let imageBase64;
        let path = this.request.file.path ? this.request.file.path : ''
        let filename = this.request.file.filename ? this.request.file.filename : ''
        let method = this.request.body.method ? `-m "${this.request.body.method}"`: ''
        let alphaMatting = this.request.body.alpha_matting ? `-a ${this.request.body.alpha_matting}`: ''
        let alphaMattingForeground = this.request.body.alpha_matting_foreground ? `-af ${this.request.body.alpha_matting_foreground}`: ''
        let alphaMattingBackground = this.request.body.alpha_matting_background ? `-ab ${this.request.body.alpha_matting_background}`: ''
        let alphaMattingErodeSize = this.request.body.alpha_matting_erode_size ? `-ae ${this.request.body.alpha_matting_erode_size}`: ''
        let alphaMattingBaseSize = this.request.body.alpha_matting_base_size ? `-az ${this.request.body.alpha_matting_base_size}`: ''

        let command = `backgroundremover -i "${path}" ${method} ${alphaMatting} ${alphaMattingForeground} ${alphaMattingBackground} ${alphaMattingErodeSize} ${alphaMattingBaseSize} -o "public/images/outputs/${filename}"`;
        // await exec(command, function (error, stdout, stderr) {
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        //     if (error !== null) {
        //         console.log('exec error: ' + error);
        //     }
        //  });
        await this.execWrapper(command);
        imageBase64 = imageToBase64(`public/images/outputs/${filename}`) // Path to the image
         .then(
             (response) => {
                return response
                //  console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
             }
         )
         .catch(
             (error) => {
                return error
                //  console.log(error); // Logs an error if there was one
             }
         )     
        // console.log(imageBase64)
        // remove image
        fs.unlinkSync(path);
        fs.unlinkSync(`public/images/outputs/${filename}`);
        return imageBase64;
     } 

     async execWrapper(cmd){
        const { stdout, stderr } = await execPromise(cmd);
        if (stdout) {
          console.log(`stderr: ${stdout}`);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
     }
}


module.exports = BackgroundRemover;