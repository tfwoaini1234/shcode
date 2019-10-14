import Mock from 'mockjs'

const data0 = Mock.mock({
  'items|16': [{
    id: '@id',
    code:'@integer(100300, 995000)',
    mobile:'@integer(13000000000, 19000000000)',
    title: '王小川',
    'status|1': ['0'],
    sex: '男',
    display_time: '@datetime',
    doctor: '叶力'
  }]
})
const data1 = Mock.mock({
  'items|16': [{
    id: '@id',
    code:'@integer(100300, 995000)',
    mobile:'@integer(13000000000, 19000000000)',
    title: '王小川',
    'status|1': ['10'],
    sex: '男',
    display_time: '@datetime',
    doctor: '叶力'
  }]
})
const data2 = Mock.mock({
  'items|16': [{
    id: '@id',
    code:'@integer(100300, 995000)',
    mobile:'@integer(13000000000, 19000000000)',
    title: '王小川',
    'status|1': ['20'],
    sex: '男',
    display_time: '@datetime',
    doctor: '叶力'
  }]
})

export default [
  {
    url: '/dicome/list',
    type: 'get',
    response: config => {
      //console.log(config.query);
      let items
      if(config.query.type==0){
        items = data0.items
      }
      if(config.query.type==1){
        items = data1.items
      }
      if(config.query.type==2){
        items = data2.items
      }
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
