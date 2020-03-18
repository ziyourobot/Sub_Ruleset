/*去水印测试
[Script]
http-response ^https?://.*\.snssdk\.com/bds/feed/stream/ requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/Liquor030/Sub_Ruleset/master/Script/Super.js
[MITM]
hostname = *.snssdk.com
*/
var obj = $response.body.replace(/{\"cell_type\":2.*?_info\":null},?/g,'');
obj = obj.replace(/\"can_download\":(false|null)/g,'\"can_download\":true');
obj = obj.replace(/\"video_download\":(.*?)\"url_list\":\[(.*?)\](.*?)\"(video_high|video_fallback)\":(.*?)\"url_list\":\[(.*?)\]/g,'"video_download":$1"url_list":[$6]$3"$4":$5"url_list":[$6]');


/*修复版  备用
[Script]
http-response ^https?://.*\.snssdk\.com/bds/feed/stream/ requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/Liquor030/Sub_Ruleset/master/Script/Super.js

[MITM]
hostname = *.snssdk.com
*/
var obj = $response.body.replace(/:(\d{19})/g,':\"$1str\"');
obj = JSON.parse(obj);
if (obj.data.data) {
  for (var i = obj.data.data.length - 1; i >= 0; i--) {
    if (obj.data.data[i].ad_info != null) {
      obj.data.data.splice(i, 1);
    }
  }
}
obj = JSON.stringify(obj);
obj = obj.replace(/:\"(\d{19})str\"/g,':$1');
obj = obj.replace(/tplv-ppx-logo.image/g,'0x0.gif');
var body = obj.replace(/tplv-ppx-logo/g,'0x0');
$done({body});
