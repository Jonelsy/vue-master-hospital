// the config of app router
import Login from './components/login.vue';
import TestManagement from './components/testManagement/TestManagement.vue';
import UserGroup from './components/userGroup/UserGroup.vue';
import Help from './components/help/Help.vue';
import Feedback from './components/feedback/Feedback.vue';

//预约管理
import List from './components/AppointmentManagement/List.vue';
import Setup from './components/AppointmentManagement/Setup.vue';
import Package from './components/AppointmentManagement/Package.vue';
import Inspection from './components/AppointmentManagement/Inspection.vue';
import CheckItems from './components/AppointmentManagement/CheckItems.vue';
import App from './App.vue'

//系统设置
import Menu from "./components/user/Menu.vue";
import RoleList from './components/user/RoleList.vue';
import Jurisdiction from './components/user/Jurisdiction.vue';
import UserList from './components/user/UserList.vue';
export default [{
        path: '/index',
        component: App,
        children: [{
                name: '测试管理',
                path: 'testManagement',
                component: TestManagement
            },
            {
              name: '用户分群管理',
              path: 'userGroup',
              component:UserGroup
            },
            {
              name: '用户管理',
              path: 'userList',
              component: UserList
            },
            {
              name: '帮助中心',
              path: 'help',
              component:Help
            },
            {
              name: '意见反馈',
              path: 'feedback',
              component:Feedback
            },
            {
                name: '预约列表',
                path: 'list',
                component:List
            },
            {
                name: '预约设置',
                path: 'setup',
                component:Setup
            },
            {
                name: '套餐管理',
                path: 'package',
                component:Package
            },
            {
                name: '检查组管理',
                path: 'inspection',
                component:Inspection
            },
            {
                name: '检查项管理',
                path: 'checkitems',
                component:CheckItems
            },
            {
                name: '菜单管理',
                path: 'menu',
                component:Menu
            },
            {
                name: '权限管理',
                path: 'Jurisdiction',
                component:Jurisdiction
            },
            {
                name: '角色管理',
                path: 'RoleList',
                component:RoleList
            },
        ]
    },
    {
        path: '/',
        name:'登录',
        component: Login,
    },

]

