const resMessage = {
  cn: {
    '-1': '字符不合法',
    0: '成功',
    1: '参数错误',
    2: '短信发送已达今日上限',
    3: '发送失败',
    4: '未找到相关记录',
    5: '验证码错误',
    6: '账户被冻结，无法登陆',
    7: '手机号码不存在',
    9: '商品库存不足',
    10: '密码错误',
    15: '用户不存在',
    // 16: '资产账号异常',
    16: '分润钱包不存在',
    19: '交易密码不正确',
    // 19: '请先缴纳手机预售款',
    20: '未设置交易密码',
    22: '未实名认证',
    23: '账户余额不足',
    35: '登录超时',
    36: '已处理，不可取消',
    37: '文件大小超出限制',
    39: '该账号已注册',
    40: '推荐人已存在',
    41: '推荐人不能为自己',
    42: '银行卡不属于用户本人',
    43: '转出地址不可为充值地址',
    54: '收货地址数量到达上限',
    55: '账号不存在',
    56: '未设置交易密码',
    58: '安全问题已设置',
    59: '线上资产不存在',
    60: '未设置安全问题',
    61: '未验证安全问题',
    62: '安全问题2答案错误',
    63: '未设置安全问题',
    69: '原密码错误',
    101: '验证码错误',
    111: '邮箱不存在',
    122: '暂无数据',
    180: '昵称存在',
    184: '手机号或邮箱已绑定',
    185: '证件号已被绑定',
    200: '确认密码不一致',
    201: '登录密码不能与支付密码相同',
    202: '文件格式错误',
    203: '手机号码格式错误',
    204: '手机号已被绑定',
    206: '邮箱格式错误',
    207: '此邮箱已被绑定',
    208: '新密码与旧密码不能相同',
    210: '数据未加密',
    231: '收货地址不能为空',
    233: '未设置谷歌验证',
    249: '失败',
    250: '服务器异常',
    302: '未查询到数据',
    403: '订单已经完成了',
    500: '服务器异常',
    1000: '当前状态不可进行该操作',
    1001: '无操作权限',
    1002: '商品不支持售后',
    1003: '请不要重复提交申请',
    1004: '价格错误',
    1005: '昵称已存在',
    1006: '未绑定手机',
    1007: '手机号码与当前绑定号码不一致',
    1008: '注册的账号格式错误',
    1009: '请输入验证码',
    1010: '操作异常',
    1011: '验证超时',
    1012: '验证失败',
    1014: '失败，只能延长一次',
    1015: '安全问题1答案错误',
    1017: '当前状态不可进行该操作',
    1101: '转出地址有误',
    1102: '该商品已收藏',
    1103: '该店铺已收藏',
    1104: '选取列表存在已收藏的商品',
    1105: '资产账号被冻结',
    1106: '转出数量有误',
    1107: '地址激活失败',
    1108: '单日转出限额限制',
    1109: '此支付方式已设置',
    1110: '添加失败',
    1120: '删除失败',
    1122: '存在敏感词',
    1130: '更新失败',
    1140: '查询失败',
    1150: '基础数据不存在，请联系管理员',
    1160: '用户不存在，请登录',
    1170: '用户不存在，请联系管理员',
    1180: '基础数据已不存在，请刷新页面重试',
    1190: '操作频繁，请刷新页面重试',
    1200: '系统异常',
    1201: '不能与原手机号一致',
    1202: '不能与原邮箱一致',
    1203: '国际短信地区与发送短信时不一致',
    1204: '证件号错误',
    1206: '未绑定手机号',
    1207: '与所绑定的手机号不一致',
    1208: '账号格式错误',
    1209: '请填写验证码',
    1210: '操作异常',
    1211: '验证超时',
    1212: '验证失败',
    1213: '修改方式选择错误',
    1217: '图形验证码已超时',
    1218: '与原手机号一致',
    1219: '与原邮箱一致',
    1221: '未选择国家',
    1222: '未填写真实姓名',
    1223: '未选择证件类型',
    1224: '未填写证件号码',
    1225: '护照格式错误',
    1226: '证件正面照为空',
    1227: '证件反面照为空',
    1228: '手持证件照为空',
    1229: '证件号错误',
    1230: '标题包含敏感词',
    1231: '内容包含敏感词',
    1251: '今天已经签到过',
    1252: '邀请码无效',
    1253: '密码未加密',
    1254: '只允许发一个同类型广告',
    1255: '广告状态异常',
    1256: '不能买卖自己发布的广告',
    1257: '不能大于最大交易额',
    1258: '不能小于最小交易额',
    1259: '超过最大可交易数量',
    1260: '交易价格错误',
    1261: '订单状态异常',
    1262: '账户余额异常',
    1263: '仅限受信任的人交易',
    1264: '超时未付款，订单已取消',
    1265: '取消订单次数过多',
    1266: '不能和已屏蔽的人进行交易',
    1267: '卖家余额异常',
    1268: '不能置信自己',
    1269: '已经置信过该用户',
    1270: '获取token失败',
    1271: '不能删除进行中的广告',
    1272: '广告下还有未完成的订单',
    1273: '广告已经结束',
    1274: '不能屏蔽自己',
    1275: '已屏蔽该用户',
    1276: '用户被加入黑名单',
    1277: '不能信任被屏蔽的用户',
    1278: '不能屏蔽被信任的用户',
    1279: '保证金不足',
    1280: '最小交易额不能大于最大交易额',
    1281: '交易额不能大于广告总额',
    1300: '版本信息不存在',
    1301: '设置密码与确认密码不一致',
    1302: '邀请码无效',
    1303: '该邀请码已达使用上限',
    1304: '用户名已存在',
    1305: '邮箱格式错误',
    1306: '该邮箱已绑定用户',
    1307: '该邮箱不存在',
    1308: '手机号格式错误',
    1309: '该手机号已绑定用户',
    1310: '用户名不存在',
    1311: '登录密码错误',
    1312: '用户已被禁用',
    1313: '用户未实名认证',
    1314: '国际短信地区与发送短信时不一致',
    1315: '交易广告信息不存在',
    1316: '姓名输入过长',
    1317: '证件号输入过长',
    1318: '证件号输入限制为数字或字母',
    1329: '银行卡无效'
  },
  en: {
    // 慢慢来
    1008: 'code error'

  }
}
export default resMessage