<template>
<div class="header-wraper">
    <el-menu  default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">

        <li class="title">
            <i class="el-icon-menu"></i>
            <span style="color: black">后台管理系统</span>
        </li>

        <li class="user">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link"style="color: black">
                超级管理员<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </li>
    </el-menu>
</div>
</template>


<script>
export default {
    data() {
        return {

        }
    },
    methods: {

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
</style>
