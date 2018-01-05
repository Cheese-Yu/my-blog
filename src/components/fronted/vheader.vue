<template lang="html">
    <div id="header" class="bg1">
        <div class="ongray">
            <div class="out">
                <div class="basic">
                    <img class="pto" src="../../assets/img/4546.jpg">
                    <div class="content">
                        <h3>Cheese Yu</h3>
                        <p>前端开发工程师</p>
                        <a class="github" title="Visit me on Github" href="https://github.com/Cheese-Yu">
                            <svg class="octicon octicon-mark-github" height="24" viewBox="0 0 16 16" width="24">
                                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <p class="intro">本科学的环境科学（植物相关）,擅长物理数学。性格大大咧咧（懒得管你）而又不失缜密。喜欢应用型知识,喜欢极客（但是不懂技术）,欢迎一起跳入前端大坑。</p>
                <div class="select">
                    <router-link to="/blog">博客</router-link>
                    <router-link to="/tags">标签</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/babel">

    export default {
        data () {
            return {

            }
        },
        mounted: function () {
            let curIndex = 0;
            let arr = [];
            arr[0]="bg1";
            arr[1]="bg2";
            arr[2]="bg3";
            arr[3]="bg4";
            arr[4]="bg5";

            function changeBg() {
                let obj = document.getElementById("header");
                if (curIndex == arr.length-1)
                {
                    curIndex=0;
                }
                else
                {
                    curIndex+=1;
                }
                if (obj) {
                    obj.className = arr[curIndex];
                }
            }
            setInterval(changeBg,5000)
        },
        methods: {
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .clearfix() {
        &:after, &:before {
            content: '';
            display: block;
            clear: both;
        }
    }
    .home {
        color: #eee;
    }
    #header {
        color: #eee;
        .clearfix();
        position: fixed;
        z-index: 1000;
        width: 26%;
        height: 100%;
        float: left;
        background-repeat: no-repeat;
        background-size: cover;
        .ongray {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            .out {
                padding: 4rem 0;
                text-align: center;
                .pto {
                    height: 75px;
                    width: 75px;
                    margin: 10px;
                    border-radius: 100%;
                    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0 2px 20px 3px rgba(0, 0, 0, 0.25);
                }
                .content {
                    margin: 15px 0;
                    h3 {
                        font-size: 2.4rem;
                        line-height: 2.4rem;
                    }
                    p {
                        font-size: 1.5rem;
                        line-height: 1.2;
                    }
                    svg {
                        margin: 9px 0;
                    }
                }
                .intro {
                    padding: 1rem 3rem;
                    font-size: 1.6rem;
                    line-height: 1.5;
                    text-align: justify;
                    span {
                        text-decoration: line-through;
                    }
                }
            }
        }
        a {
            font-size: 1.6rem;
            margin: 0 20px;
            color: #eee;

            & :visited {
                color: #eee;
            }
            &:hover {
                color: #f39c12;
            }
        }
        .router-link-active {
            color: #f39c12;
        }
        .select {
            padding-top: 5em;
        }
    }

    .bg1 {
        background: url("../../assets/img/bg1.jpg");
    }
    .bg2 {
        background: url("../../assets/img/bg2.jpg");
    }
    .bg3 {
        background: url("../../assets/img/bg3.jpg");
    }
    .bg4 {
        background: url("../../assets/img/bg4.jpg");
    }
    .bg5 {
        background: url("../../assets/img/bg5.jpg");
    }


    @media screen and (max-width: 800px) {
        #header {
            position: relative;
            width: 100%;
            height: 250px;
            .ongray {
                position: relative;
                .out {
                    padding: 1.5rem;
                    .pto {
                        max-width: 50px;
                        max-height: 50px;
                    }
                    .basic {
                        padding-bottom: .8rem;
                    }
                    .content {
                        margin: 0;
                    }
                    .intro {
                        display: none;
                    }
                    .select {
                        padding-top: 0;
                    }
                }
            }
        }
    }
</style>
