// 成长动机评估系统
class GrowthMotivationAssessment {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.questions = []; // 题目数据，用户可在此添加
        this.stages = [
            {"name": "萌芽区", "score_range": [0, 20], "focus": "唤醒目标意识", "action": "写下3个想改变的小事"},
            {"name": "探索区", "score_range": [21, 40], "focus": "拓展认知边界", "action": "每周尝试1件新事物"},
            {"name": "蓄力区", "score_range": [41, 60], "focus": "搭建行动框架", "action": "用四象限法规划每日任务"},
            {"name": "破局区", "score_range": [61, 80], "focus": "突破舒适壁垒", "action": "主动承担1项有挑战的工作"},
            {"name": "跃迁区", "score_range": [81, 100], "focus": "整合资源势能", "action": "链接3位不同领域的人脉"},
            {"name": "精进区", "score_range": [101, 120], "focus": "打磨核心能力", "action": "每天刻意练习1小时专业技能"},
            {"name": "裂变区", "score_range": [121, 140], "focus": "复制成功模式", "action": "把经验梳理成可分享的方法论"},
            {"name": "领航区", "score_range": [141, 160], "focus": "引领生态协同", "action": "发起1个跨团队合作项目"},
            {"name": "创造区", "score_range": [161, 180], "focus": "开拓全新价值", "action": "提出1个行业内的创新提案"},
            {"name": "传承区", "score_range": [181, 200], "focus": "沉淀智慧体系", "action": "编写1本个人成长手册"}
        ];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSampleQuestions(); // 加载示例题目，用户可替换为真实题目
    }

    bindEvents() {
        // 开始测试按钮
        document.getElementById('start-btn').addEventListener('click', () => {
            this.showScreen('test-screen');
            this.loadQuestion();
        });

        // 重新测试按钮
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.resetTest();
            this.showScreen('start-screen');
        });

        // 上一题按钮
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.prevQuestion();
        });

        // 下一题按钮
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });
    }

    // 显示指定屏幕
    showScreen(screenId) {
        // 隐藏所有屏幕
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        // 显示目标屏幕
        document.getElementById(screenId).classList.add('active');
    }

    // 加载示例题目
    loadSampleQuestions() {
        // 40道成长动机评估题目
        this.questions = [
            {
                question: '我能清晰说出未来3年的具体职业目标。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会把大目标拆解成每月、每周的小任务。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我定期回顾目标完成情况并调整计划。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我的目标和个人价值观是一致的。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '面对新机会时，我会判断是否符合我的长期目标。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我能清晰区分“想要”和“需要”的目标。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会为目标设置明确的截止日期。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我能向他人清晰解释我的目标和实现路径。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我的目标是具体可衡量的，而非模糊的“变得更好”。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '当目标受阻时，我会优先保护核心目标而非次要目标。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会立刻去做重要且紧急的事，不会拖延。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我习惯用“先完成再完美”的方式推进任务。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我能在干扰较多的环境中专注完成任务。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会主动寻找资源来推进任务，而非等待条件成熟。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我每天都有固定的“专注工作/学习”时间段。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会把大任务拆解成小步骤，逐步推进。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我能快速从“想法”阶段进入“行动”阶段。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会主动承担额外的任务，挑战自己的能力边界。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我习惯用“番茄工作法”或类似工具管理时间。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我能在规定时间内高质量完成任务。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '面对失败时，我会先分析原因，而不是陷入自责。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我能从挫折中总结经验，避免再犯同样的错。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '遇到困难时，我会主动寻求帮助，而非独自硬扛。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我相信“失败是成功之母”，挫折只是暂时的。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '面对他人的否定，我会坚定自己的方向，不轻易动摇。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我能快速从负面情绪中走出来，重新投入行动。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会把大挫折拆解成小问题，逐个解决。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我有自己的“心理调节方法”，比如运动、写日记等。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '面对压力时，我能保持冷静，理性分析局势。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会用“成长型思维”看待挑战，认为能力可以通过努力提升。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我每周都会主动学习新的知识或技能。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会主动拆解新技能的底层逻辑，而非死记硬背。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我习惯用“费曼学习法”给别人讲解新知识来巩固自己的理解。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会定期梳理知识体系，把碎片化信息整合成框架。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '面对陌生领域，我能快速找到核心入门资料和关键节点。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会主动寻找反馈，用结果来调整学习方法。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我习惯用“提问驱动学习”，带着问题去探索答案。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我能在不同领域间找到知识的共通点，进行迁移应用。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我会关注行业前沿动态，定期更新自己的知识储备。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            },
            {
                question: '我有自己的“学习工具箱”，比如笔记软件、思维导图等。',
                options: [
                    { text: 'A. 完全不符合', score: 1 },
                    { text: 'B. 不太符合', score: 2 },
                    { text: 'C. 一般符合', score: 3 },
                    { text: 'D. 比较符合', score: 4 },
                    { text: 'E. 完全符合', score: 5 }
                ]
            }
        ];
    }

    // 加载当前问题
    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        if (!question) return;

        // 更新问题文本
        document.getElementById('question-text').textContent = `${this.currentQuestionIndex + 1}. ${question.question}`;

        // 更新问题计数
        document.getElementById('question-count').textContent = 
            `${(this.currentQuestionIndex + 1).toString().padStart(2, '0')} / ${this.questions.length}`;

        // 更新进度条
        this.updateProgress();

        // 渲染选项
        this.renderOptions(question.options);

        // 更新导航按钮状态
        this.updateNavigationButtons();
    }

    // 渲染选项
    renderOptions(options) {
        const container = document.getElementById('options-container');
        container.innerHTML = '';

        options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option.text;
            optionDiv.dataset.score = option.score;

            // 如果已有答案，高亮选中的选项
            if (this.answers[this.currentQuestionIndex] === index) {
                optionDiv.classList.add('selected');
            }

            // 添加点击事件
            optionDiv.addEventListener('click', () => {
                this.selectOption(index, optionDiv);
            });

            container.appendChild(optionDiv);
        });
    }

    // 选择选项
    selectOption(optionIndex, optionElement) {
        // 移除所有选项的选中状态
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        // 添加当前选项的选中状态
        optionElement.classList.add('selected');
        // 保存答案
        this.answers[this.currentQuestionIndex] = optionIndex;
        
        // 自动跳转到下一题（如果不是最后一题）
        if (this.currentQuestionIndex < this.questions.length - 1) {
            // 添加短暂延迟，让用户看到选择效果
            setTimeout(() => {
                this.nextQuestion();
            }, 500);
        }
    }

    // 更新进度条
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
    }

    // 更新导航按钮状态
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // 上一题按钮状态
        prevBtn.disabled = this.currentQuestionIndex === 0;

        // 下一题按钮文本
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.textContent = '完成测试';
        } else {
            nextBtn.textContent = '下一题';
        }
    }

    // 上一题
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadQuestion();
        }
    }

    // 下一题
    nextQuestion() {
        // 检查是否选择了答案
        if (this.answers[this.currentQuestionIndex] === undefined) {
            alert('请选择一个答案');
            return;
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.loadQuestion();
        } else {
            // 完成测试
            this.calculateResult();
        }
    }

    // 计算测试结果
    calculateResult() {
        if (this.answers.length === 0) {
            alert('请至少回答一道题目');
            return;
        }

        // 计算总分
        let totalScore = 0;
        this.answers.forEach((optionIndex, questionIndex) => {
            const question = this.questions[questionIndex];
            if (question && question.options[optionIndex]) {
                totalScore += question.options[optionIndex].score;
            }
        });

        // 确定阶段
        const stage = this.getStageByScore(totalScore);
        
        // 显示结果
        this.showResult(totalScore, stage);
    }

    // 根据分数获取阶段
    getStageByScore(score) {
        for (const stage of this.stages) {
            const [minScore, maxScore] = stage.score_range;
            if (score >= minScore && score <= maxScore) {
                return stage;
            }
        }
        // 默认返回第一个阶段
        return this.stages[0];
    }

    // 显示结果
    showResult(score, stage) {
        // 更新结果数据
        document.getElementById('energy-value').textContent = score;
        document.getElementById('state-name').textContent = `${stage.name}`;
        document.getElementById('state-tags-text').textContent = `${stage.focus} · ${stage.action}`;

        // 更新状态梯子的激活状态
        document.querySelectorAll('.ladder-item').forEach(item => {
            item.classList.remove('active');
        });

        // 高亮当前阶段
        const [minScore] = stage.score_range;
        const currentStageElement = document.querySelector(`.ladder-item[data-score="${minScore}"]`);
        if (currentStageElement) {
            currentStageElement.classList.add('active');
        }

        // 显示结果屏幕
        this.showScreen('result-screen');
    }

    // 重置测试
    resetTest() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        document.getElementById('progress-fill').style.width = '0%';
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new GrowthMotivationAssessment();
});

// 题目数据结构说明：
// 每道题目包含 question（问题文本）和 options（选项数组）
// 每个选项包含 text（选项文本）和 score（分数值，建议1-4分）
// 用户可以在 questions 数组中添加更多题目，格式如下：
/*
this.questions = [
    {
        question: '问题文本',
        options: [
            { text: '选项1', score: 1 },
            { text: '选项2', score: 2 },
            { text: '选项3', score: 3 },
            { text: '选项4', score: 4 }
        ]
    },
    // 更多题目...
];
*/