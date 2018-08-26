const Mock = require('mockjs')
const _ = require('lodash')
const getParam = require('../common/common').getParam

let arr = [{
    id: 1,
    name: '组织1',
    ismanagerplatform: 1,
    status: 0,
    creatorid: 1,
    createtime: '2018-08-15',
}, {
    id: 2,
    name: '组织2',
    ismanagerplatform: 0,
    status: 1,
    creatorid: 1,
    createtime: '2018-08-15',
}]

//查询
Mock.mock(/\/api\/organization\/select/, 'get', function (options) {
    const name = getParam(options.url, 'name')
    const pagenum = parseInt(getParam(options.url, 'pagenum'))
    const pagesize = parseInt(getParam(options.url, 'pagesize'))
    var data = arr
    if(name){
        data =  _.filter(data, item => item.name.indexOf(name) > -1)
    }
    const resultcounts = data.length
    if(!isNaN(pagenum) && !isNaN(pagesize) ){
        var start = (pagenum - 1) * pagesize
        var end = pagenum * pagesize
        data = data.slice(start, end)
    }   
    return { code: 0, resultcounts, data }
})

//新增
Mock.mock('/api/organization/add', 'post', function (options) {
    let info = JSON.parse(options.body)
    info.id = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1
    info.createtime = Mock.Random.date()
    arr.push(info)
    return { code: 0, msg: '新增成功', data: info }
})

//修改
Mock.mock('/api/organization/update', 'post', function (options) {
    let info = JSON.parse(options.body)
    let origin = _.find(arr, (item) => (item.id === info.id))
    let updated = _.assign(origin, info)
    return { code: 0, msg: '修改成功', data: updated }
})

//删除
Mock.mock(/\/api\/organization\/delete/, 'get', function (options) {
    let id = getParam(options.url, 'id')
    id = parseInt(id)
    _.remove(arr, item => (
        item.id === id
    ))
    return { code: 0, msg: '删除成功' }
})