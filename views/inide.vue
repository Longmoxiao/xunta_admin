<template>
    <div>
        <div style="margin-bottom: 12px;">
            <el-button @click="goBack" type="text" icon="el-icon-arrow-left" class="back-button">邀请设置详情
            </el-button>
        </div>
        <div style="height:167px;padding-top:40px">
            <el-table :data="highAppearance" border height="90%" style="margin-left:120px;font-size:18px;width:981px"
                :cell-style="tableCellStyle" :header-cell-style="tableHeaderColor" :row-style="{ height: '0' }">
                <el-table-column width="180" prop="id" label=""></el-table-column>
                <el-table-column width="200" prop="type1" label="ID"></el-table-column>
                <el-table-column width="200" prop="type2" label="性别"></el-table-column>
                <el-table-column width="200" prop="type3" label="昵称"></el-table-column>
                <el-table-column width="200" prop="type4" label="注册手机号码"></el-table-column>
            </el-table>
        </div>
        <div style="margin-left:120px;margin-top:10px">
            <label style="font-size:20px">邀请码：7MJ68T</label>
        </div>
        <div style="margin-top:20px">
            <el-table :data="highAppearance1" border height="90%" style="margin-left:120px;font-size:18px;width:981px"
                :cell-style="tableCellStyle" :header-cell-style="tableHeaderColor" :row-style="{ height: '0' }">
                <el-table-column width="580" prop="id" label="用户获得奖励的要求"></el-table-column>
                <el-table-column width="200" prop="type1" label="获得T币数"></el-table-column>
                <el-table-column width="200" prop="type2" label="达到邀请要求时间"></el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script>
export default {
    name: 'inide',
    data() {
        return {
            userId: '',
            highAppearance: [
                { id: '邀请人', type1: '123', type2: '男', type3: '11a', type4: '12345678', },
                { id: '被邀请人', type1: '123', type2: '男', type3: '11a', type4: '12345678', },
            ],
            highAppearance1: [
                { id: '被邀请人男士，首次充值购买T币', type1: '200', type2: '2024-06-06 14:16',  },
                { id: '被邀请男士在注册12小时内，浏览她人主页达10个', type1: '100', type2: '2024-06-06 14:16', },
            ],
        }
    },
    methods: {
        /** 鼠标移入cell */
        handleCellEnter(row, column, cell, event) {
            const property = column.property
            if (this.editProp.includes(property)) {
                cell.querySelector('.item__input').style.display = 'block'
                cell.querySelector('.item__txt').style.display = 'none'
            }
        },
        /** 鼠标移出cell */
        handleCellLeave(row, column, cell, event) {
            const property = column.property
            if (this.editProp.includes(property)) {
                cell.querySelector('.item__input').style.display = 'none'
                cell.querySelector('.item__txt').style.display = 'block'
            }
        },
        // 改变某一列单元格背景颜色
        tableCellStyle({ row, column, rowIndex, columnIndex }) {
            if (columnIndex == 0) {
                return 'background:#DCDCDC !important;'
            }
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0 && columnIndex === 0) {
                return 'background-color: #DCDCDC;';
            }  else if(rowIndex === 0 ){
                return 'background-color: #DCDCDC;';
            }
        },
        goBack() {
            this.$router.push({ name: 'trainQuery' });
        },
    },
    computed: {
        currentTableData() {
            return this.tableData[this.activeTab];
        },
    },
    mounted() {
        this.userId = this.$route.params.userId;
        this.highAppearance[0].type1 = this.userId;
    },
}
</script>

<style scoped>
.back-button {
    color: black;
    /* Text color */
    font-weight: bold;
    /* Make text bold */
    font-size: 30px;
    /* Adjust font size as needed */
}

::v-deep .item__input .el-input__inner {
    border: none !important;
    box-shadow: none !important;
    padding: 0px;
}

::v-deep .el-table .cell {
    display: inline-flex;
    align-items: center;
    height: 22px;
    width: 100%;
}
</style>