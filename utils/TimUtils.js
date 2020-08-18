var app = getApp();
var tim = app.getTim();
var TxTim = app.getTxTim();
class TimUtils{
  constructor(){

  }
  LoginTim(){
    let promise = tim.login({userID: 'test006', userSig:'eJwtzMEKgkAUheF3mW1h1xlHGcFFVJsyA5NWbYQ7yqUabJxEid49UZfnO-B-WZFevU5bFjPuAVtPm1AbRxVN7HTrAMLlavFRNg0hi-0AIPCFlGJ*dN*Q1aNLKTkAzOroNZmKhFJhpJYK1WP55Pb3jV2d32n*yQmzDIcjIi8v*lYNXV8Mh53Nn8Y3W6oT9vsDrq8zHQ__'});
    promise.then(function(imResponse) {
    console.log(imResponse.data); // 登录成功
    if (imResponse.data.repeatLogin === true) {
      // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
      console.log(imResponse.data.errorInfo);
      }
    }).catch(function(imError) {
      console.warn('login error:', imError); // 登录失败的相关信息
    });
  }
  //创建文本消息
  createTxtMsg(userName,content,callBack){
    let message = tim.createTextMessage({
      to: userName,
      conversationType: TxTim.TYPES.CONV_C2C,
      payload: {
        text: content
        }
      });
      this.sendMessage(message,callBack);
  }
  //创建图片消息
  createImageMsg(userName,callBack){
    let that = this;
    wx.chooseImage({
      sourceType: ['album','camera'], // 从相册选择
      count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
      success: function (res) {
        // 2. 创建消息实例，接口返回的实例可以上屏
        let message = tim.createImageMessage({
          to: userName,
          conversationType: TxTim.TYPES.CONV_C2C,
          payload: { file: res },
          onProgress: function(event) { console.log('file uploading:', event) }
        });
        // 3. 发送图片
        that.sendMessage(message,callBack);
      }
    });
   
  }
  //创建视频消息
  createVideoMsg(userName,callBack){
    let that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // 来源相册或者拍摄
      maxDuration: 60, // 设置最长时间60s
      camera: 'back', // 后置摄像头
      success (res) {
        // 2. 创建消息实例，接口返回的实例可以上屏
        let message = tim.createVideoMessage({
          to: userName,
          conversationType: TxTim.TYPES.CONV_C2C,
          payload: {
            file: res
          }
        });
        that.sendMessage(message,callBack);
      }
    })
  }
  //创建语音消息
  createAudioMsg(userName,res,callBack){
    wx.showToast({
      title: '创建语音消息',
    })
    const message = tim.createAudioMessage({
      to: userName,
      conversationType: TxTim.TYPES.CONV_C2C,
      payload: {
        file: res
      },
      onProgress: function(event) { console.log('file uploading:', event) }
    });
    this.sendMessage(message,callBack);
  }
  //发送消息
  sendMessage(message,callBack){
    let promise = tim.sendMessage(message);
    promise.then(function(imResponse) {
      // 发送成功
      console.log(imResponse);
      wx.showToast({
        title: '消息发送成功',
        icon:"none"
      });
      callBack(imResponse);
    }).catch(function(imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
      wx.showToast({
        title: '消息发送失败',
        icon:"none"
      });
    });
  }

  //获取会话列表
  getConversationList(callBack){
    let that = this;
    // 拉取会话列表
    let promise = tim.getConversationList();
    promise.then(function(imResponse) {
      const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
      callBack(conversationList);
    }).catch(function(imError) {
      console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
    });
  }
  getConversationInfo(conversationID){
    let promise = tim.getConversationProfile(conversationID);
    promise.then(function(imResponse) {
      console.log("获取成功");
      console.log(imResponse);
      // 获取成功
      console.log(imResponse.data.conversation); // 会话资料
    }).catch(function(imError) {
      console.warn('getConversationProfile error:', imError); // 获取会话资料失败的相关信息
    });
  }
  //获取消息列表
  getMessageList(conversationID,callBack){
    let promise = tim.getMessageList({conversationID: conversationID, count: 15});
    promise.then(function(imResponse) {
      const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      callBack(messageList,nextReqMessageID,isCompleted);
      
    });
  }
  getMessageListMore(conversationID,nextReqMessageID,callBack){
    let promise = tim.getMessageList({conversationID: conversationID, nextReqMessageID, count: 15});
    promise.then(function(imResponse) {
      const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      callBack(messageList,nextReqMessageID,isCompleted);
    });
  }
  onReceiveEvent(receiveId,event){
    tim.on(receiveId, event);
  }
  offReceiveEvent(receiveId,event){
    tim.off(receiveId, event);
  }
}
export{TimUtils}