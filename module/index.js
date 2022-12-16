// const genVid = async (req, res) => {
//     try {
//       // console.log("bpdy oin genvid: " + req.file);
//       // console.log(req.body.start_base64Data)
//       var matches1 = req.body.start1_base64Data.match(
//         /^data:([A-Za-z-+/]+);base64,(.+)$/
//       );
//       // var matches2 = req.body.start2_base64Data.match(
//       //   /^data:([A-Za-z-+/]+);base64,(.+)$/
//       // );
  
//       response1 = {};
//       // response2 = {};
  
//       if (matches1.length !== 3) {
//         return new Error("Invalid input string");
//       }
//       // if (matches2.length !== 3) {
//       //   return new Error("Invalid input string");
//       // }
//       response1.type = matches1[1];
//       response1.data = new Buffer(matches1[2], "base64");
//       let decodedImg1 = response1;
//       let imageBuffer1 = decodedImg1.data;
  
//       // response2.type = matches2[1];
//       // response2.data = new Buffer(matches2[2], "base64");
//       // let decodedImg2 = response2;
//       // let imageBuffer2 = decodedImg2.data;
//       // let type = decodedImg.type;
//       // console.log(type)
//       // let extension = mime.getExtension(type);
//       let fileName1 = Date.now() + "1.png";
//       // let fileName2 = Date.now() + "2.png";
  
//       try {
//         fs.writeFileSync("./public/uploads/" + fileName1, imageBuffer1, "utf8");
//         // fs.writeFileSync("./public/uploads/" + fileName2, imageBuffer2, "utf8");
  
//         // return res.send({"status":"success"});
//       } catch (e) {
//         next(e);
//       }
//       // console.log("file name is" + fileName)
  
//       var uid = req.body.uid;
//       // let user_main_langauge = await Doctor.findOne({ _id: req.body.uid }).select(
//       //   "language"
//       // );
  
//       var userImg1 = "./public/uploads/" + fileName1;
//       // var userImg2 = "./public/uploads/" + fileName2;
  
//       console.log("user img is" + userImg1);
//       //file names:
//       var img_vid_path1 = Date.now() + "_img1.mp4";
//       var img_vid_path2 = Date.now() + "_img2.mp4";
  
//       var img_vid = "./public/videos/" + Date.now() + "_img1.mp4";
//       // var img_vid2 = "./public/videos/" + Date.now() + "_img2.mp4";
  
//       var vid_vid = "./public/videos/" + Date.now() + "_vid.mp4";
//       var aud_vid = "./public/videos/" + Date.now() + "_aud.mp4";
//       var fil_vid = "./public/videos/" + Date.now() + "_fil.txt";
//       var def_vid = "english.mp4";
//       // // var def_vid = user_main_langauge.language + ".mp4";
//       // var last_vid =
//       //   "./public/videos/" + user_main_langauge.language + "last.mp4";
  
//       var def_aud = "./public/videos/" + "english.aac";
//       var output = "./public/videos/output.mp4";
//       var del_vid = [];
//       // del_vid.push(aud_vid);
//       del_vid.push(vid_vid);
//       del_vid.push(img_vid);
//       // del_vid.push(img_vid2);
//       del_vid.push(fil_vid);
//       del_vid.push(userImg1);
//       // del_vid.push(userImg2);
//       // del_vid.push(aud_vid);
  
//       file_content =
//         "file " +
//         def_vid +
//         "\nfile " +
//         img_vid_path1 +
//         "\n";
//       // file_content =
//       //   "file " +
//       //   img_vid_path1 +
//       //   "\nfile " +
//       //   def_vid +
//       //   "\nfile " +
//       //   img_vid_path2 +
//       //   "\n";
//       fs.writeFileSync(fil_vid, file_content);
  
