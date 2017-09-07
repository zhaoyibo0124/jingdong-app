function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}

/**
 * 接口请求方法：wx.request发起的是https请求,一个微信小程序，同时只能有5个网络请求连接
 * @param options  调用该方法时传入的对象
 */
function http(options) {
    // 获取全局对象并进行解构
    let {globalData:{baseUrl}} = getApp();
    wx.request({
        url: `${baseUrl}${options.url}`,
        header: {
            'content-type': 'application/xml'
        },
        data: options.data,
        method: options.data ? "POST" : "GET",
        success: (res)=> {
            //回调
            options.func(res.data);
        }
    })
}
module.exports = {
    formatTime: formatTime,
    http
};