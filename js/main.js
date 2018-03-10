function writeCode(prefix, code, callback) {
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(() => {
        n++
        //innerHtml会覆盖
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n > code.length) {
            window.clearInterval(id)
            callback && callback.call()
        }
    }, 100)
}

function writeMarkdown(markdown, callback) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let id = setInterval(() => {
        n++
        //innerHtml会覆盖
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n > markdown.length) {
            window.clearInterval(id)
            callback && callback.call()
        }
    }, 50)
}

var result = `
    /*
     * 面试官你好，我是XXX
     * 我将以动画的形式来介绍我自己
     * 只用文字介绍太单调了，
     * 我就用代码来介绍吧
     * 首先准备一些样式
    */
    *{transition:all 1s;}
    html{
        background:rgb(222,222,222);
        font-size:16px;
    }
    #code{
        border:1px solid #aaa;
        padding:16px;
    }
    /*加点代码高亮*/
    .token.selector{color:#690;}
    .token.property{color:#905;}
    /*加点效果*/
    #code{
        animation:breath 0.5s infinite alternate-reverse;
        position:fixed;
        left:0;
        width:50%;
        height:100%;
    }
    /*我需要一张白纸*/
    #paper{
        position:fixed;
        right:0;
        width:50%;
        height:100%;
        background:#000;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:16px;
    }
    #paper > .content{
        background:white;
        height:100%;
        width:100%;
    }
`
var result2 = `
`
var markdown = `
# 自我介绍

我叫 xxx
1996年8月出生
广州中医药大学读计算机
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

QQ XXXXXXXXX
电话 XXXXXXX
MAIL XXXXXXX
`
var end = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 * /
`
writeCode('', result, () => {
    //创建paper
    createPaper(() => {
        writeCode(result, result2,()=>{
            writeMarkdown(markdown,()=>{
                writeCode(result+result2,end,()=>{
                    console.log('完成')
                })
            })
        })
    })
})

function createPaper(callback) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.classList.add('content')
    paper.appendChild(content)
    document.body.appendChild(paper)
    callback.call()
}