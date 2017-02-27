//index.js
let timer;
let numAi = 0;
Page({
  data: {
    btnState: true,
    winNum: 0,
    imageAiScr: '',
    imageUserScr: '/pages/images/lufei.png',
    gameResult: '',
    srcs: [
      '/pages/images/bu.png',
      '/pages/images/jiandao.png',
      '/pages/images/shitou.png',
    ]
  },

  onLoad: function () {
    let oldWinNum = wx.getStorageSync('winNum')
    if (oldWinNum != null && oldWinNum != '') {
      this.setData({ winNum: oldWinNum })
    }
    this.timerGo();
  },
  changeForChoose(e) {
    if (!this.data.btnState) {
      return;
    }
    clearInterval(timer);
    this.setData({
      imageUserScr: this.data.srcs[e.currentTarget.id]
    })
    let user = this.data.imageUserScr;
    let ai = this.data.imageAiScr;
    let num = this.data.winNum;
    let str = "你输了";
    if (user == "/pages/images/bu.png" && ai == "/pages/images/shitou.png") {
      num++;
      str = "你赢了";
      wx.setStorageSync(
        'winNum', num
      )
    }

    if (user == "/pages/images/shitou.png" && ai == "/pages/images/jiandao.png") {
      num++;
      str = "你赢了";
      wx.setStorageSync(
        'winNum', num
      )
    }

    if (user == "/pages/images/jiandao.png" && ai == "/pages/images/bu.png") {
      num++;
      str = "你赢了";
      wx.setStorageSync(
        'winNum', num
      )
    }

    if (user == ai) {
      str = "平局";
    }
    this.setData({
      winNum: num,
      gameResult: str,
      btnState: false,
    })
  },

  timerGo() {
    timer = setInterval(this.move, 300)
  },
  move() {
    if (numAi >= 3) {
      numAi = 0
    }
    numAi=parseInt(Math.floor(Math.random()*3)); 
    this.setData({ imageAiScr: this.data.srcs[numAi] })
    numAi++;
  },
  again() {
    if (this.data.btnState) {
      return;
    }
    this.timerGo();
    this.setData({
      btnState: true,
    })
  }
})
