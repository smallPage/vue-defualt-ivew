<template>
  <div>
    <div class="user" style="background:#fff;padding-bottom: 65px;">

      <p  style="padding:0 20px;height: 88px;border-bottom: 1px solid #ccc;line-height: 88px;font-size: 16px;">
        <span style="color:#2c6fc1;">首页</span> > 企业数据

         <Button style="float:right;width: 148px;height: 50px;font-size: 18px;background: #2c6fc1;" @click.native="newEidtModal.show = true" type="primary" size="large" icon="plus">新建任务</Button>
      </p>

      <div  class="tab_handle"  >
        <div class="tab_tit" >任务列表</div>
        <div class="tab_btns">
              <span class="tab_btn"  style="color:#8ac676;">
                <!--<Icon type="ios-cloud-download-outline"></Icon>&nbsp;-->
                 <img src="../../../static/icon/icon_daochu.png" style="vertical-align: middle; margin-bottom: 6px;" alt="导出数据">
                导出
              </span>
          <span class="tab_btn"  style="color:#ffb431;" >
                <img src="../../../static/icon/icon_bianji.png" style="vertical-align: middle; margin-bottom: 6px;" alt="编辑任务">
            <!--<Icon type="edit"></Icon>&nbsp;-->
                编辑
              </span>
          <span class="tab_btn" style="color:#f48484;">
                <!--<Icon type="ios-trash-outline"></Icon>&nbsp;-->
                 <img src="../../../static/icon/icon_shanchu.png" style="vertical-align: middle; margin-bottom: 6px;" alt="删除任务">
                删除
              </span>

        </div>
      </div>

      <div style="margin-top: 10px;border: 0;padding: 0px 15px;">
        <Table class="common-table"  stripe  :loading="table.loading"  @on-selection-change="tableSelected" :no-data-text="'数据为空.'" :columns="table.columns" :data="table.datas" :border="false" ></Table>
      </div>


      <div style="margin-top: 50px; overflow: hidden;">
        <div style="width: 500px;margin: 0 auto;">
          <Page :total="requestParam.total" :current="requestParam.pageNum" show-sizer style=""
                @on-change="mofidyPageNum" @on-page-size-change="mofidyPageSize"></Page>
        </div>
      </div>
    </div>



    <Modal v-model="deleteModal.show" width="360" heigh="200">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>删除该数据将不可恢复</p>
        <p>是否继续删除?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="deleteModal.loading" @click.native="remove">删除</Button>
      </div>
    </Modal>

    <Modal v-model="pwdModifyModal.show" width="360">
      <p slot="header" style="color:#19be6b;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>密码修改</span>
      </p>
      <div style="text-align:center">
        <p><Input v-model="pwdModifyModal.vo.password" placeholder="请输入修改密码"></Input></p>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long :loading="pwdModifyModal.loading" @click.native="modifyPwd">确认</Button>
      </div>
    </Modal>


    <Modal    v-model="newEidtModal.show"
              title="Title"

              width="850px"
              :mask-closable="false"
              ok-text="完成"
              class-name="vertical-center-modal newTask"
              style="padding: 20px;">
      <div  slot="header">
        <img src="../../../static/icon/icon_qiyeshuju_xinjianrenwu.png" alt="">
        <span style="font-size: 24px;color:#333;display: inline-block;vertical-align: top;padding-left: 20px;padding-top: 11px;padding-left: 20px;">企业数据</span>
      </div>
      <Form :model="newTaskForm" :label-width="150" style="margin-top:24px;">
        <FormItem label="任务名称">
          <Input v-model="newTaskForm.taskName" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="抓取关键词">
          <Input v-model="newTaskForm.keyWord" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>

  import { Modal } from 'iview';
  import { userAPI, roleAPI } from '@/api'
  import { mixinCrud } from '@/components/mixins/crud';

  export default {
    mixins:[ mixinCrud ],
    data() {
      return {
        deleteModal: {
          loading: false,
          show: false
        },
        pwdModifyModal: {
          loading: false,
          show: false,
          vo: {},
        },
        roleMappings: {},
        newEidtModal:{
          loading: false,
          show: false
        },
        newTaskForm:{
          taskName:'',
          keyWord:'',
        },
        table: {
          columns: [
            { type: 'selection', width: 70, align: 'center' },
            // { title: '编号', width: 200, key: 'num', sortable: true },
            { title: '任务名称',  key: 'comName' },
            { title: '当前数据量',wdth: 80, key: 'countNow' },
            { title: '任务创建时间',wdth: 50, key: 'gmtCreateTime'},
            { title: '状态',width: 140, key: 'state', render: (h, params) => {
              return h('p', {
                style: {
                  color: params.row.stateColor,
                  display: 'inline-block'
                },
              }, params.row.state);
            } },
            { title: '进度', width: 280, className:'planTab',key: 'percentage', render: (h, params) => {
              return h('Progress', {
                attrs:{
                  status:params.row.activeLine,
                  percent:params.row.percentage,
                  strokeWidth:"10"
                },
                style:{
                  width:'250px',
                  float:'left'
                },
              },params.row.percentage + '%');
            }
            },
//            { title: '操作', width: 60, key: 'status', align: 'center', render: (h, params) => {
//                let _btns = []
//                let _iconEnabled = h('Icon',
//                  props: {
//                    type: params.row.status == 'DISABLED' ? 'close' : 'checkmark',
//                    color: params.row.status == 'DISABLED' ? 'red' : '#25c541',
//                    size: 16
//                  },
//                }, '');
//                _btns.push(_iconEnabled);
//                return h('div', _btns ? _btns : []);
//              }
//            },

            {
              title: '操作', width: 170, className:'useTab',key: 'actions', align: 'center', render: (h, params) => {
              let _btns = []

//                let _btnStart = h('Icon', {
//                  props: {
//                    type: 'play',
//                    color: '#ffb431',
//                    size: 22
//                  }
//                }, '');
              let _btnStart = h('img', {
                attrs:{
                  src:params.row.startStop
                },
                style:{
                  width:'14px',
                }
              }, '');

              let _iconStartWrap = h('div', {
                style: {
                  cursor: 'pointer',
                  display: params.row.state == '已完成'?'none':'00',
                  marginRight: '20px',
//                  textAlign:'left',
                  float:'left'
                },
                attrs: {
                  title: params.row.txtInfo
                },
                on: {
                  click: () => {

//                   
                  }
                }
              }, [_btnStart], '');
              _btns.push(_iconStartWrap);


//                let _btnStop = h('Icon', {
//                  props: {
//                    type: 'pause',
//                    color: '#2c6fc1',
//                    size: 22
//                  }
//                }, '');
//                let _btnStop = h('img', {
//                  props: {
////                    color: '#2c6fc1',
////                    size: 22
//
//                  },
//                  attrs:{
//                      src:'../../../static/icon/icon_zanting.png'
//                  },
//                  style:{
//                      width:'18px'
//                  }
//                }, '');
//
//
//                let _iconStopWrap = h('div', {
//                  style: {
//                    cursor: 'pointer',
//                    display: 'inline-block',
//                    marginLeft: '20px'
//                  },
//                  attrs: {
//                    title: '暂停'
//                  },
//                  on: {
//                    click: () => {
////                      this.$router.push({name: 'userEdit', params: { num: params.row.num }});
//                    }
//                  }
//                }, [_btnStop], '');
//                _btns.push(_iconStopWrap);



              let _btnDel = h('img', {
                attrs:{
                  src:'../../../static/icon/icon_shanchu_caozuo.png'
                },
                style:{
                  width:'18px'
                }
              }, '');
              let _iconDelWrap = h('div', {
                style: {
                  cursor: 'pointer',
//                  display: 'inline-block',
                  marginRight: '20px',
                  textAlign:'left',
                  float:'left'
                },
                attrs: {
                  title: '删除'
                },
                on: {
                  click: () => {
//                      this.$router.push({name: 'userEdit', params: { num: params.row.num }});
                    this.deleteModal.show = true;
                  }
                }
              }, [_btnDel], '');
              _btns.push(_iconDelWrap);



              let _btnPwdModify = h('img', {
                attrs:{
                  src:'../../../static/icon/icon_xiazai_caozuo.png'
                },
                style:{
                  width:'18px'
                }
              }, '');
              let _iconPwdModifyWrap = h('div', {
                style: {
                  cursor: 'pointer',
//                  display: 'inline-block',
                  marginRight: '20px',
                  textAlign:'left',
                  float:'left'
                },
                attrs: {
                  title: '下载'
                },
                on: {
                  click: () => {

//                      this.pwdModifyModal.vo = params.row || {};
//                      this.pwdModifyModal.vo.password = '';



                  }
                }
              }, [_btnPwdModify], '');
              _btns.push(_iconPwdModifyWrap);

              return h('div', _btns ? _btns : []);
            }
            }
          ],
          datas: [

          ],
          selected: [],
          loading: true
        },
        testData: {
          "queryPageParam": {
            "pageNum": 1,
            "pageSize": 10,
            "total":12
          },
          "listData": [
            {
              "_id": "数据id",
              "comName": "没开始爬的数据",
              "countNow": 0,
              "gmtCreateTime":"2018-07-02",
              "count":0,
              "state": "RUNNO",
              "percentage":"0",

            },
            {
              "_id": "123123",
              "comName": "正在爬的数据",
              "countNow": "1000",
              "count":"0",
               "gmtCreateTime":"2018-07-03",
             "state": "RUNNOW",
             "percentage":"35",

             },
            {
              "_id": "123123",
              "comName": "正在爬的数据",
              "countNow": "2000",
              "count":"10000",
              "gmtCreateTime":"2018-07-22",
              "state": "RUNSTOP",
              "percentage":"20",

            },
         {
              "_id": "15611",
           "comName": "爬完的数据",
           "countNow": 1000,
           "count":0,
           "gmtCreateTime":"2018-07-23",
          "state": "RUNOVER",
          "percentage":"100",

      }
    ]
    },
      }
    },
    mounted() {
      this.mixinsAPI = userAPI;
      this.fetchRoleDatas();
    },
    methods: {
      fetchDatas() {
        userAPI.fetchList(this.requestParam).then(res => {
            console.log(res);
          if (res.code === 0) {
//            res.data.datas.map((obj, i) => {
//              let _gmtCreateTime = obj.gmtCreateTime;
//              if (_gmtCreateTime && _gmtCreateTime.indexOf(' ') != -1) {
//                obj.gmtCreateTime = _gmtCreateTime.split(' ')[0];
//              }
//              if (this.roleMappings && this.roleMappings[obj.roleCode]) {
//                obj['refRoleName'] = this.roleMappings[obj.roleCode];
//              }
//            });
            console.log(res.data.datas);
            let newData = this.testData.listData;
            newData.forEach((value, index, array)=>{
              if(value.state == "RUNNO"){
                  value.state = '未开始';
                  value.stateColor = "#c12c2c"
                  value.startStop = '../../../static/icon/icon_kaishi.png'
                  value.txtInfo = '开始抓取'


              }else if(value.state == "RUNNOW"){
                 value.state = '进行中';
                 value.stateColor = "#2c6fc1"
                 value.startStop = '../../../static/icon/icon_zanting.png'
                 value.activeLine = 'active'
                 value.txtInfo = '暂停抓取'


              }else if(value.state == "RUNSTOP"){
                value.state = '暂停';
                value.stateColor = "#c12c2c"
                value.startStop = '../../../static/icon/icon_kaishi.png'
                value.txtInfo = '开始抓取'

              }else if(value.state == "RUNOVER"){
                value.state = '已完成'
                value.stateColor = "#2cc6a4"
                value.startStop = ''
              }

              if(value.countNow == 0 ){
                 value.countNow = '——'
              }


            });
            this.table.datas = newData;
//            this.table.datas = res.data.datas;
//            this.requestParam = Object.assign({}, this.requestParam, res.data.queryPageParam);
              this.requestParam = Object.assign({}, this.requestParam, this.testData.queryPageParam);
              console.log(this.requestParam);
            this.table.loading = false;
          }
        })
      },
      fetchRoleDatas() {
        roleAPI.fetchSelectAll(this.requestParam).then(res => {
          if (res.code === 0) {
            let _roleMappings = {};
            res.data.datas.map((obj, i) => {
              _roleMappings[obj.code] = obj.name;
            });
            this.roleMappings = _roleMappings;
          }
          this.fetchDatas();
        })
      },
      search() {
        this.requestParam.pageNum = 1;
        this.fetchDatas();
      },
      modifyPwd() {
        if (!this.pwdModifyModal.vo || !this.pwdModifyModal.vo.password) {
          this.$Message.error('请输入修改密码!');
          return;
        }
        userAPI.modifyPwd(this.pwdModifyModal.vo).then(res => {
          if (res.code === 0) {
            this.pwdModifyModal.vo = {};
            this.pwdModifyModal.show = false;
            this.$Message.success('修改密码成功!');
          } else {
            this.$Message.error('修改密码失败!');
          }
        })
      },
      refresh() {
        this.deleteModal.show = false;
        this.fetchDatas();
      }
    }
  }
