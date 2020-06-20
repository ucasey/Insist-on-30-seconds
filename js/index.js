var whiteBall = document.getElementsByClassName('white')[0]
var spanTimer = document.getElementsByTagName('span')[0]
var flag = true
var num = 0
var runTimer = null
var movePlus = {
    outer: document.getElementsByClassName('outer')[0],
    iWidth: document.getElementsByClassName('outer')[0].offsetWidth,
    iHeight: document.getElementsByClassName('outer')[0].offsetHeight,
    ispeedX: 10,
    ispeedY: 10
}
var yellowArr = []

function init() {
    this.creatBall(this.movePlus);
    this.dragwhiteBall(this.movePlus);
    this.timerRun();
}

function timerRun() {
    runTimer = setInterval(function () {
        num++;
        spanTimer.innerHTML = '坚持了' + num + '秒！'
    }, 1000)
}

function creatBall(obj) {
    var plus = obj;
    function Yellow(plus) {
        //黄色小球基础信息
        this.ball = document.createElement('div');
        this.ball.className = 'yellow';
        plus.outer.appendChild(this.ball);
        this.sumWidth = Math.floor(Math.random() * (plus.iWidth - this.ball.offsetWidth));
        this.ball.style.left = this.sumWidth + 'px';
        this.speedX = Math.floor(Math.random() * plus.ispeedX) + 1;
        this.speedY = Math.floor(Math.random() * plus.ispeedY) + 1;
        this.iWidth = plus.iWidth;
        this.iHeight = plus.iHeight;
    }
    var that = this;
    //创建黄色小球
    var yellowBall = new Yellow(plus);
    //将黄色小球添加到数组中
    this.yellowArr.push(yellowBall);
    //写个定时器，每隔2s产生一个黄色小球
    this.creatTimer = setInterval(function () {
        var yellowBall = new Yellow(plus);
        that.yellowArr.push(yellowBall);
    }, 2000)

    this.moveBall();
}


function moveBall() {
    var that = this;
    //黄色小球不停移动的
    this.gotimer = setInterval(function () {
        for (var i = 0; i < that.yellowArr.length; i++) {
            //在进行移动前，判断下是否触碰了白色小球
            that.crashCheck(that.yellowArr[i]);
            //移动黄色小球
            var newLeft = that.yellowArr[i].speedX + that.yellowArr[i].ball.offsetLeft;
            var newTop = that.yellowArr[i].speedY + that.yellowArr[i].ball.offsetTop;
            //如果碰到墙壁，该方向的速度要取反
            if (newLeft < 0 || newLeft > (that.yellowArr[i].iWidth - that.yellowArr[i].ball.offsetWidth)) {
                that.yellowArr[i].speedX *= -1;
            } else if (newTop < 0 ||newTop > (that.yellowArr[i].iHeight - that.yellowArr[i].ball.offsetHeight)) {
                that.yellowArr[i].speedY *= -1;
            }
            //重新设置小球的位置
            that.yellowArr[i].ball.style.left = newLeft + 'px';
            that.yellowArr[i].ball.style.top = newTop + 'px';
        }
    }, 50)
}



function dragwhiteBall(obj) {
    //鼠标拖拽效果
    var that = this;
    this.whiteBall.onmousedown = function (e) {
        var ePageX = e.pageX;
        var ePageY = e.pageY;
        document.onmousemove = function (e) {
            that.whiteBall.style.left = e.pageX - ePageX + that.whiteBall.offsetLeft + 'px';
            that.whiteBall.style.top = e.pageY - ePageY + that.whiteBall.offsetTop + 'px';
            ePageX = e.pageX;
            ePageY = e.pageY;
            if (that.whiteBall.offsetLeft < 0 && that.flag) {
                //如果超出了左边边线,游戏结束
                that.gameOver()
            } else if (that.whiteBall.offsetLeft > (obj.iWidth - that.whiteBall.offsetWidth) && that.flag) {
                 //如果超出了右边边线,游戏结束
                that.gameOver()
            } else if (that.whiteBall.offsetTop < 0 && that.flag) {
                //如果超出了上边边线,游戏结束
                that.gameOver()
            } else if (that.whiteBall.offsetTop > (obj.iHeight - that.whiteBall.offsetHeight) && that.flag) {
                //如果超出了下边边线,游戏结束
                that.gameOver()
            }
        }
        document.onmouseup = function (e) {
            document.onmousemove = null;
        }
    }
}


function crashCheck(yellow) {
    //判断下白色小球是否碰到黄色小球，是的话，游戏结束
    var yellowX1 = yellow.ball.offsetLeft + Math.floor(yellow.ball.offsetWidth / 2);
    var yellowY1 = yellow.ball.offsetTop + Math.floor(yellow.ball.offsetWidth / 2);
    var whiteX2 = this.whiteBall.offsetLeft + Math.floor(this.whiteBall.offsetWidth / 2);
    var whiteY2 = this.whiteBall.offsetTop + Math.floor(this.whiteBall.offsetWidth / 2);
    var dx = Math.abs(yellowX1 - whiteX2);
    var dy = Math.abs(yellowY1 - whiteY2);
    var dis = Math.floor(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
    var R = this.whiteBall.offsetWidth / 2 + yellow.ball.offsetWidth / 2;
    if (dis < R && this.flag) {
        this.gameOver()
    }
}

function clearTimer() {
    clearInterval(this.gotimer);
    clearInterval(this.runTimer);
    clearInterval(this.creatTimer);
}

function gameOver() {
    this.flag = false
    alert('游戏结束!已经坚持' + this.num + '秒');
    this.clearTimer();
    window.location.reload();
}
init();