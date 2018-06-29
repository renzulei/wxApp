# wxApp
新增components组件文件夹
  radio组件封装，使用时，在目标文档的.json文件里添加
  {
    "usingComponents": {
      "RadioGroupComponent": "/components/radio-group/radio-group",
      "RadioComponent": "/components/radio/radio"
    }
  }
  
  即可使用：
  <RadioGroupComponent  name="country">
  <RadioComponent 
    bindradiochange="radioChange" 
    wx:for="{{items}}"
    wx:key="{{item.name}}"
    value="{{item.value}}"
    checked="{{item.checked}}"
  />
</RadioGroupComponent>

//js文件
 radioChange: function (e) {
    // console.log(e.detail.value)
    this.data.items.map(function (item, index) {
      item.checked = item.value == e.detail.value ? true : false
    });
    this.setData({
      items: this.data.items,
      country:e.detail.value
    })
  }
