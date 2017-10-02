var photoPath = 0;
var parm = 0;
var isAndroid;

if (window.androidApi != null) {
    isAndroid = true;
}
else {
    isAndroid = false;
}

var supportLocalStorage = (isAndroid && window.androidApi.getH5Version() == 0);
var nazaUtils = {
        /**
        * 公用，H5缓存，兼容不支持localStorage安卓机
        * 调用例子: nazaUtils.localStorage.setItem(key, value);
		* @param key    string类型 存入/获取/删除缓存的键
		* @param value string类型 存入缓存的值
		* @author 268076
		* @version 1.0 2015-1-14
		**/
        localStorage: {
            setItem: function(key, value){
                supportLocalStorage ? window.androidApi.setH5Value(key, value) : localStorage.setItem(key, value);
            },
            getItem: function(key){
                return supportLocalStorage ? window.androidApi.getH5Value(key) : localStorage.getItem(key);
            },
            removeItem: function(key){
                supportLocalStorage ? window.androidApi.delH5Value(key) : localStorage.removeItem(key);
            }
        }
}

/*获取地址栏后面的参数*/
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].substr(strs[i].indexOf('=')+1));
        }
    }
    return theRequest;
}
//返回重新登录方法
function backToLogin(data){    
    if(data.errorCode != undefined && data.errorCode == 9999){
        if(isAndroid){
              window.androidApi.backToLogin();
        }else{
            window.location = "js:TC//backToLogin()";
        }
        return;
    }
}

//调用选取照片功能
function selectImage(){
    if(isAndroid){
        window.androidApi.selectImage();
    }else{
        window.location = "js:TC//selectImage()";
    }
    
}

//调用选取照片功能
function selectImage(parm){
    if(parm==null || parm== undefined){
        if(isAndroid){
            window.androidApi.selectImage();
        }else{
            window.location = "js:TC//selectImage()";
        }
    }else{
        if(isAndroid){
            window.androidApi.selectImage(parm);
        }else{
            window.location = "js:TC//selectImage("+parm+")";
        }
    }
}
//个人中心调用选取照片功能
function selectImageNew(parm){
    if(parm==null || parm== undefined){
        if(isAndroid){
            window.androidApi.selectImageNew();
        }else{
            window.location = "js:TC//selectImage()";
        }
    }else{
        if(isAndroid){
            window.androidApi.selectImageNew(parm);
        }else{
            window.location = "js:TC//selectImage("+parm+")";
        }
    }
};
//个人中心单个头像调用 
// function selectCrmImage(){
//      if(isAndroid){
//         window.androidApi.selectCrmImage();
//     }
// }
//调用GPS
function openGetGps() {
    if (isAndroid) {
        gpsCallBack(window.androidApi.openGetGps());
    }
    else {
        window.location = "js://openGetGps()";
    }
}
//读取通讯录
function readContactList() {
    if (isAndroid) {
        //window.androidApi.readContactList()
        contactCallBack(window.androidApi.readContactList());
    }
    else {
        window.location = "js://readContactList()";
    }
}
//录入联系人
function writeContact() {
    if (isAndroid) {
        a(window.androidApi.writeContact("{\"contactName\":\"阿布\",\"phoneNumber\":\"159357123\",\"email\":\"123@456.com\",\"company\":\"公司\",\"address\":\"地址\"}"
        ));
    }
    else {
        window.location = "js://writeContact()";
    }
}

//修改联系人
function modifyContact() {

    if (isAndroid) {
        c(window.androidApi.modifyContact("{\"contactId\":\"601\",\"contactName\":\"阿布不\",\"phoneNumber\":\"159357456\",\"email\":\"123@654.com\",\"company\":\"公司改\",\"address\":\"地址改\"}"));
    }
    else {
        window.location = "js://modifyContact()";
    }
}
//删除联系人
function deleteContact() {
    if (isAndroid) {
        b(window.androidApi.deleteContact("601"));
    }
    else {
        window.location = "js://deleteContact()";
    }
}
//调摄像头
function openCamera() {
	photoPath = new Date().getTime()+"_"+parm;
	parm++;
    if (isAndroid) {

        window.androidApi.openCamera("data/photo/" + photoPath + ".png");     //android摄像头
    }
    else {
        window.location = "js:TC//openCamera('"+photoPath+".jpeg')";
    }
}
//二维码
function openScan() {
    if (isAndroid) {
        window.androidApi.openScan();     //android摄像头
    }
    else {
        window.location = "js:TC//openScan()";
    }
}


//语音识别
function openVoice() {

    if (isAndroid) {

        window.androidApi.openVoice();     //android摄像头

    }
    else {
        window.location = "js://openVoice()";
    }
}
//打电话
function openPhoneNumber(phone){
    if(isAndroid){
        window.androidApi.tellcallback(phone);
    }else{
        window.location = "js:TC//call('"+phone+"')";
    }
}
//数据转发提交（同步）
function submit(url, data, httpType) {

    if (isAndroid) {


        submitCallBack(window.androidApi.submit(url, data, httpType));

    }
    else {
        window.location = "js://submit(" + url + "," + data + "," + httpType + ")";
    }
}

//数据转发提交(异步)
function ajaxSubmit(url, data, httpType) {

    if (isAndroid) {


        window.androidApi.ajaxSubmit(url, data, httpType);

    }
    else {
        window.location = "js://ajaxSubmit(" + url + "," + data + "," + httpType + ")";
    }
}

function encrptyDataAnddeciphering(str) {
    deciphering(str);

    encrptyData(str);
}


//数据解密
function deciphering(str) {

    if (isAndroid) {


        window.androidApi.deciphering(str);

    }
    else {
        window.location = "js://deciphering(str)";
    }
}
//数据加密
function encrptyData(str) {

    if (isAndroid) {


        window.androidApi.encrptyData(str);

    }
    else {
        window.location = "js://deciphering(str)";
    }
}
/**
* ===== 通知栏消息定时推送 =====
* @param argObj 定时器参数对象 
* argObj 格式说明 
argObj = {
    pushStatus: 1, // 推送开关 int类型，1—开启，0—关闭
    repeatDate: ["2015-09-02 18:15", "2015-09-03 18:15", "2015-09-04 18:15", "2015-09-05 18:15", "2015-09-07 18:15", "2015-09-08 18:15"], // 推送重复周期 array类型 当前日期+后面的日期的周期
    pushContent: "测试消息通知内容" // 推送内容，string类型
}
*
*/
function pushNotificationTimer(argObj){
    if (isAndroid) {
        window.androidApi.pushNotificationTimer(JSON.stringify(argObj));
    }else {
        window.location = "js-call://IOS/pushNotificationTimer("+JSON.stringify(argObj)+")";
    }
}

