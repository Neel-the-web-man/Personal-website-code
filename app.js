const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");


const app=express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

mongoose.connect("mongodb://localhost:27017/personalWebsite",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const contactSchema={
    name:String,
    email:String,
    message:String
};

const ContactInfo=mongoose.model("ContactInfo",contactSchema);

// let c1=new ContactInfo({
//     name:"neel",
//     email:"nk@nk.com",
//     message:"nk"
// });
// c1.save();
const resubmitSchema={
    name:String,
    email:String,
    message:String
};
const ResubmitInfo=mongoose.model("ResubmitInfo",resubmitSchema);

app.get("/",function(req,res){
    res.render("index");
});
app.get("/projects",function(req,res){
    res.render("projects");
});
app.get("/skills",function(req,res){
    res.render("skills");
});
app.get("/about",function(req,res){
    res.render("about");
});
app.get("/contact",function(req,res){
    res.render("contact");
});
app.post("/contact",function(req,res){
    res.render("submitOne");
    let contactFormDetail= new ContactInfo({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    });
    contactFormDetail.save();
    ContactInfo.find(function(err,contactInfo){
        if(!err){
            console.log(contactInfo.name);
            console.log(contactInfo.email);
            console.log(contactInfo.message);
            console.log(contactInfo);
        }else{
            console.log(err);
        }
    });
});
app.get("/resubmit",function(req,res){
    res.render("resubmit");
});
app.post("/resubmit",function(req,res){
    res.render("submitted");
    let resubmitFormDetail= new ResubmitInfo({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    });
    resubmitFormDetail.save();
    ResubmitInfo.find(function(err,contactInfo){
        if(!err){
            console.log(contactInfo.name);
            console.log(contactInfo.email);
            console.log(contactInfo.message);
            console.log(contactInfo);
        }else{
            console.log(err);
        }
    });
});

app.get("/submitted",function(req,res){
    res.render("submittedGet");
})
app.post("/submitted",function(req,res){
    res.render("submitted");
})
app.listen(3000,()=>{
  console.log(`Server running at port 3000`);
});