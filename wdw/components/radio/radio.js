Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    value: {
      type: String,
      value: 'default value',
    },
    checked:{
      type: Boolean,
      value:false
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    onTap: function (e) { 
      // console.log(e.currentTarget.dataset.value)
      var detail = {
        "value": e.currentTarget.dataset.value
      } // detail对象，提供给事件监听函数
      this.triggerEvent('radiochange', detail)
    }
  }
})