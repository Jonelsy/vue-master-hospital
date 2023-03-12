<template>
<div class="header-wraper">
    <el-menu  default-active="1" class="el-menu-demo" mode="horizontal" >
        <li class="title">
            <i class="el-icon-menu"></i>
            <span style="color: black">后台管理系统</span>
        </li>
        <li class="user">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link"style="color: black" >
                      <el-avatar size="small"  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="margin-right: 8px;cursor:pointer;"></el-avatar>
                <span style="cursor:pointer;">超级管理员</span><i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="personMenu()">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="editMenu()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </li>
    </el-menu>
</div>
</template>


<script>
import preventBack from 'vue-prevent-browser-back';
export default {
  mixins: [preventBack],//注入  阻止返回上一页
    data() {
        return {

        }
    },
    methods: {
      editMenu(){
        console.log(1)
        this.$router.push("/");
        localStorage.removeItem("token");
      },
      personMenu(){
        this.$router.push("/index/UserGroup");
      }
    }
}
</script>


<style media="screen">
.header-wraper li {
    float: left;
    margin-right: 20px;
    margin-top: 5px;
}

.title {
    padding: 1em .2em;
}

.title span {
    font-size: 1.4em;
    margin-left: 5px;
}
.el-select-dropdown__list{
  max-height: 187px !important;
}
.option {
    padding-top: 10px;
}

.user .el-dropdown {
    position: absolute;
    right: 20px;
    padding-top: 20px;
    color: #fff !important;
}
.el-dropdown-link{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
