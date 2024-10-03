import Cookie from "js-cookie"

export default{
    state:{
        token:''
    },
    mutations:{
        setToken(state,val){
            state.token = val
            Cookie.set('token',val)//在cookie存入数据
        },
        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state){
            state.token=state.token || Cookie.get('token')//如果没有token就在state.token中获取
        }
    }
}