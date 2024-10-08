export default{
    getMenu: config =>{
        const{username,password}=JSON.parse(config.body)
        //先判断用户是否存在
        //判断账户和密码是否对应
        if(username === 'admin' && password === 'admin'){
            return{
                code:20000,
                data:{
                    menu:[
                        {
                            path:'/home',
                            name:'home',
                            label:'系统首页',
                            icon:'s-home',
                            url:'home.vue'
                          },
                          {
                            path:'/systemUser',
                            name:'systemUser',
                            label:'系统用户管理',
                            icon:'user',
                            url:'systemUser.vue'
                          },
                          {
                            path:'/trainStation',
                            name:'trainStation',
                            label:'火车站点管理',
                            icon:'s-claim',
                            url:'trainStation.vue'
                          },
                          {
                            path:'/trainNumManage',
                            name:'trainNumManage',
                            label:'火车车次管理',
                            icon:'s-shop',
                            url:'trainNumManage.vue'
                          },
                          {
                            path:'/trainSchedule',
                            name:'trainSchedule',
                            label:'列车行程安排',
                            icon:'date',
                            url:'trainSchedule.vue'
                          },
                          {
                            path:'/userMessage',
                            name:'userMessage',
                            label:'乘客信息管理',
                            icon:'postcard',
                            url:'userMessage.vue'
                          }
                    ],
                    token:'1',
                    message: '获取成功'
                }
            }
        }else if(username === 'xiaoxiao' && password === '123456'){
            return{
                code:20000,
            data:{
                menu:[
                    {
                        path:'/trainQuery',
                        name:'trainQuery',
                        label:'火车车次查询',
                        icon:'set-up',
                        url:'trainQuery.vue'
                      },
                      {
                        path:'/ticketSell',
                        name:'ticketSell',
                        label:'售票记录查询',
                        icon:'tickets',
                        url:'ticketSell.vue'
                      },
                      {
                        path:'/refund',
                        name:'refund',
                        label:'退票记录查询',
                        icon:'delete',
                        url:'refund.vue'
                      },
                      {
                        path:'/modifyTicket',
                        name:'modifyTicket',
                        label:'改签记录查询',
                        icon:'refresh-left',
                        url:'modifyTicket.vue'
                      }    
                ],
                token:'2',
                message:'获取成功'
            }
            }
        }else{
            return{
                code: -900,
                data:{
                    message:'密码错误'
                }
            }
        }
    }
}