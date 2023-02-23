<template>
  <div>

    <el-input
        style="width: 200px;padding: 10px"
        placeholder="请输入用户名称"
        v-model="input"
        @keyup.enter.native="selectCheckItems"
    >

    </el-input>
    <el-button icon="el-icon-search" circle @click="selectCheckItems"></el-button>
    <el-button type="primary" icon="el-icon-edit" circle @click="opendialog"></el-button>
    <el-table
        :data="tableData"
        :header-cell-style="{'text-align':'center'}"
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        highlight-current-row
        style="width: 100%">
      <el-table-column
          align="center"
          prop="id"
          label="序号"
          width="180">
      </el-table-column>
      <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          align="center"
          prop="keyword"
          label="人员编码">
      </el-table-column>
      <el-table-column
          align="center"
          prop="description"
          label="说明">
      </el-table-column>
      <el-table-column label="操作"align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button
                type="primary" plain
                size="small"
                @click="opendialog2(scope.row)">编辑</el-button>
            <el-button
                size="small"
                plain
                type="danger"
                @click="deleteCheckItems(scope.row)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!--提示框+loading-->
    <el-dialog
        :title=title
        :visible.sync="dialogVisible"
        width="500px"
        @close="resetForm('ruleForm')"
    >

      <!--内容-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="right" :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="自定义编码" prop="code">
          <el-input v-model="ruleForm.code" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="addCheckItems('ruleForm')" v-if="this.title=='新增检查项'">新 增</el-button>
    <el-button type="primary" @click="changeCheckItems('ruleForm')" v-if="this.title=='编辑检查项'"> 编 辑</el-button>
  </span>

    </el-dialog>
    <!--    分页-->
    <div class="block">
      <el-pagination
          style="margin-top: 10px"
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="pageSize"
          hide-on-single-page
          class="pagination"
          background
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <!--提示栏-->

  </div>
</template>

<style media="screen">


</style>
<script>
export default {
  data() {
    return {
      title:'',
      //分页
      page:1,
      pageSize:10,
      total:0,
      name:null,
      ruleForm: {
        code:'',
        name:'',
        desc:'',
      },
      ruleForm2:{
        id:'',
        name:'',
        sex:'',
        age:'',
        leixing:'',
        money:'',
        desc:'',
        desc2:'',
      },
      rules: {
        name: [
          {required: true, message: '请输入角色姓名', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入角色姓名', trigger: 'blur'},
        ],
        desc:[],
        desc2:[],
      },
      dialogVisible: false,
      input:'',
      loading: false,
      tableData: [
      ]
    }
  },
  methods:{
    //弹出框
    opendialog(){
      this.ruleForm= {};
      this.dialogVisible=true;
      this.title = '新增检查项';
    },
    opendialog2(row){
      this.dialogVisible=true;
      this.title = '编辑检查项';
      this.ruleForm.id=row.id;
      this.ruleForm.code=row.code;
      this.ruleForm.name=row.name;
      this.ruleForm.sex=row.sex;
      this.ruleForm.age=row.age;
      this.ruleForm.leixing=row.type;
      this.ruleForm.money=row.price;
      this.ruleForm.desc=row.remark;
      this.ruleForm.desc2=row.attention;
    },
    //校验规则
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
    },
    //获取全部数据
    async getCheckItems(){
      await this.$axios
          .get("/role/list",{
            params:{
              page:this.page,
              pageSize:this.pageSize,
              name:null,
            }
          })
          .then((res)=> {
                this.tableData = res.data.data.records;
                this.total = res.data.data.total;
              }
          )
          .catch(function (error){
            console.log(error.response);
          })
    },
    //查询项目
    async selectCheckItems(){
      await this.$axios
          .get("/role/list",{
            params:{
              page:1,
              pageSize:10,
              name:this.input,
            }
          })
          .then((res)=> {
                this.loading=true;
                this.tableData = res.data.data.records;
                this.total = res.data.data.total;
                this.input = '';
                this.loading=false;
                this.$notify({
                  title: '成功',
                  message: '查询成功',
                  type: 'success'
                });
              }
          )
          .catch(function (error){
            console.log(error.response);
            this.$notify({
              title: '失败',
              message: '查询失败',
              type: 'warning'
            });
          })
    },
    //增加检查项
    addCheckItems(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.loading=true;
          this.$axios
              .post("/tcheckitem/save",{
                keyword: this.ruleForm.code,
                rolePermissionIds: [],
                description: this.ruleForm.desc,
                name:this.ruleForm.name,
              })
              .then((res)=>{
                this.loading=false;
                this.getCheckItems();
                this.$notify({
                  title: '成功',
                  message: '增加成功',
                  type: 'success'
                });
              })
              .catch(function (error){
                this.$notify({
                  title: '失败',
                  message: '增加失败',
                  type: 'warning'
                });
              })
        } else {
          this.$notify({
            title: '失败',
            message: '增加失败',
            type: 'warning'
          });
          return false;
        }
      })
    },
    //修改检查项
    async changeCheckItems(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.loading=true;
          this.$axios
              .post("/tcheckitem/update",{
                age: this.ruleForm.age,
                attention: this.ruleForm.desc2,
                code: this.ruleForm.code,
                id: this.ruleForm.id,
                name: this.ruleForm.name,
                price: this.ruleForm.leixing,
                remark: this.ruleForm.desc,
                sex: this.ruleForm.sex,
                type: this.ruleForm.leixing,
              })
              .then((res)=>{
                this.loading=false;
                this.getCheckItems();
                this.$notify({
                  title: '成功',
                  message: '编辑成功',
                  type: 'success'
                });
              })
              .catch(function (error){
                this.$notify({
                  title: '失败',
                  message: '编辑失败',
                  type: 'warning'
                });
              })
        } else {
          this.$notify({
            title: '失败',
            message: '增加失败',
            type: 'warning'
          });
          return false;
        }
      })
    },
    //删除检查项
    async  deleteCheckItems(row){
      let {data} = await this.$axios
          .delete("/role/delete",{
            params:{
              id:row.id,
            }
          })
      if(data){
        this.loading=true;
        await this.getCheckItems();
        this.loading=false;
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        });
      };
      if(this.tableData.length===0){
        if (this.page > 1){
          this.page = this.page - 1
          await this.getCheckItems()
        }else {
          await this.getCheckItems()
        }
      }
    },
    //分页
    handleCurrentChange(val){
      this.page = val;
      this.getCheckItems();
    }
  },
  created() {
    this.getCheckItems();
  }
}
</script>