</script>




<style lang="scss" scope>
  .user h1 {
    font-size: 18px;
    line-height: 24px;
    padding-bottom: 8px;
    font-weight: 400;
    color: #464c5b;
    margin-top: 5px;
  }


  .user .tab_handle{
    height: 70px;
    /*border-bottom: 1px solid #ccc;*/
    line-height: 70px;
    font-size: 14px;
    position: relative;
    .tab_tit{
      position: absolute;
      width: 152px;
      height: 52px;
      line-height:52px;
      text-align:center;
      border-top: 4px solid #2c6fc1;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      font-size: 18px;
      color: #2c6fc1;
      background: #fff;
      top: 29px;
      left: 15px;
      z-index: 22;
    }
    .tab_btns{
      width: 300px;
      height: 70px;
      float: right;
      margin-right: 15px;
      line-height:86px;
      /*background: #e2e8f7;*/
      .tab_btn{
        font-size: 16px;
        cursor: pointer;
        padding-left: 40px;
        /*font-weight: bold;*/
        /*background: #ddd4b0;*/
      }
    }

  }

</style>
<style lang="scss">
  .ivu-form .ivu-form-item-label{
    margin-top: 16px;
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 18px;
    color: #333;
    /* line-height: 1; */
    /* height: 60px; */
    padding: 0 0 0 22px;
    border-left: 3px solid #2c6fc1;
    /* padding: 10px 12px 10px 0; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  textarea.ivu-input{
    font-size: 16px;
    padding-top: 16px;
  }
  .ivu-input{
    height: 60px;
    font-size: 16px;
  }

  .ivu-modal-footer{
    border-top: 0;
  }

  .newTask{
    .ivu-modal-content{
      padding: 30px;
      height:512px;
    }
  }

  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }

  .ivu-progress-bg{
    background: #4bbcef ;
    /*background: -webkit-linear-gradient(left,#30d9b3,#4bbcef)  !important;*/
    background: -webkit-radial-gradient(left, circle cover, #30d9b3 10%, #4bbcef 80%) ;
    background: -moz-linear-gradient(left, circle cover, #30d9b3 10%, #4bbcef 80%)  !important;
    background: -o-linear-gradient(left, circle cover, #30d9b3 10%, #4bbcef 80%) !important;
  }

  .ivu-page-item-active{
    background: #2c6fc1 ;
    border-color:#2c6fc1 ;
  }

  .ivu-btn-primary{
    border-color: #2c6fc1;
  }
  .ivu-btn-primary:hover{
    border-color: #3b89eb!important;
    background:#3b89eb !important;
  }

  .ivu-table:before , .ivu-table:after{
    background-color: transparent !important;
  }

  .ivu-table-wrapper{
    border:0;
  }

  .ivu-table td, .ivu-table th{
    border-bottom: 0 !important;
  }
  .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
    background: #6abffd38;
  }
  .common-table .ivu-table-header{
    border-top: 1px solid #ccc
  }

  td .ivu-table-cell{
    font-size: 15px;
  }
  .th .ivu-table-cell{
    display: inline-block;
    /* word-wrap: normal; */
    vertical-align: top;
    font-size: 18px !important;
    color: #666 !important;
    font-weight: 500;
  }
  .ivu-table-cell{
    padding-right: 0;
  }
  .common-table .ivu-table-header table th{
    vertical-align: top;
    margin: 0 auto;
    font-size: 18px !important;
    color: #666 !important;
    font-weight: 500;
  }

  .common-table .ivu-table-header table th.planTab {
    /*padding-left: 15px;*/
    text-align: left;
  }
   .common-table .ivu-table-header table th.useTab{
     text-align: left;
     /*padding-left: 35px;*/
    }
</style>
