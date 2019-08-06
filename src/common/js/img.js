function putb64(){
    var pic = "填写你的base64后的字符串";
    var url = "http://upload.qiniu.com/putb64/17864"; //非华东空间需要根据注意事项 1 修改上传域名
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
      if (xhr.readyState==4){
        document.getElementById("myDiv").innerHTML=xhr.responseText;
      }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken  填写你从服务端获取的上传token");
    xhr.send(pic);
  }