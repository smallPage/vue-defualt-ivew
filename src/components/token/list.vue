<template>
  <div>
    <div class="token">

      <h1>TOKEN管理</h1>

      <div class="filter-btns clearfix">
        <div class="r usergroup-search">
          <Button type="ghost" style="margin-left: 12px; margin-top: 0px;" :disabled="selected.length > 0 ? false : true" shape="circle" icon="trash-a" class="l" @click="deleteModal.show = true">删除</Button>
          <!-- <Button type="ghost" style="margin-left: 12px; margin-top: 0px;" disabled="disabled" shape="circle" icon="eye" class="l">查阅</Button>
          <div class="usergroup-search-div ivu-input-wrapper ivu-input-type" style="width: 160px; margin-left: 12px;">
            <i class="ivu-icon ivu-icon-ios-search-strong ivu-input-icon ivu-input-icon-normal"></i>
            <input autocomplete="off" spellcheck="false" type="text" placeholder="搜索" class="ivu-input">
          </div> -->
        </div>
      </div>

      <Table class="common-table" border :loading="table.loading" :highlight-row="true" @on-selection-change="tableSelected" :no-data-text="'数据为空.'" :columns="table.columns" :data="table.datas" :border="false" style="margin-top: 10px;"></Table>
      <div style="margin-top: 15px; overflow: hidden;">
        <div style="float: right">
          <Page :total="requestParam.total" :current="requestParam.pageNum" show-sizer style="" 
              @on-change="mofidyPageNum" @on-page-size-change="mofidyPageSize"></Page>
        </div>
      </div>
    </div>

    <Modal v-model="deleteModal.show" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>当前选择 {{ selected.length || 0 }} 项待删除数据.</p>
        <p>是否继续删除?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="deleteModal.loading" @click.native="remove">删除</Button>
      </div>
    </Modal>

  </div>
</template>

<script>

  import { Modal } from 'iview';
  import { tokenAPI } from '@/api'
  import { mixinCrud } from '@/components/mixins/crud';
  import expandRow from './list-row-expand.vue';

  export default {
    mixins:[ mixinCrud ],
    data() {
      return {
        deleteModal: {
          loading: false,
          show: false
        },
        table: {
          columns: [
            {
                type: 'expand',
                width: 50,
                render: (h, params) => {
                    return h(expandRow, {
                        props: {
                            row: params.row
                        }
                    })
                }
            },
            { title: '用户编号', width: 200, key: 'refUserNum', sortable: true },
            { title: '用户名', key: 'refUser.nickName', render: (h, params) => { return params.row.refUser ? params.row.refUser.nickName : '' } },
            { title: 'TOKEN', key: 'token', ellipsis: true },
            { title: '过期时间', key: 'expireTime' },
            { title: '状态', width: 60, key: 'status', align: 'center', render: (h, params) => {
                let _btns = []
                let _iconEnabled = h('Icon', {
                  props: {
                    type: params.row.status == 'DISABLED' ? 'close' : 'checkmark',
                    color: params.row.status == 'DISABLED' ? 'red' : '#25c541',
                    size: 16
                  },
                }, '');
                _btns.push(_iconEnabled);
                return h('div', _btns ? _btns : []);
              }
            },
            { title: '是否过期', width: 100, key: 'status', align: 'center', render: (h, params) => {
                let _btns = []
                let _iconEnabled = h('Icon', {
                  props: {
                    type: params.row.expire ? 'close' : 'checkmark',
                    color: params.row.expire ? 'red' : '#25c541',
                    size: 16
                  },
                }, '');
                _btns.push(_iconEnabled);
                return h('div', _btns ? _btns : []);
              }
            },
            { title: '创建时间', key: 'gmtCreateTime', sortable: true },
            {
              title: '操作', width: 120, key: 'actions', align: 'center', render: (h, params) => {
                let _btns = []

                // let _btnEdit = h('Icon', {
                //   props: {
                //     type: 'edit',
                //     color: '#3399ff',
                //     size: 16
                //   }
                // }, '');
                // let _iconWrap = h('div', {
                //   style: {
                //     cursor: 'pointer'
                //   },
                //   attrs: {
                //     title: '编辑'
                //   },
                //   on: {
                //     click: () => {
                //       this.$router.push({name: 'roleEdit', params: { num: params.row.num }});
                //     }
                //   }
                // }, [_btnEdit], '');
                // _btns.push(_iconWrap);
                return h('div', _btns ? _btns : []);
              }
            }
          ],
          datas: [],
          loading: true
        }
      }
    },
    components: { expandRow },
    mounted() {
      this.mixinsAPI = tokenAPI;
      this.fetchDatas();
    },
    methods: {
      fetchDatas() {
        tokenAPI.fetchList(this.requestParam).then(res => {
          if (res.code === 0) {
            res.data.datas.map((obj, i) => {
              let _gmtCreateTime = obj.gmtCreateTime;
              if (_gmtCreateTime && _gmtCreateTime.indexOf(' ') != -1) {
                obj.gmtCreateTime = _gmtCreateTime.split(' ')[0];
              }
            });
            this.table.datas = res.data.datas;
            this.requestParam = res.data.queryPageParam;
            this.table.loading = false;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scope>
  .token h1 {
    font-size: 18px;
    line-height: 24px;
    padding-bottom: 8px;
    font-weight: 400;
    color: #464c5b;
    margin-top: 5px;
  }
</style>
