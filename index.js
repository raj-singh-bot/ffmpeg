const express = require('express');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const {exec} = require('child_process');
const { stdout, stderr } = require('process');
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.static(path.join(__dirname,'public')));
app.use(
  fileUpload({
      limits: {
          fileSize: 10000000,
      },
      abortOnLimit: true,
  })
);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/convert',(req, res) => {
  // const file = (req.files.file)
  // console.log(file)
  // file.mv('tmp/' + file.name , (err) => {
  //   if(err) return res.status(400).json({err})
  //   console.log('uploaded success')
  // })

  // const img = (__dirname + '/tmp/9603.png')
  // let fileOfVideos =  (__dirname + "/public/videos/1671173056756_fil.txt");
  // const imgVid = __dirname + "/public/imgVideo/" + Date.now() + "_aud.mp4"
  // const vid = (__dirname + '/public/english.mp4')
  // const aud = (__dirname + '/public/english.aac')
  // const imageVid = (__dirname + '/public/imgVideo/1671167921318_aud.mp4')
  // let aud_vid = (__dirname + '/public/videos/1671167107763_aud.mp4')
  // let outVid = __dirname + "/public/videos/" + Date.now() + "_aud.mp4"
  // let newFile = __dirname + "/public/videos/" + Date.now() + ".mp4"
  // let cmd1 = `ffmpeg -loop 1 -i ${img} -t 5 ${imgVid}`

  // exec(cmd1, (error, stdout, stderr) => {
  //   if(error){
  //     console.log('error',stderr);
  //     throw error
  //   }
  //   console.log('image to video converted')
  // })
  // let cmd2 =`ffmpeg -f concat -i ${aud_vid} -i ${imageVid} -codec copy ${newFile}`
  // let cmd = `ffmpeg -i ${imageVid} -i ${aud_vid}   -c:v copy -c:a aac ${outVid}`

  // fileContent =   "file " + aud_vid + "\nfile " + imageVid + "\n"
  // fs.writeFileSync(fileOfVideos, fileContent);
  

  // let cmd4 =`ffmpeg -safe 0 -f concat -i ${fileOfVideos} -i ${aud} -c:v copy -map 0:v:0 -map 1:a:0 ${newFile}`

  // exec(cmd4, (error,stdout, stderr) => {
  //   if(error){
  //     console.log('error',stderr);
  //     throw error
  //   }
  //   console.log('video created', stdout);
  //   res.status(200).send('video created')
  // })

  try {
    var matches1 = req.body.start1_base64Data.match(
      /^data:([A-Za-z-+/]+);base64,(.+)$/
    );

    response1 ={}

    if (matches1.length !== 3) {
      return new Error("Invalid input string");
    }
    response1.type = matches1[1];
    response1.data = new Buffer(matches1[2], "base64");
    let decodedImg1 = response1;
    let imageBuffer1 = decodedImg1.data;

    let fileName1 = Date.now() + "1.png";

    try {
      fs.writeFileSync("./public/uploads/" + fileName1, imageBuffer1, "utf8");
      // return res.send({"status":"success"});
    } catch (e) {
      next(e);
    }

    let user_main_langauge = req.body.language;

    var userImg1 = "./public/uploads/" + fileName1;

    //filenames

    var img_vid_path1 = Date.now() + "_img1.mp4";

    var img_vid = "./public/videos/" + Date.now() + "_img1.mp4";

    var vid_vid = "./public/videos/" + Date.now() + "_vid.mkv";
    var aud_vid = "./public/videos/" + Date.now() + "_aud.mp4";
    var fil_vid = "./public/videos/" + Date.now() + "_fil.txt";
    var def_vid = user_main_langauge + ".mp4";
    var def_aud = "./public/videos/" + user_main_langauge + ".aac";

    var del_vid = [];

    del_vid.push(vid_vid);
    del_vid.push(img_vid);
    del_vid.push(fil_vid);
    del_vid.push(userImg1);

    file_content =
      "file " +
      img_vid_path1 +
      "\nfile " +
      def_vid +
      "\n";
    fs.writeFileSync(fil_vid, file_content);

    var cmd_img = `ffmpeg -i "./public/videos/first.mp4" -i ${userImg1}  -filter_complex "[0:v][1:v] overlay=25:25:enable='between(t,0,20)'"  -pix_fmt yuv420p -c:a copy  ${img_vid}`;

    exec(cmd_img, (error, stdout, stderr) => {
      console.log("img_vid " + img_vid);
      console.log("Process started at cmd_img");
      if (error) {
        console.log("error occurs at cmd_img : " + error);
        // res.send("error: "+ error);
      }

      var cmd_vid = `ffmpeg -safe 0 -f concat -i ${fil_vid} -c copy ${vid_vid}`;

      exec(cmd_vid, (error, stdout, stderr) => {
        console.log("vid_vid " + vid_vid);
          console.log("process started at cmd_vid");
          if (error) {
            console.log("error occurs at cmd_vid: " + error);
            // res.send("error: " + error);
          }

          console.log("success video without audio");
          var cmd_aud = `ffmpeg -i ${vid_vid} -i ${def_aud} -c copy -map 0:v:0 -map 1:a:0 ${aud_vid}`;

          exec(cmd_aud, (error, stdout, stderr) => {
            console.log("process started at smd_auth:" + aud_vid);
            if (error) {
              console.log("error occurs at cmd_aud: " + error);
              // res.send("error: "+ error);
            }
            res.json({aud_vid})
          })
      })
    })

  } catch (error) {
    console.log(error.message)
  }

})


app.listen(8080, () => console.log('server is running on 8080'))