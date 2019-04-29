# ProjectHub

中文名还没想好

这个项目是我在学习 angular 时做的，同时临近毕业打算作为毕业设计。项目分为 [移动客户端](https://github.com/xjonson/ProjectHub-Client-Mobile)、[PC端后台管理](https://github.com/xjonson/ProjectHub-Admin)、[server端](https://github.com/xjonson/ProjectHub-BackEnd)。这是移动客户端。

## 介绍

- ~~当前使用fake api，将来会使用node代替~~ 已经使用node后端提供api
- 用户可以注册、登录，除管理员外具有 需求方(demander)和开发方(developer)身份
- 需求方可发布项目需求，经过后台审核通过后可展示在项目大厅
- 开发方可查看项目、留言、申请接单
- 通过需求方审核后的会确定项目的开发方，双方互相对接，推动项目的开发


## 开发环境

- Node.js v8.9.4
- Angular v7.3.0
- Angular Material v7.2.0
- TypeScript v3.2.2
- ~~json-server v0.14.2~~


## 使用

请先确保你已拥有以上环境

```bash
git clone git@github.com:xjonson/ProjectHub-Client-Mobile.git
```

```bash
cd ProjectHub-Client-Mobile

npm install

npm run dev
```

然后打开 [http://localhost:4200/](http://localhost:4200/) 即可预览效果

server端api请[移步这里](https://github.com/xjonson/ProjectHub-BackEnd)

## 展示

用户登录
![user_login](./screenshots/user_login.png)
<br>
用户注册
![user_register](./screenshots/user_register.png)
<br>
用户信息
![user_profile](./screenshots/user_profile.png)
<br>
用户修改信息
![user_update_info](./screenshots/user_update_info.png)
<br>
用户修改密码
![user_update_pwd](./screenshots/user_update_pwd.png)
<br>
用户项目列表
![user_projects](./screenshots/user_projects.png)
<br>
用户消息
![msgs](./screenshots/msgs.png)
<br>
项目列表
![project_list](./screenshots/project_list.png)
<br>
项目列表筛选-1
![project_list_filter1](./screenshots/project_list_filter1.png)
<br>
项目列表筛选-2
![project_list_filter2](./screenshots/project_list_filter2.png)
<br>
项目详情
![project_detail](./screenshots/project_detail.png)
<br>
发布项目-编辑信息
![project_edit](./screenshots/project_edit.png)
<br>
发布项目-估价系统-选择项目类型
![project_assess_step1](./screenshots/project_assess_step1.png)
<br>
发布项目-估价系统-选择项目功能
![project_assess_step2](./screenshots/project_assess_step2.png)
<br>
发布项目
![project_publish](./screenshots/project_publish.png)
<br>