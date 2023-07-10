## 产品定位

团队任务管理 + 生成周报

### 工作空间与团队

1. 1个账号多个工作空间，1个工作空间下多个团队
2. 工作空间下可以创建多个团队

### 成员

工作空间可以通过邮件邀请加入（通过链接或邮箱，需要管理员审核）
团队可以从工作空间邀请成员加入（不需要确认）

每个团队有自己的 标签、任务进度(工作流程)



数据同步 websocket
数据请求 grahql ?


## 路由设计

首页 /
登录页 /login
创建工作空间 /join
任务列表 /[workspace]/tasks
  任务详情 /[teamId]/:taskId


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

 用户表
 登录授权表 github授权、邮箱登录
 工作空间表
 团队表
 
 任务表
 
 字典表
  任务标签表
  任务优先级表
  任务进度表

 任务类型表 task
 产品线表 product
 项目表 project

sys_user
sys_user_auth
sys_workspace
sys_team
sys_role
sys_dict_type
sys_dict_data
task
product
project

关联表

sys_workspace_team
sys_workspace_user
sys_team_user
sys_team_user_role







1. TaskTrackr (科技感英文名)
2. ProgressPro (科技感英文名)
3. TaskMaster (科技感英文名)
4. ProjectPulse (科技感英文名)
5. TrackerTech (科技感英文名)
6. Progess360 (科技感英文名)
7. TaskSense (科技感英文名)
8. TrackBridge (科技感英文名)
9. TaskSync (科技感英文名)
10. ProTrackr (科技感英文名)