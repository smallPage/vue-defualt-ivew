export const mixinCrud = {
    data () {
        return {
	        requestParam: {
	          pageSize: 10,
	          total: 0
	        },
          	selected: [],
            mixinsAPI: null
        }
    },
    methods: {
		mofidyPageNum(curr = 1) {
			this.requestParam.pageNum = curr;
			this.fetchDatas();
		},
		mofidyPageSize(pageSize = 10) {
			this.requestParam.pageSize = pageSize;
			this.fetchDatas();
		},
		tableSelected(selection, row) {
			this.selected = selection;
		},
		remove() {
			let vals = [];
			if (this.selected && this.selected.length > 0) {
				let isPk = false;
				this.selected.map((item, i) => {
					if (item.pk) {
						isPk = true;
					}
					vals.push(item.num ? item.num : item.pk);
				});
				let _params = isPk ? { pks: vals.join(',') } : { nums: vals.join(',') }



				this.mixinsAPI.remove(_params).then(res => {
					if (res.code === 0) {
						this.$Message.success({
							content: '删除数据成功, 共有: ' + vals.length + '条数据.'
						})
						if (typeof(this.refresh) === "function") {
							this.refresh();
						}
					} else {
						this.$Message.error({
							content: '删除数据失败.'
						})
					}
				})


			}
		}
    }
};
