<template>
    <div class="greet">
        <div class="main">
            <canvas id="canvas"></canvas>
            <div class="house">
                <div class="door" @mouseover="openDoor" @mouseout="closeDoor" @click="comein">
                    <div id="odoor"></div>
                </div>
            </div>
            <div class="grass"><div></div></div>

            <transition name="slide-fade">
                <div id="title" v-if="title">Welcome &nbspto &nbspCheese Yu's &nbspHome</div>
            </transition>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .clearfix() {
        &:after, &:before {
            content: '';
            display: block;
            clear: both;
        }
    }
    .main {
        width: 100%;
        height: 100vh;
        position: relative;
        background: radial-gradient(ellipse at left bottom, #1B2735 0%, #090A0F 100%);;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .clearfix();
    }
    #canvas {
        width: 300%;
        height: 300%;
        position: absolute;
        animation: star-rotate 200s linear infinite;
    }
    .grass{
        width: 100%;
        height:40px;
        background:#000;
        position:  absolute;
        bottom: 0;
    }
    .house{
        width:150px;
        height:100px;
        background:#000;
        position:absolute;
        bottom:40px;
        left:10%;
        &:before{
            width:120px;
            height:120px;
            background:#000;
            content:'';
            position:absolute;
            left:15px;
            top:-50px;
            transform:rotate(45deg);
        }
    }

    .door {
        position:absolute;
        cursor: pointer;
        width:40px;
        height:70px;

        border: solid 1px #fff;
        border-top-right-radius:20px;
        border-top-left-radius:20px;
        bottom:0;
        left:50px;
    }
    #odoor {
        width:40px;
        height:70px;

        background:#fff;
        border-top-right-radius:18px;
        border-top-left-radius:18px;
        transform-origin:0 20px;
        transform: perspective(100px);
        transition: all ease .7s;
    }

    #title {
        position: absolute;
        font-size: 2.5em;
        color: azure;
    }

    @media screen and (max-width: 500px) {
        #title {
            font-size: 1em;
        }
    }

    @keyframes star-rotate{
        0%{
            transform:rotate(0);
        }
        100%{
            transform:rotate(-360deg);
        }
    }

    .slide-fade-enter-active {
        transition: all .7s ease;
    }
    .slide-fade-enter {
        transform: translateY(50px);
        opacity: 0;
    }
</style>
<script type="text/babel">

    export default{
        data(){
            return{
                title: false
            }
        },
        mounted: function () {
            this.drawStar();
        },
        methods: {
            star(cxt,x,y,r,R,rot){ // x,y为圆心坐标；R、r分别为大圆、小圆半径；rot为旋转角度。
                cxt.beginPath();
                for(var i = 0; i < 5; i ++){
                    cxt.lineTo( Math.cos( (18 + i*72 - rot)/180 * Math.PI) * R + x,
                            -Math.sin( (18 + i*72 - rot)/180 * Math.PI) * R + y)
                    cxt.lineTo( Math.cos( (54 + i*72 - rot)/180 * Math.PI) * r + x,
                            -Math.sin( (54 + i*72 - rot)/180 * Math.PI) * r + y)
                }
                cxt.closePath();
                cxt.lineWidth = 1.5;
                cxt.fillStyle = "#fff";
                cxt.strokeStyle = "#fff";

                cxt.fill();
                cxt.stroke();
            },
            blink(cxt,x,y,r,R,rot) {  //闪烁功能
                cxt.beginPath();
                for(var i = 0; i < 5; i ++){
                    cxt.lineTo( Math.cos( (18 + i*72 - rot)/180 * Math.PI) * R + x,
                            -Math.sin( (18 + i*72 - rot)/180 * Math.PI) * R + y)
                    cxt.lineTo( Math.cos( (54 + i*72 - rot)/180 * Math.PI) * r + x,
                            -Math.sin( (54 + i*72 - rot)/180 * Math.PI) * r + y)
                }
                cxt.closePath();
                cxt.lineWidth = 3;
                cxt.fillStyle = "#1B2735";
                cxt.strokeStyle = "#1B2735";
                cxt.stroke();
                cxt.fill();

                setTimeout(() => {
                    this.star(cxt,x,y,r,R,rot);
                }, 100);
            },
            drawStar() {
                let canvas = document.getElementById("canvas");
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                var cxt=canvas.getContext("2d");

                for (let i = 0 ; i<400; i++) { //大星星
                    //分布范围
                    let x = Math.random()*(canvas.width-10)+5;
                    let y = Math.random()*(canvas.height-10)+5;
                    //星星半径
                    let r = Math.random()*1.5;
                    let R = r*3;
                    let rot = Math.random()*89;
                    this.star(cxt,x,y,r,R,rot);
                }
                for (let i = 0 ; i<400; i++) {  //小星星
                    //分布范围
                    let x = Math.random()*(canvas.width-10)+5;
                    let y = Math.random()*(canvas.width-10)+5;
                    //星星半径
                    let r = Math.random()*0.3;
                    let R = r*3;
                    let rot = Math.random()*89;
                    this.star(cxt,x,y,r,R,rot);
                    setInterval(() => {
                        if (Math.random() > 0.9) {
                            this.blink(cxt,x,y,r,R,rot);
                        }
                    }, 1000 * (Math.random()+1));
                }
            },
            openDoor() {
                let door = document.getElementById("odoor");
                door.style.transform = "perspective(100px) rotateY(45deg)";
                this.title = true;
            },
            closeDoor() {
                let door = document.getElementById("odoor");
                door.style.transform = "perspective(100px)";
            },
            comein() {
              this.$emit("close")
            }
        }
    }
</script>
