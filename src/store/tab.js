import Cookie from "js-cookie"


export default{
    state:{
        isCollapse:false,
        tabsList:[
            {
                path: '/',
                name: 'home',
                label: '工作台',
                icon:'home'
            }
        ],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse=!state.isCollapse
        },
        selectMenu(state,val){
            if(val.name!=='home'){//如果传入的菜单的值不是home
                state.currentMenu = val
                const result = state.tabsList.findIndex(item => item.name === val.name)//还需要判断拿到的索引存不存在
                if(result === -1){
                        state.tabsList.push(val)
                }
                }else{
                    state.currentMenu = null
            }
        },
        closeTag(state,val){
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result,1)//将我们要删除的索引值传出来
        },
        setMenu(state,val){
            state.menu=val
            Cookie.set('menu',JSON.stringify(val))//序列化
        },
        clearMenu(state){
            state.menu=[]
            Cookie.remove('menu')
        },
        //做路由的动态添加
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return//如果没有menu的数据直接return
            }
            //将cookie中的menu数据转 成我们的对象
            const menu=JSON.parse(Cookie.get('menu'))
            state.menu=menu
            
            //先对数据进行一下处理
            const menuArray=[]
            menu.forEach (item=>{
                item.component =()=>import(`../../views/${item.url}`)
                menuArray.push(item)
            });
            //动态添加路由
            menuArray.forEach(item =>{
                router.addRoute('Main',item)
            })
        }
    }
}