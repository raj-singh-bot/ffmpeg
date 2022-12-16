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
  const file = (req.files.file)
  console.log(file)
  file.mv('tmp/' + file.name , (err) => {
    if(err) return res.status(400).json({err})
    console.log('uploaded success')
  })

  const img = (__dirname + '/tmp/9603.png')
  let fileOfVideos =  (__dirname + "/public/videos/1671173056756_fil.txt");
  const imgVid = __dirname + "/public/imgVideo/" + Date.now() + "_aud.mp4"
  const vid = (__dirname + '/public/english.mp4')
  const aud = (__dirname + '/public/english.aac')
  // console.log(vid)
  // console.log(aud)
  const imageVid = (__dirname + '/public/imgVideo/1671167921318_aud.mp4')
  let aud_vid = (__dirname + '/public/videos/1671167107763_aud.mp4')
  let outVid = __dirname + "/public/videos/" + Date.now() + "_aud.mp4"
  let newFile = __dirname + "/public/videos/" + Date.now() + ".mp4"
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
  

  let cmd4 =`ffmpeg -safe 0 -f concat -i ${fileOfVideos} -i ${aud} -c:v copy -map 0:v:0 -map 1:a:0 ${newFile}`

  exec(cmd4, (error,stdout, stderr) => {
    if(error){
      console.log('error',stderr);
      throw error
    }
    console.log('video created', stdout);
    res.status(200).send('video created')
  })

})


app.listen(8000, () => console.log('server is running on 8000'))