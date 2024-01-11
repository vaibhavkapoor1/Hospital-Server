const express=require("express");
const app= express();

const users =[
    {
        name: "John",
        kidneys:[{
            healthy:false
        }]
    }
];
app.get("/",function(req,res){
    const johnKidneys=users[0].kidneys;
    const numberofkidneys= johnKidneys.length;
    let numberofhealthykidneys=0;
    for (let i=0;i<johnKidneys.length;i++){
        if(johnKidneys[i].healthy){
            numberofhealthykidneys=numberofhealthykidneys+1;
        }   

    }
    const numberofUnhealthykidneys=numberofkidneys-numberofhealthykidneys;
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofUnhealthykidneys
    })
    
})
//middleware shit
app.use(express.json());
app.post("/",function(req,res){
    const isHealthy=req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
    return users
})
app.put("/",function(req,res){
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})
app.delete("/",function(req,res){
    
    if (oneunhealthykidney()){
        const newKidneys=[];
        for(let i=0;i<users[0].kidneys.length;i++){
        
            if (users[0].kidneys[i].healthy)
            {
                newKidneys.push({
                    healthy: true
                })
            }
        }   
        users[0].kidneys=newKidneys;
        res.json({msg: "done"})

    }
    else{
        res.status(411).json({
            msg: "You have no bad kidneys"
        })
    }
    
   
  

})
function oneunhealthykidney(){
    let atleastoneUnhealthyKidney=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        
        if (!users[0].kidneys[i].healthy)
        {
           atleastoneUnhealthyKidney=true;
        }
        return atleastoneUnhealthyKidney
}
}


app.listen(3000);