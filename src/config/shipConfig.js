let con = {
  shipStatus: {
    1: '在途', // (但是如果船舶速度＜0.3海里时，状态改为停泊)
    2: '靠泊', // ，(但是如果船舶速度＞3海里时，状态改为在途
    3: '锚泊', // (但是如果船舶速度＞3海里时，状态改为在途)
    4: '停泊' // (但是如果船舶速度＞3海里时，状态改为在途)
  },
  coeff: 600000, // 精度系数
  defaultGroupCN: '默认分组', // 船队默认分组. 船队列表中没有分组的即为默认分组
  defaultGroupEN: 'Default Group',
  _TYPHOON_MIN_POINT_DISTANCE: 50,

  //地图相关
  MIN_ZOOM: 2,
  MAX_ZOOM: 18,
  MAP_KEY: '48755a5ab4064e7a91b60ddecc3d8c11',
  // STATE_URL_NEW: `http://www.google.cn/maps/vt?lyrs=s@804&gl=${ navigator.language.includes("zh") ? "zh_CN" : "en" }&x={x}&y={y}&z={z}`,
  STATE_URL_NEW: `http://maps1.shipdt.com/vt?lyrs=y&hl=zh-CN&gl=CN&z={z}&x={x}&y={y}`,
  // MAP_URL:  `http://www.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i342009817!3m9!2s${ navigator.language.includes("zh") ? "zh_CN" : "en" }!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0`
  MAP_URL:  `http://maps{s}.shipdt.com/vt/lyrs=m&hl=zh-CN&gl=${ navigator.language.includes("zh") ? "zh_CN" : "en" }&s=Gal&z={z}&x={x}&y={y}`,
  voyageColors: ['#0073F5', '#9C27B0', '#FF6501','#008A3E','#B71B61','#C5912E','#FF0000','#FF01C1','#E91E63','#00BCD4']
}

export default con;