//       // console.log("bpdy oin genvid: " + JSON.stringify(req.body));
//       // Doctor.findOneAndUpdate({ _id: uid }, { $set: { croped_file: req.file.filename } }, (err, docs) => {
//       //   if (err) throw new Error("error in save");
//       //   console.log("saved");
//       // });
//       // console.log("doctor: "+ doctor);
//       console.log("file is " + userImg1);
//       var cmd_img = `ffmpeg -loop 1 -i ${userImg1} -c:v libx264 -t 5 -pix_fmt yuv420p -vf scale=1000:1000  ${img_vid}`;
//       // var cmd_img = `ffmpeg -i "./public/videos/first.mp4" -i ${userImg1}  -filter_complex "[0:v][1:v] overlay=25:25:enable='between(t,0,20)'"  -pix_fmt yuv420p -c:a copy  ${img_vid}`;
//       exec(cmd_img, (error, stdout, stderr) => {
//         console.log("img_vid " + img_vid);
//         console.log("Process started at cmd_img");
//         if (error) {
//           console.log("error occurs at cmd_img : " + error);
//           // res.send("error: "+ error);
//         }
//         console.log("success video of img.");
  
  
//         var cmd_vid = `ffmpeg -safe 0 -f concat -i ${fil_vid} -c copy ${vid_vid}`;
  
//         exec(cmd_vid, (error, stdout, stderr) => {
//           console.log("vid_vid " + vid_vid);
//           console.log("process started at cmd_vid");
//           if (error) {
//             console.log("error occurs at cmd_vid: " + error);
//             // res.send("error: " + error);
//           }
  
//           console.log("success video without audio");
//           var cmd_aud = `ffmpeg -i ${vid_vid} -i ${def_aud} -c copy -map 0:v:0 -map 1:a:0 ${aud_vid}`;
//           exec(cmd_aud, (error, stdout, stderr) => {
//             console.log("process started at smd_auth:" + aud_vid);
//             if (error) {
//               console.log("error occurs at cmd_aud: " + error);
//               // res.send("error: "+ error);
//             }
//             console.log("aws key is " + aud_vid);
//             var aws_key = path.parse(aud_vid).base;
//             try {
//               const fileContent = fs.readFileSync(aud_vid);
//               var aws_key = path.parse(aud_vid).base;
//               console.log("aws key is " + aws_key);
//               var params = {
//                 Bucket: process.env.AWS_BUCKET_NAME_VIDEO,
//                 Key: aws_key,
//                 Body: fileContent,
//                 ACL: "public-read",
//                 //got buffer by reading file path
//               };
//               const spacesEndpoint = new aws.Endpoint(process.env.S3_END_POINT);
//               const s3 = new aws.S3({
//                 secretAccessKey: process.env.AWS_SECRET,
//                 accessKeyId: process.env.AWS_ID,
//                 endpoint: spacesEndpoint,
//                 // region: "us-east-2",
//               });
//               s3.putObject(params, function (err, data) {
//                 console.log(err, data);
//                 res.json({ ok: true, name: aws_key });
//               });
//             } catch (error) {
//               console.log(error);
//             }
  
//             console.log("success video with audio -> deleting");
//             //  fs.unlink(userImg1, (err) => {
//             //    if (err) throw new Error;
//             //    console.log(userImg1 + "was deleted")
//             //  })
//             //  fs.unlink(userImg2, (err) => {
//             //   if (err) throw new Error;
//             //   console.log(userImg1 + "was deleted")
//             // })
//             //  fs.unlink(img_vid, (err) => {
//             //    if (err) throw err;
//             //   console.log(img_vid + " was deleted");
//             //  });
//             //  fs.unlink(fil_vid, (err) => {
//             //    if (err) throw err;
//             //    console.log(fil_vid + " was deleted");
//             //  });
//             //  fs.unlink(vid_vid, (err) => {
//             //    if (err) throw err;
//             //    console.log(vid_vid + " was deleted");
//             //  });
  
//             // // res.redirect('/str')
  
//             setTimeout(() => {
//               console.log("in setinterval video");
//               del_vid.forEach((aud_vid) => {
//                 if (fs.existsSync(aud_vid)) {
//                   fs.unlink(aud_vid, (err) => {
//                     if (err) throw err;
//                     console.log(aud_vid + " was deleted");
//                   });
//                 }
//               });
//               del_vid.length = 0;
//             }, 30000);
//           });
//         });
//       });
//     } catch (error) {
//       console.log(
//         "error @GEN VID ################################" + error.message
//       );
//     }
//   };