// 风水冲煞评估系统 - 基于四张图片内容
class FengShuiEvaluation {
    constructor() {
        this.currentSection = null;
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.questions = []; // 题目数据，用户可在此添加
        
        // 授权码配置
        this.validAuthCodes = {
            home: ["HOME520"],
            money: ["MONEY520"],
            work: ["WORK520"],
            energy: ["ENERGY520"]
        };
        
        // 评分等级定义 - 基于用户提供的图片
        this.levels = [
            { score: 0, name: '优秀', description: '该组无明显风水问题，气场顺畅' },
            { score: 1, name: '良好', description: '存在轻微风水小问题，影响较小' },
            { score: 2, name: '一般', description: '存在中等风水隐患，需针对性调整' },
            { score: 3, name: '需注意', description: '存在明显风水冲煞，需及时化解' }
        ];
        
        // 组评分对应建议 - 基于用户提供的图片
        this.groupSolutions = {
            home: [
                { score: 0, desc: '该组无明显风水问题，气场顺畅，无需额外调整' },
                { score: 1, desc: '存在轻微风水小问题，对居住体验影响较小，建议针对性优化布局' },
                { score: 2, desc: '存在中等风水隐患，长期居住可能影响健康，建议及时调整' },
                { score: 3, desc: '存在明显的风水问题，气场受阻，无缓冲余地，需及时化解' }
            ],
            money: [
                { score: 0, desc: '该组无明显风水问题，气场顺畅，无需额外调整' },
                { score: 1, desc: '存在轻微风水小问题，对财运影响较小，建议针对性优化布局' },
                { score: 2, desc: '存在中等风水隐患，长期可能导致财气流失，建议及时调整' },
                { score: 3, desc: '存在明显的风水问题，气场受阻，财气流失严重，需及时化解' }
            ],
            work: [
                { score: 0, desc: '该组无明显风水问题，对工作效率影响较小，无需额外调整' },
                { score: 1, desc: '存在轻微风水小问题，长期可能影响工作状态，建议针对性优化布局' },
                { score: 2, desc: '存在中等风水隐患，可能导致气场紊乱，建议及时调整' },
                { score: 3, desc: '存在明显的风水问题，气场混乱，无缓冲余地，需及时化解' }
            ],
            energy: [
                { score: 0, desc: '该组无明显风水问题，对身心状态影响较小，无需额外调整' },
                { score: 1, desc: '存在轻微风水小问题，长期可能导致身心疲惫，建议针对性优化布局/布局' },
                { score: 2, desc: '存在中等风水隐患，可能引发身心健康问题，建议及时调整' },
                { score: 3, desc: '存在明显的风水问题，容易引发身心不适，无缓冲余地，需及时调整改善' }
            ]
        };
        
        // 题目数据 - 基于用户提供的四张图片
        this.questions = {
            // 家居板块题目
            home: [
                {
                    question: '1. 你家入户门是否正对着下面哪个门？',
                    options: [
                        { text: 'A. 卫生间门', score: 1 },
                        { text: 'B. 厨房门', score: 1 },
                        { text: 'C. 卧室门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '2. 你家房型有没有下面这些缺陷？',
                    options: [
                        { text: 'A. 西北边缺角', score: 1 },
                        { text: 'B. 东北边缺角', score: 1 },
                        { text: 'C. 西南边缺角', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '3. 你家窗外有没有下面这些情况？',
                    options: [
                        { text: 'A. 马路直冲窗户', score: 1 },
                        { text: 'B. 对面房子角对着窗户', score: 1 },
                        { text: 'C. 高压电塔离得近', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '4. 你家床上有没有下面这些问题？',
                    options: [
                        { text: 'A. 床头有横梁', score: 1 },
                        { text: 'B. 床头对着窗户', score: 1 },
                        { text: 'C. 床尾对着房门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '5. 你家厨房的灶台有没有对着这些东西？',
                    options: [
                        { text: 'A. 水槽', score: 1 },
                        { text: 'B. 窗户', score: 1 },
                        { text: 'C. 冰箱', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '6. 你家卫生间有没有下面这些问题？',
                    options: [
                        { text: 'A. 卫生间门对着卧室门', score: 1 },
                        { text: 'B. 卫生间门对着厨房', score: 1 },
                        { text: 'C. 没有窗户不通风', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '7. 你家阳台外面有没有下面这些情况？',
                    options: [
                        { text: 'A. 对着厨房抽油烟机排风口', score: 1 },
                        { text: 'B. 广告牌挡住阳光', score: 1 },
                        { text: 'C. 邻居空调外机对着阳台', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '8. 你家客厅沙发有没有对着这些问题？',
                    options: [
                        { text: 'A. 沙发背后没有靠墙', score: 1 },
                        { text: 'B. 沙发对着镜子', score: 1 },
                        { text: 'C. 沙发靠着落地窗', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '9. 你家儿童房有没有下面这些情况？',
                    options: [
                        { text: 'A. 房间在房子的尖角位置', score: 1 },
                        { text: 'B. 书桌上方有横梁', score: 1 },
                        { text: 'C. 床头对着衣柜镜子', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '10. 你家过道有没有下面这些问题？',
                    options: [
                        { text: 'A. 过道又窄又长', score: 1 },
                        { text: 'B. 堆了很多杂物', score: 1 },
                        { text: 'C. 镜子对着入户门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '11. 你家窗户上有没有下面这些强光干扰？',
                    options: [
                        { text: 'A. 对面霓虹灯照着窗户', score: 1 },
                        { text: 'B. 路灯灯光直射', score: 1 },
                        { text: 'C. 车灯经常照到', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '12. 你家大门外有没有下面这些情况？',
                    options: [
                        { text: 'A. 楼梯对着大门', score: 1 },
                        { text: 'B. 邻居大门和你家大门对着', score: 1 },
                        { text: 'C. 走廊尽头就是你家大门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '13. 你家客厅的书桌有没有下面这些摆放问题？',
                    options: [
                        { text: 'A. 对着房门', score: 1 },
                        { text: 'B. 对着窗户', score: 1 },
                        { text: 'C. 旁边有大电器', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '14. 你家客厅的财位有没有下面这些情况？',
                    options: [
                        { text: 'A. 放了杂物', score: 1 },
                        { text: 'B. 有横梁压着', score: 1 },
                        { text: 'C. 对着卫生间', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '15. 你家的绿植有没有下面这些摆放问题？',
                    options: [
                        { text: 'A. 带刺的植物放客厅', score: 1 },
                        { text: 'B. 枯萎的绿植没清理', score: 1 },
                        { text: 'C. 绿植挡住入户门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '16. 你家的镜子有没有对着下面这些地方？',
                    options: [
                        { text: 'A. 镜子对着大门', score: 1 },
                        { text: 'B. 镜子对着床', score: 1 },
                        { text: 'C. 镜子对着灶台', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '17. 你家地板有没有下面这些情况？',
                    options: [
                        { text: 'A. 入户门处高低不平', score: 1 },
                        { text: 'B. 卧室地板颜色太暗沉', score: 1 },
                        { text: 'C. 厨房地板容易积水打滑', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '18. 你家的窗帘有没有下面这些问题？',
                    options: [
                        { text: 'A. 太长拉不拢', score: 1 },
                        { text: 'B. 颜色太鲜艳刺眼', score: 1 },
                        { text: 'C. 材质厚重不透气', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '19. 你家的鞋架有没有下面这些摆放问题？',
                    options: [
                        { text: 'A. 放在客厅中央', score: 1 },
                        { text: 'B. 鞋架上堆了杂物', score: 1 },
                        { text: 'C. 对着入户门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '20. 你家客厅有没有摆放下面这些东西？',
                    options: [
                        { text: 'A. 大鱼缸对着大门', score: 1 },
                        { text: 'B. 沉重的物件放沙发旁', score: 1 },
                        { text: 'C. 金属装饰太多反光', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '21. 你家卧室阳台有没有下面这些情况？',
                    options: [
                        { text: 'A. 晾衣服对着大门', score: 1 },
                        { text: 'B. 通风问题很潮湿', score: 1 },
                        { text: 'C. 地面有裂缝', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '22. 你家卫生间门附近有没有下面这些问题？',
                    options: [
                        { text: 'A. 积水一直没处理', score: 1 },
                        { text: 'B. 堆了很多杂物', score: 1 },
                        { text: 'C. 对着邻居家的墙角', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '23. 你家的灯具有没有下面这些问题？',
                    options: [
                        { text: 'A. 客厅主灯对着沙发', score: 1 },
                        { text: 'B. 卧室灯光很尖锐', score: 1 },
                        { text: 'C. 灯光太暗很压抑', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '24. 你家的衣柜有没有下面这些摆放问题？',
                    options: [
                        { text: 'A. 对着卧室门', score: 1 },
                        { text: 'B. 紧贴着床', score: 1 },
                        { text: 'C. 衣柜顶压重物', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '25. 你家厨房有没有下面这些杂物堆积问题？',
                    options: [
                        { text: 'A. 灶后有堆积物', score: 1 },
                        { text: 'B. 墙角堆积油污杂物', score: 1 },
                        { text: 'C. 冰箱顶上堆满东西', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '26. 你家卫生间有没有放下这些东西？',
                    options: [
                        { text: 'A. 太多绿植', score: 1 },
                        { text: 'B. 尖锐的小物件', score: 1 },
                        { text: 'C. 杂物挡着通风口', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '27. 你家大门的鞋架有没有下面这些问题？',
                    options: [
                        { text: 'A. 破鞋旧鞋堆了一堆', score: 1 },
                        { text: 'B. 没有鞋柜', score: 1 },
                        { text: 'C. 很久没清理', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '28. 你家客厅的挂钟有没有下面这些问题？',
                    options: [
                        { text: 'A. 破旧损坏的挂钟', score: 1 },
                        { text: 'B. 颜色和大小不搭', score: 1 },
                        { text: 'C. 挂得歪歪扭扭', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '29. 你家阳台的栏杆有没有下面这些问题？',
                    options: [
                        { text: 'A. 高度太低', score: 1 },
                        { text: 'B. 生锈破损了栏杆', score: 1 },
                        { text: 'C. 栏杆上挂重物', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '30. 你家房子周边有没有下面这些情况？',
                    options: [
                        { text: 'A. 附近有殡仪馆', score: 1 },
                        { text: 'B. 附近垃圾站有异味', score: 1 },
                        { text: 'C. 楼梯间太窄采光差', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                }
            ],
            
            // 财运板块题目
            money: [
                {
                    question: '1. 你家客厅对角线的财位有没有下面这些情况？',
                    options: [
                        { text: 'A. 堆放了很多杂物', score: 1 },
                        { text: 'B. 地面有横梁压着', score: 1 },
                        { text: 'C. 对着卫生间门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '2. 你家放贵重物品的地方有没有下面这些问题？',
                    options: [
                        { text: 'A. 杂乱无章', score: 1 },
                        { text: 'B. 上面有东西压着', score: 1 },
                        { text: 'C. 放在窗户边', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '3. 你家的钱包（如果有）有没有下面这些摆放问题？',
                    options: [
                        { text: 'A. 对着大门', score: 1 },
                        { text: 'B. 背后是空的', score: 1 },
                        { text: 'C. 上方有横梁', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '4. 你家的招财摆件有没有下面这些问题？',
                    options: [
                        { text: 'A. 摆件破损了', score: 1 },
                        { text: 'B. 摆得很随便', score: 1 },
                        { text: 'C. 摆放得乱七八糟', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '5. 你家厨房有没有下面这些影响财运的情况？',
                    options: [
                        { text: 'A. 厨房门对着入户门', score: 1 },
                        { text: 'B. 炉灶有破损', score: 1 },
                        { text: 'C. 长期油污堆积', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '6. 你家客厅有没有下面这些情况容易导致财气流失？',
                    options: [
                        { text: 'A. 大门对着阳台', score: 1 },
                        { text: 'B. 地面高低不平', score: 1 },
                        { text: 'C. 光线太暗', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '7. 你家阳台有没有放下面这些东西？',
                    options: [
                        { text: 'A. 旧的或破的大电器', score: 1 },
                        { text: 'B. 有垃圾桶', score: 1 },
                        { text: 'C. 放垃圾', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '8. 你家的鞋柜有没有下面这些问题？',
                    options: [
                        { text: 'A. 放在财神位附近', score: 1 },
                        { text: 'B. 没有对着镜子', score: 0 },
                        { text: 'C. 位置放错了', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '9. 你家收纳物品的抽屉、储物箱有没有下面这些问题？',
                    options: [
                        { text: 'A. 柜门开了', score: 1 },
                        { text: 'B. 柜内潮湿', score: 1 },
                        { text: 'C. 对着卫生间', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '10. 你家阳台有没有放下面这些破的旧的东西？',
                    options: [
                        { text: 'A. 旧窗户长期没开', score: 1 },
                        { text: 'B. 堆了很多杂物', score: 1 },
                        { text: 'C. 对着直冲的马路', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '11. 你家沙发有没有放下面这些问题？',
                    options: [
                        { text: 'A. 沙发后面没有靠墙', score: 1 },
                        { text: 'B. 没有窗户', score: 1 },
                        { text: 'C. 对着大门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '12. 你家财位有没有放下这些东西？',
                    options: [
                        { text: 'A. 枯萎的植物', score: 1 },
                        { text: 'B. 有流水', score: 1 },
                        { text: 'C. 尖锐的金属制品', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '13. 你家入户门有没有下面这些漏财的问题？',
                    options: [
                        { text: 'A. 有门缝', score: 1 },
                        { text: 'B. 有门槛破损的问题', score: 1 },
                        { text: 'C. 门外堆放杂物', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '14. 你家大门有没有下面这些破损的情况？',
                    options: [
                        { text: 'A. 门锁坏了', score: 1 },
                        { text: 'B. 门面变形', score: 1 },
                        { text: 'C. 门外堆积垃圾', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '15. 你家卫生间有没有下面这些对着窗户的问题？',
                    options: [
                        { text: 'A. 水龙头滴水', score: 1 },
                        { text: 'B. 地面积水', score: 1 },
                        { text: 'C. 卫生间门对着厨房', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '16. 你家有没有下面这些开门见灶导致财气泄漏的情况？',
                    options: [
                        { text: 'A. 多个房间同时开门', score: 1 },
                        { text: 'B. 门窗同时打开', score: 1 },
                        { text: 'C. 客厅镜子太多', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '17. 你家的发财树等绿植有没有下面这些问题？',
                    options: [
                        { text: 'A. 叶子枯萎', score: 1 },
                        { text: 'B. 放在阴暗处', score: 1 },
                        { text: 'C. 旁边有尖锐物品', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '18. 你家对着大门有没有下面这些影响财运的摆放问题？',
                    options: [
                        { text: 'A. 对着卫生间门', score: 1 },
                        { text: 'B. 对着厨房门', score: 1 },
                        { text: 'C. 镜对着门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '19. 你家理财的地方有没有放下面这些东西？',
                    options: [
                        { text: 'A. 破损的碗碟', score: 1 },
                        { text: 'B. 太多颜色的物品', score: 1 },
                        { text: 'C. 尖锐的小摆件', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '20. 你家破损的碗碟、瓷器有没有放在下面这些地方？',
                    options: [
                        { text: 'A. 放在厨房', score: 1 },
                        { text: 'B. 放在客厅', score: 1 },
                        { text: 'C. 堆在角落', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '21. 你家阳台衣服有没有下面这些情况？',
                    options: [
                        { text: 'A. 常晒内衣内裤', score: 1 },
                        { text: 'B. 晒着褪色的旧衣服', score: 1 },
                        { text: 'C. 和杂物混在一起', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '22. 你家天花板有没有下面这些问题？',
                    options: [
                        { text: 'A. 有漏水', score: 1 },
                        { text: 'B. 墙面发霉', score: 1 },
                        { text: 'C. 地面有裂缝', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '23. 你家有没有下面这些影响财运的物品？',
                    options: [
                        { text: 'A. 太多红色装饰', score: 1 },
                        { text: 'B. 破损的钟表', score: 1 },
                        { text: 'C. 鱼缸漏水', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '24. 你家玄关有没有下面这些影响财运的问题？',
                    options: [
                        { text: 'A. 大门没有门槛', score: 1 },
                        { text: 'B. 灯光太亮', score: 1 },
                        { text: 'C. 放了垃圾桶', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '25. 你家卧室有没有下面这些影响财运的物品？',
                    options: [
                        { text: 'A. 床尾太多杂物', score: 1 },
                        { text: 'B. 镜子对着床', score: 1 },
                        { text: 'C. 床头有破损', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '26. 你家大门口有没有下面这些影响财运的情况？',
                    options: [
                        { text: 'A. 大门破损', score: 1 },
                        { text: 'B. 对着竞争对手的店', score: 1 },
                        { text: 'C. 门口光线暗', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '27. 你家有没有下面这些情况让财气外泄？',
                    options: [
                        { text: 'A. 窗户太多太大', score: 1 },
                        { text: 'B. 窗帘长期拉开', score: 1 },
                        { text: 'C. 阳台没防护栏', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '28. 你家财位的光线有没有下面这些问题？',
                    options: [
                        { text: 'A. 太暗', score: 1 },
                        { text: 'B. 光线直射', score: 1 },
                        { text: 'C. 被家具挡住', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '29. 你家私人物品（如钱包）有没有放下面这些东西？',
                    options: [
                        { text: 'A. 乱放杂物', score: 1 },
                        { text: 'B. 尖锐的小物件', score: 1 },
                        { text: 'C. 旧的钱币', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '30. 你家房子有没有下面这些影响财运的布局？',
                    options: [
                        { text: 'A. 西南角缺角', score: 1 },
                        { text: 'B. 入户门通道阳台', score: 1 },
                        { text: 'C. 厨房在西北方', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                }
            ],
            
            // 工作板块题目
            work: [
                {
                    question: '1. 你的办公座位有没有下面这些情况？',
                    options: [
                        { text: 'A. 头上有横梁', score: 1 },
                        { text: 'B. 背后是过道', score: 1 },
                        { text: 'C. 对着办公室大门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '2. 你的办公桌椅有没有下面这些问题？',
                    options: [
                        { text: 'A. 桌椅破旧', score: 1 },
                        { text: 'B. 桌面凹凸不平', score: 1 },
                        { text: 'C. 椅子摇晃', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '3. 你的办公桌面有没有下面这些问题？',
                    options: [
                        { text: 'A. 东西杂乱无章', score: 1 },
                        { text: 'B. 堆放了很多杂物', score: 1 },
                        { text: 'C. 有尖锐物品', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '4. 你的办公座位附近有没有下面这些问题？',
                    options: [
                        { text: 'A. 附近有垃圾桶', score: 1 },
                        { text: 'B. 有人经常走来走去', score: 1 },
                        { text: 'C. 对着卫生间门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '5. 你的办公室有没有下面这些缺陷？',
                    options: [
                        { text: 'A. 大门正对你的座位', score: 1 },
                        { text: 'B. 光线太暗', score: 1 },
                        { text: 'C. 不通风', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '6. 你的办公植物有没有下面这些问题？',
                    options: [
                        { text: 'A. 叶子枯萎', score: 1 },
                        { text: 'B. 放在阴暗处', score: 1 },
                        { text: 'C. 有刺的植物', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '7. 你的办公室座位有没有对着下面这些地方？',
                    options: [
                        { text: 'A. 对着墙角', score: 1 },
                        { text: 'B. 对着尖锐物品', score: 1 },
                        { text: 'C. 对着空调口', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '8. 你的办公座位有没有下面这些问题？',
                    options: [
                        { text: 'A. 太靠近窗户', score: 1 },
                        { text: 'B. 靠近打印机', score: 1 },
                        { text: 'C. 靠近噪音源', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '9. 你的办公桌上有没有下面这些东西？',
                    options: [
                        { text: 'A. 私人照片', score: 1 },
                        { text: 'B. 太多小饰品', score: 1 },
                        { text: 'C. 和工作无关的东西', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '10. 你的办公室有没有下面这些问题？',
                    options: [
                        { text: 'A. 墙面破损', score: 1 },
                        { text: 'B. 地面潮湿', score: 1 },
                        { text: 'C. 有异味', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '11. 你的办公区域有没有下面这些情况？',
                    options: [
                        { text: 'A. 太拥挤', score: 1 },
                        { text: 'B. 太空旷', score: 1 },
                        { text: 'C. 颜色太刺眼', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '12. 你的办公区域光线有没有下面这些问题？',
                    options: [
                        { text: 'A. 自然光太强', score: 1 },
                        { text: 'B. 灯光太暗', score: 1 },
                        { text: 'C. 灯光太亮', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '13. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 噪音太大', score: 1 },
                        { text: 'B. 温度太高或太低', score: 1 },
                        { text: 'C. 空气质量差', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '14. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 墙面有裂缝', score: 1 },
                        { text: 'B. 天花板漏水', score: 1 },
                        { text: 'C. 很久没清理', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '15. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 有镜子对着你', score: 1 },
                        { text: 'B. 有尖锐物品对着你', score: 1 },
                        { text: 'C. 有大的电器对着你', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '16. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 同事总是从你背后走过', score: 1 },
                        { text: 'B. 你能看到所有同事', score: 1 },
                        { text: 'C. 同事的座位太靠近你', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '17. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 带刺的植物对着你', score: 1 },
                        { text: 'B. 你的背后有窗户', score: 1 },
                        { text: 'C. 你在角落位置', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '18. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 没有自然光', score: 1 },
                        { text: 'B. 有强光直射', score: 1 },
                        { text: 'C. 不通风', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '19. 你的办公室大门有没有下面这些问题？',
                    options: [
                        { text: 'A. 大门对着楼梯', score: 1 },
                        { text: 'B. 大门对着电梯', score: 1 },
                        { text: 'C. 大门对着卫生间', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '20. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 太多装饰品', score: 1 },
                        { text: 'B. 太多植物', score: 1 },
                        { text: 'C. 太多金属物品', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '21. 你的办公室有没有下面这些问题？',
                    options: [
                        { text: 'A. 大量文件堆积', score: 1 },
                        { text: 'B. 过道太窄', score: 1 },
                        { text: 'C. 两个门对门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '22. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 工位靠近门口', score: 1 },
                        { text: 'B. 工位在走廊尽头', score: 1 },
                        { text: 'C. 工位对着门', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '23. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 每张桌子上都有太多私人照片', score: 1 },
                        { text: 'B. 同事的椅子对着你的工位', score: 1 },
                        { text: 'C. 太靠近窗户', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '24. 你的办公室的开关有没有下面这些问题？',
                    options: [
                        { text: 'A. 开关位置不方便', score: 1 },
                        { text: 'B. 开关损坏', score: 1 },
                        { text: 'C. 开关太多', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '25. 你的办公室有没有下面这些问题？',
                    options: [
                        { text: 'A. 没有窗户', score: 1 },
                        { text: 'B. 窗户太小', score: 1 },
                        { text: 'C. 窗户对着厕所', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '26. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 太靠近打印机', score: 1 },
                        { text: 'B. 太靠近复印机', score: 1 },
                        { text: 'C. 太靠近保险箱', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '27. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 没有靠实墙', score: 1 },
                        { text: 'B. 座位高过同事', score: 1 },
                        { text: 'C. 座位太低', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '28. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 天花板有横梁', score: 1 },
                        { text: 'B. 天花板漏水', score: 1 },
                        { text: 'C. 天花板有裂缝', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '29. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 地面有地毯', score: 1 },
                        { text: 'B. 地面有裂缝', score: 1 },
                        { text: 'C. 地面不平整', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '30. 你的办公区域有没有下面这些问题？',
                    options: [
                        { text: 'A. 无靠山', score: 1 },
                        { text: 'B. 旁边有电梯进出', score: 1 },
                        { text: 'C. 工位在公司中心', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                }
            ],
            
            // 能量板块题目
            energy: [
                {
                    question: '1. 你的睡眠环境有没有下面这些情况？',
                    options: [
                        { text: 'A. 卧室的光线太亮', score: 1 },
                        { text: 'B. 周围很吵', score: 1 },
                        { text: 'C. 卧室不通风', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '2. 你卧室的采光有没有下面这些问题？',
                    options: [
                        { text: 'A. 卧室光线没有关', score: 1 },
                        { text: 'B. 颜色太鲜艳刺眼', score: 1 },
                        { text: 'C. 很久没换没洗', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '3. 你睡前有没有下面这些习惯？',
                    options: [
                        { text: 'A. 玩手机、看屏幕', score: 1 },
                        { text: 'B. 吃很多零食', score: 1 },
                        { text: 'C. 做剧烈运动', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '4. 你卧室里有没有下面这些东西？',
                    options: [
                        { text: 'A. 大量电器', score: 1 },
                        { text: 'B. 太多小饰品', score: 1 },
                        { text: 'C. 尖锐的小摆件', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '5. 你每天喝水的情况是下面哪一种？',
                    options: [
                        { text: 'A. 喝得太少（不足1000ml）', score: 1 },
                        { text: 'B. 喝得太多（超过3000ml）', score: 1 },
                        { text: 'C. 常喝碳酸饮料代替白开水', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '6. 你的饮食习惯有没有下面这些问题？',
                    options: [
                        { text: 'A. 三餐不规律', score: 1 },
                        { text: 'B. 暴饮暴食', score: 1 },
                        { text: 'C. 总吃辛辣油腻的食物', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '7. 你的工作或学习环境有没有下面这些情况？',
                    options: [
                        { text: 'A. 光线很暗', score: 1 },
                        { text: 'B. 空气不新鲜', score: 1 },
                        { text: 'C. 周围很吵', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '8. 你有没有下面这些不好的生活习惯？',
                    options: [
                        { text: 'A. 经常熬夜(12点后睡)', score: 1 },
                        { text: 'B. 吸烟酗酒', score: 1 },
                        { text: 'C. 长时间坐着不动', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '9. 你的卧室有没有下面这些问题？',
                    options: [
                        { text: 'A. 空间太小太挤', score: 1 },
                        { text: 'B. 堆了很多杂物', score: 1 },
                        { text: 'C. 墙面颜色太暗沉', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '10. 你每天运动的情况是下面哪一种？',
                    options: [
                        { text: 'A. 几乎不运动', score: 1 },
                        { text: 'B. 运动太导致疲惫', score: 1 },
                        { text: 'C. 睡前才运动', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '11. 你的枕头有没有下面这些问题？',
                    options: [
                        { text: 'A. 太高', score: 1 },
                        { text: 'B. 太低', score: 1 },
                        { text: 'C. 很久没更换', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '12. 你有没有下面这些压力来源？',
                    options: [
                        { text: 'A. 工作或学习压力大', score: 1 },
                        { text: 'B. 人际关系紧张', score: 1 },
                        { text: 'C. 经济压力重', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '13. 你家客厅有没有下面这些影响精神的情况？',
                    options: [
                        { text: 'A. 光线太暗', score: 1 },
                        { text: 'B. 光线太强', score: 1 },
                        { text: 'C. 周围很吵', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '14. 你的饮食习惯有没有下面这些偏好？',
                    options: [
                        { text: 'A. 总吃生冷的食物', score: 1 },
                        { text: 'B. 吃太多甜食', score: 1 },
                        { text: 'C. 吃得太清淡没营养', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '15. 你家里有没有下面这些影响健康的情况？',
                    options: [
                        { text: 'A. 潮湿有异味', score: 1 },
                        { text: 'B. 很多灰尘不清理', score: 1 },
                        { text: 'C. 用品混乱粗糙', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '16. 你每天晒太阳的时间是下面哪一种？',
                    options: [
                        { text: 'A. 不足1小时', score: 1 },
                        { text: 'B. 晒太阳超过3小时', score: 1 },
                        { text: 'C. 几乎不晒太阳', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '17. 你的书房或工作区有没有下面这些问题？',
                    options: [
                        { text: 'A. 杂乱无章', score: 1 },
                        { text: 'B. 桌椅高度不合适', score: 1 },
                        { text: 'C. 长时间待在封闭空间', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '18. 你有没有下面这些睡眠障碍问题？',
                    options: [
                        { text: 'A. 很难入睡', score: 1 },
                        { text: 'B. 容易醒、多梦', score: 1 },
                        { text: 'C. 每天睡不够6小时', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '19. 你家里有没有下面这些影响心情的情况？',
                    options: [
                        { text: 'A. 很难入睡', score: 1 },
                        { text: 'B. 容易醒、多梦', score: 1 },
                        { text: 'C. 每天睡不够6小时', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '20. 你有没有下面这些损耗精力的习惯？',
                    options: [
                        { text: 'A. 有拖沓的习惯', score: 1 },
                        { text: 'B. 墙面有污渍', score: 1 },
                        { text: 'C. 东西摆得乱糟糟', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '21. 你每天的时间安排有没有下面这些问题？',
                    options: [
                        { text: 'A. 长时间刷手机', score: 1 },
                        { text: 'B. 总是分心', score: 1 },
                        { text: 'C. 熬夜追剧、打游戏', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '22. 你学习或学习的坐姿有没有下面这些问题？',
                    options: [
                        { text: 'A. 一直坐着不通风', score: 1 },
                        { text: 'B. 窗户太大冷风直吹', score: 1 },
                        { text: 'C. 玻璃有破损', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '23. 你有没有下面这些导致身体疲惫的情况？',
                    options: [
                        { text: 'A. 过度节食', score: 1 },
                        { text: 'B. 睡眠不足', score: 1 },
                        { text: 'C. 作息昼夜颠倒', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '24. 你家里有没有下面这些噪音干扰？',
                    options: [
                        { text: 'A. 邻居太吵', score: 1 },
                        { text: 'B. 家电噪音大', score: 1 },
                        { text: 'C. 街道噪音大', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '25. 你卧室里有没有下面这些摆放问题？',
                    options: [
                        { text: 'A. 太多玩具', score: 1 },
                        { text: 'B. 衣柜占用空间', score: 1 },
                        { text: 'C. 镜子对着床', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '26. 你的午休有没有下面这些问题？',
                    options: [
                        { text: 'A. 没有午休', score: 1 },
                        { text: 'B. 下午3点后才午休', score: 1 },
                        { text: 'C. 从来不午休', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '27. 你的饮食有没有下面这些不好的情况？',
                    options: [
                        { text: 'A. 很少吃蔬菜、蛋白质', score: 1 },
                        { text: 'B. 吃水果吃得少', score: 1 },
                        { text: 'C. 总吃外卖', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '28. 你家里有没有下面这些不好的情况？',
                    options: [
                        { text: 'A. 温度太高或太低', score: 1 },
                        { text: 'B. 太潮湿或太干燥', score: 1 },
                        { text: 'C. 空气质量差', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '29. 你有没有下面这些影响睡眠的习惯？',
                    options: [
                        { text: 'A. 长时间趴着玩手机', score: 1 },
                        { text: 'B. 睡前吃得很饱', score: 1 },
                        { text: 'C. 起床后立刻刷手机', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                },
                {
                    question: '30. 你卧室的床有没有下面这些影响睡眠的摆放？',
                    options: [
                        { text: 'A. 床头对着门', score: 1 },
                        { text: 'B. 床尾对着窗户', score: 1 },
                        { text: 'C. 床上方有吊灯压着', score: 1 },
                        { text: 'D. 无上述情况', score: 0 }
                    ]
                }
            ]
        };
        
        // 初始化
        this.init();
    }
    
    // 初始化
    init() {
        this.bindEvents();
    }
    
    // 绑定事件
    bindEvents() {
        // 主界面板块选择
        document.querySelectorAll('.section-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('.section-btn').dataset.section;
                this.selectSection(section);
            });
        });
        
        // 绑定所有授权码提交事件
        this.bindAuthEvents();
        
        // 绑定所有开始按钮事件
        this.bindStartEvents();
        
        // 绑定所有返回按钮事件
        this.bindBackEvents();
        
        // 绑定所有重新评估按钮事件
        this.bindRestartEvents();
    }
    
    // 绑定授权码事件
    bindAuthEvents() {
        const sections = ['home', 'money', 'work', 'energy'];
        sections.forEach(section => {
            document.getElementById(`submit-auth-${section}`)?.addEventListener('click', () => {
                this.submitAuth(section);
            });
            
            // 回车键提交授权码
            document.getElementById(`auth-code-${section}`)?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitAuth(section);
                }
            });
        });
    }
    
    // 绑定开始按钮事件
    bindStartEvents() {
        const sections = ['home', 'money', 'work', 'energy'];
        sections.forEach(section => {
            document.getElementById(`start-${section}-btn`)?.addEventListener('click', () => {
                this.startTest(section);
            });
        });
    }
    
    // 绑定返回按钮事件
    bindBackEvents() {
        const sections = ['home', 'money', 'work', 'energy'];
        sections.forEach(section => {
            document.getElementById(`back-${section}-btn`)?.addEventListener('click', () => {
                this.backToMain();
            });
        });
    }
    
    // 绑定重新评估按钮事件
    bindRestartEvents() {
        const sections = ['home', 'money', 'work', 'energy'];
        sections.forEach(section => {
            document.getElementById(`restart-${section}-btn`)?.addEventListener('click', () => {
                this.restartTest(section);
            });
        });
    }
    
    // 选择板块
    selectSection(section) {
        this.currentSection = section;
        this.hideAllScreens();
        document.getElementById(`auth-${section}`).classList.add('active');
    }
    
    // 提交授权码
    submitAuth(section) {
        const authCode = document.getElementById(`auth-code-${section}`).value.trim();
        const errorElement = document.getElementById(`auth-error-${section}`);
        
        if (this.validAuthCodes[section].includes(authCode)) {
            errorElement.textContent = '';
            this.hideAllScreens();
            document.getElementById(`start-${section}`).classList.add('active');
            // 成功验证时添加礼花碎屑的粒子动画庆祝效果
            generateConfetti();
        } else {
            errorElement.textContent = '授权码错误，请重新输入';
        }
    }
    
    // 开始测试
    startTest(section) {
        this.currentSection = section;
        this.currentQuestionIndex = 0;
        this.answers[section] = [];
        this.hideAllScreens();
        document.getElementById(`test-${section}`).classList.add('active');
        this.loadQuestion(section);
    }
    
    // 加载问题
    loadQuestion(section) {
        const questions = this.questions[section];
        const question = questions[this.currentQuestionIndex];
        
        if (!question) {
            this.calculateResult(section);
            return;
        }
        
        // 更新问题文本
        document.getElementById(`question-text-${section}`).textContent = question.question;
        
        // 更新问题计数
        document.getElementById(`question-count-${section}`).textContent = 
            `${(this.currentQuestionIndex + 1).toString().padStart(2, '0')} / ${questions.length}`;
        
        // 更新进度条
        this.updateProgress(section);
        
        // 渲染选项
        this.renderOptions(section, question.options);
        
        // 更新导航按钮状态
        this.updateNavigationButtons(section);
    }
    
    // 渲染选项
    renderOptions(section, options) {
        const container = document.getElementById(`options-container-${section}`);
        container.innerHTML = '';
        
        options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option.text;
            optionDiv.dataset.score = option.score;
            
            // 如果已有答案，高亮选中的选项
            if (this.answers[section][this.currentQuestionIndex] === index) {
                optionDiv.classList.add('selected');
            }
            
            // 添加点击事件
            optionDiv.addEventListener('click', () => {
                this.selectOption(section, index, optionDiv);
            });
            
            container.appendChild(optionDiv);
        });
    }
    
    // 选择选项
    selectOption(section, optionIndex, optionElement) {
        // 移除所有选项的选中状态
        document.querySelectorAll(`#options-container-${section} .option`).forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // 添加当前选项的选中状态
        optionElement.classList.add('selected');
        
        // 保存答案
        this.answers[section][this.currentQuestionIndex] = optionIndex;
        
        // 自动跳转到下一题（如果不是最后一题）
        if (this.currentQuestionIndex < this.questions[section].length - 1) {
            // 添加短暂延迟，让用户看到选择效果
            setTimeout(() => {
                this.nextQuestion(section);
            }, 200);
        } else {
            // 最后一题，直接计算结果
            setTimeout(() => {
                this.calculateResult(section);
            }, 500);
        }
    }
    
    // 更新进度条
    updateProgress(section) {
        const questions = this.questions[section];
        const progress = ((this.currentQuestionIndex + 1) / questions.length) * 100;
        document.getElementById(`progress-fill-${section}`).style.width = `${progress}%`;
    }
    
    // 更新导航按钮状态
    updateNavigationButtons(section) {
        const prevBtn = document.getElementById(`prev-${section}-btn`);
        const nextBtn = document.getElementById(`next-${section}-btn`);
        
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
            prevBtn.onclick = () => this.prevQuestion(section);
        }
        
        if (nextBtn) {
            nextBtn.onclick = () => this.nextQuestion(section);
        }
    }
    
    // 上一题
    prevQuestion(section) {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadQuestion(section);
        }
    }
    
    // 下一题
    nextQuestion(section) {
        if (this.currentQuestionIndex < this.questions[section].length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion(section);
        }
    }
    
    // 计算结果
    calculateResult(section) {
        const questions = this.questions[section];
        let totalScore = 0;
        const groups = [];
        
        // 将30个问题分为10组，每组3个问题
        for (let i = 0; i < questions.length; i += 3) {
            const groupQuestions = questions.slice(i, i + 3);
            let groupScore = 0;
            const groupProblems = [];
            
            // 计算每组得分
            groupQuestions.forEach((question, groupIndex) => {
                const actualIndex = i + groupIndex;
                const selectedOptionIndex = this.answers[section][actualIndex] || 0;
                const selectedOption = question.options[selectedOptionIndex];
                groupScore += selectedOption.score;
                totalScore += selectedOption.score;
                
                if (selectedOption.score > 0) {
                    groupProblems.push({
                        question: question.question,
                        selectedOption: selectedOption.text,
                        problem: selectedOption.text.replace(/^[A-D]\.\s*/, '')
                    });
                }
            });
            
            // 获取该组的等级和建议
            const level = this.levels.find(l => l.score === groupScore) || this.levels[this.levels.length - 1];
            const solution = this.groupSolutions[section].find(s => s.score === groupScore) || this.groupSolutions[section][this.groupSolutions[section].length - 1];
            
            // 添加到分组结果
            groups.push({
                index: Math.floor(i / 3) + 1,
                questions: groupQuestions,
                score: groupScore,
                level: level,
                solution: solution,
                problems: groupProblems
            });
        }
        
        this.problems[section] = groups;
        this.displayResult(section, totalScore, groups);
    }
    
    // 显示结果
    displayResult(section, totalScore, groups) {
        this.hideAllScreens();
        document.getElementById(`result-${section}`).classList.add('active');
        
        // 计算得分百分比
        const maxScore = this.questions[section].length;
        const percentage = Math.round((1 - (totalScore / maxScore)) * 100);
        
        // 更新得分和状态
        document.getElementById(`energy-value-${section}`).textContent = percentage;
        
        // 设置状态名称
        let stateName = '';
        if (percentage >= 80) {
            stateName = '优秀';
        } else if (percentage >= 60) {
            stateName = '良好';
        } else if (percentage >= 40) {
            stateName = '一般';
        } else {
            stateName = '有待改善';
        }
        document.getElementById(`state-name-${section}`).textContent = stateName;
        
        // 更新圆环进度
        const circumference = 2 * Math.PI * 65;
        const offset = circumference - (percentage / 100) * circumference;
        document.getElementById(`ring-progress-${section}`).style.strokeDashoffset = offset;
        
        // 渲染问题列表
        this.renderProblems(section, totalScore, groups);
    }
    
    // 渲染问题列表
    renderProblems(section, totalScore, groups) {
        const container = document.getElementById(`problems-list-${section}`);
        
        if (!groups || groups.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: rgba(255, 255, 255, 0.7);">恭喜！您没有发现明显的风水冲煞问题。</p>';
            return;
        }
        
        container.innerHTML = '';
        
        // 添加总分统计
        const totalScoreDiv = document.createElement('div');
        totalScoreDiv.className = 'total-score-section';
        totalScoreDiv.innerHTML = `
            <h3>总分统计</h3>
            <div class="total-score">
                <span>总得分：</span>
                <span class="score-value">${totalScore}/30</span>
                <span class="score-percentage">（${Math.round((1 - (totalScore / 30)) * 100)}%）</span>
            </div>
        `;
        container.appendChild(totalScoreDiv);
        
        // 按组渲染结果
        groups.forEach((group, groupIndex) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group-item';
            
            // 获取该组的问题描述
            let groupProblemDesc = '';
            if (group.score === 0) {
                groupProblemDesc = '该组无明显风水问题，气场顺畅';
            } else if (group.score === 1) {
                groupProblemDesc = '存在轻微风水小问题';
            } else if (group.score === 2) {
                groupProblemDesc = '存在中等风水隐患';
            } else {
                groupProblemDesc = '存在明显风水冲煞';
            }
            
            groupDiv.innerHTML = `
                <div class="group-header">
                    <h4>第${group.index}组（${(groupIndex * 3 + 1)}-${(groupIndex + 1) * 3}题）</h4>
                    <div class="group-score">
                        <span class="score-label">累计得分：</span>
                        <span class="score-value">${group.score}/3</span>
                        <span class="level ${group.level.name.toLowerCase()}">${group.level.name}</span>
                    </div>
                </div>
                <div class="group-content">
                    <div class="group-description">${groupProblemDesc}</div>
                    <div class="group-problems">
                        ${group.problems.length > 0 ? `
                            <h5>存在的问题：</h5>
                            <ul>
                                ${group.problems.map(problem => `<li>${problem.problem}</li>`).join('')}
                            </ul>
                        ` : '<div class="no-problems">该组无明显问题</div>'}
                    </div>
                    <div class="group-solution">
                        <h5>化解建议：</h5>
                        <p>${group.solution.desc}</p>
                    </div>
                </div>
            `;
            
            container.appendChild(groupDiv);
        });
    }
    
    // 隐藏所有屏幕
    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }
    
    // 返回主界面
    backToMain() {
        this.hideAllScreens();
        document.getElementById('main-screen').classList.add('active');
    }
    
    // 重新评估
    restartTest(section) {
        this.startTest(section);
    }
}

// 页面加载完成后初始化系统
window.addEventListener('DOMContentLoaded', () => {
    new FengShuiEvaluation();
    
    // 生成星点粒子背景
    generateStars();
    
    // 绑定按钮波纹效果
    bindButtonRipple();
});

// 生成星点粒子背景
function generateStars() {
    const starsContainer = document.getElementById('stars-container');
    if (!starsContainer) return;
    
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机大小（1-3px）
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机动画延迟
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        // 随机透明度
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        starsContainer.appendChild(star);
    }
}

// 绑定按钮波纹效果
function bindButtonRipple() {
    const buttons = document.querySelectorAll('.primary-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            // 获取按钮尺寸和点击位置
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // 设置波纹样式
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // 添加波纹元素
            this.appendChild(ripple);
            
            // 移除波纹元素
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 生成礼花碎屑动画
function generateConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    const confettiCount = 100;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // 随机颜色
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.setProperty('--confetti-color', color);
        
        // 随机大小
        const size = Math.random() * 10 + 5;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // 随机初始位置
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        
        // 随机旋转角度
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // 随机动画延迟和持续时间
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        container.appendChild(confetti);
    }
    
    // 移除礼花容器
    setTimeout(() => {
        container.remove();
    }, 5000);
}