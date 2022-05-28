// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: magic;

 

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule
const { Base } = require("./「小件件」开发环境")


// @组件代码开始
class Widget extends Base {
  /**
   * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
   * @param {string} arg 自定义参数
   */
  constructor (arg) {
    super(arg)
    this.url = 'http://boxjs.net/#/app/xream.10010v3'

    this.getRealtimeData = async () => {
      console.log('getRealtimeData from http://10010.json')
      try {
        const req = new Request('http://10010.json')
        req.timeoutInterval = 10
        req.method = 'GET'
        const res = await req.loadJSON()
        console.log(res)
        return res
      } catch (e) {
        console.error(e)
      }
    }

    this.getBoxjsData = async () => {
      console.log('getBoxjsData from http://boxjs.net/query/boxdata')
      try {
        const req = new Request('http://boxjs.net/query/boxdata')
        req.timeoutInterval = 10
        req.method = 'GET'
        const res = await req.loadJSON()
        console.log(res)
        const detail = res.datas["@xream.10010.detail"]
        console.log(detail)
        return JSON.parse(detail)
      } catch (e) {
        console.error(e)
      }
    }
  }


  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render () {
    const [realtimeData, boxjsData] = await Promise.all([this.getRealtimeData(), this.getBoxjsData()])
    let data = {
      msg: {
        title: '未获取到数据',
        subtitle: '请确保 http://10010.json',
        body: '或 http://boxjs.net 正常',
      }
    }

    if (realtimeData) {
      console.log(`使用实时数据`)
      data = realtimeData
    } else if(boxjsData){
      console.log(`使用 boxjs 缓存数据`)
      data = boxjsData
    }
    
    return await this[`${this.widgetFamily}Widget`]({ data, url: this.url })
  }

  /**
   * 渲染小尺寸组件
   */
  async smallWidget ({url, data}) {
    const w = new ListWidget()
    

    w.addSpacer();
   
    const titleText = w.addText(data.msg.title)
    titleText.font = Font.boldSystemFont(12)
    titleText.textColor = Color.dynamic(Color.black(), Color.white())
    titleText.centerAlignText()
    titleText.textOpacity = 0.5
      
    w.addSpacer()

    const subtitleText = w.addText(data.msg.subtitle)
    subtitleText.font = Font.boldSystemFont(12)
    subtitleText.textColor = Color.dynamic(Color.black(), Color.white())
    subtitleText.centerAlignText()
    subtitleText.textOpacity = 0.75
      
    w.addSpacer()

    const bodyText = w.addText(data.msg.body)
    bodyText.font = Font.boldSystemFont(12)
    bodyText.textColor = Color.dynamic(Color.black(), Color.white())
    bodyText.centerAlignText()
    bodyText.textOpacity = 0.75
      
    w.addSpacer()
    
    w.url = url
    return w
  }
  /**
   * 渲染中尺寸组件
   */
  async mediumWidget ({url, data}) {
    const w = new ListWidget()
    

    w.addSpacer();
   
    const titleText = w.addText(data.msg.title)
    titleText.font = Font.boldSystemFont(12)
    titleText.textColor = Color.dynamic(Color.black(), Color.white())
    titleText.centerAlignText()
    titleText.textOpacity = 0.5
      
    w.addSpacer()

    const subtitleText = w.addText(data.msg.subtitle)
    subtitleText.font = Font.boldSystemFont(12)
    subtitleText.textColor = Color.dynamic(Color.black(), Color.white())
    subtitleText.centerAlignText()
    subtitleText.textOpacity = 0.75
      
    w.addSpacer()

    const bodyText = w.addText(data.msg.body)
    bodyText.font = Font.boldSystemFont(12)
    bodyText.textColor = Color.dynamic(Color.black(), Color.white())
    bodyText.centerAlignText()
    bodyText.textOpacity = 0.75
      
    w.addSpacer()
    
    w.url = url
    return w
  }
  /**
   * 渲染大尺寸组件
   */
  async largeWidget ({url, data}) {
    const w = new ListWidget()
    

    w.addSpacer();
   
    const titleText = w.addText(data.msg.title)
    titleText.font = Font.boldSystemFont(12)
    titleText.textColor = Color.dynamic(Color.black(), Color.white())
    titleText.centerAlignText()
    titleText.textOpacity = 0.5
      
    w.addSpacer()

    const subtitleText = w.addText(data.msg.subtitle)
    subtitleText.font = Font.boldSystemFont(12)
    subtitleText.textColor = Color.dynamic(Color.black(), Color.white())
    subtitleText.centerAlignText()
    subtitleText.textOpacity = 0.75
      
    w.addSpacer()

    const bodyText = w.addText(data.msg.body)
    bodyText.font = Font.boldSystemFont(12)
    bodyText.textColor = Color.dynamic(Color.black(), Color.white())
    bodyText.centerAlignText()
    bodyText.textOpacity = 0.75
      
    w.addSpacer()
    
    w.url = url
    return w
  
    
  }

  
  /**
   * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
   * @param {string} url 打开的链接
   */
  async actionOpenUrl (url) {
    Safari.openInApp(url, false)
    // Safari.open(`shortcuts://run-shortcut?name=${encodeURIComponent('下为壁纸')}&input=${encodeURIComponent(url)}`)
  }

}
// @组件代码结束

const { Testing } = require("./「小件件」开发环境")
await Testing(Widget)

