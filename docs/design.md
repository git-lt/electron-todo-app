## 产品定位

团队任务管理 + 生成周报


数据同步 websocket
数据请求 grahql ?


## 路由设计

首页 /
登录页 /login
创建工作空间 /join
任务列表 /[workspace]/tasks
  任务详情 /[team]/:taskId


看板 /[workspace]/views
  /tasks
  /project

设置页 /[workspace]/settings
  空间信息 workspace
  成员列表 members
  任务标签 labels
  任务模板 templates
  用户信息 profile
  偏好设置 Preferences
  消息通知 notifications

布局 
MainLayout
SettingLayout
LoginLayout 登录注册布局
HeroLayout 官网


## 数据结构

user - workspace - team - task

工作空间有多个Team
先邀请人进加入工作空间
再将工作空间的人加入到team

工作空间A 成员A 成员B 成员C
工作空间B
工作空间C

创建用户时，必须创建一个默认的工作空间

### 用户

### 项目

### 任务

 可以多层嵌套

组件划分

任务


PriorityStatus
TaskId
TaskStatus
TaskProgress
ProjectName
DateTimeTag
AssignStatus

任务
  进行中 。。。
  
看板
  项目
  产品线
  周报
  月报
  年报

设置
  项目：
  产品线：
  任务分类:
  任务标签:
  任务进度:
  优先级：
  个人中心
    用户名、头像、邮箱、
  成员？
  偏好设置？
    主题
    字体大小
 

 默认指派给自己


 github登录
 https://github.com/settings/applications/new