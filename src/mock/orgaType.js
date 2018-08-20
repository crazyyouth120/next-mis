const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [{
    ID: '111',
    Name: "机构类别1",
    Status:1,
    Creator: "System",
    CreateTime: Mock.Random.date(),
    Organizational:['111','222'],
    Interface:['111'],
},{
    ID: '222',
    Name: "机构类别2",
    Status:2,
    Creator: "System",
    CreateTime: Mock.Random.date(),
    Organizational:['111','222'],
    Interface:['222'],
}]

//查询
Mock.mock(/\/api\/orgaType\/list/, 'get', function (options) {
    const Name = getParam(options.url,'Name')
    if(Name){
        return _.filter(arr,item=>item.Name.indexOf(Name)>-1)
    }else{
        return arr
    }
})

//新增
Mock.mock('/api/orgaType/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.ID = Mock.Random.id()
    info.CreateTime = Mock.Random.date()
    info.Creator = 'System'
    arr.push(info)
    return { code: 1, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/orgaType/edit', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr,(item)=>(item.ID === info.ID))
    let updated = _.assign(origin,info)
    return { code: 1, msg: '修改成功', data: updated }
})

//删除
Mock.mock('/api/orgaType/delete', 'post', function (options) {
    let ID = JSON.parse(options.body).ID
    _.remove(arr, item => (
        item.ID === ID
    ))
    return { code: 1, msg: '删除成功' }
})