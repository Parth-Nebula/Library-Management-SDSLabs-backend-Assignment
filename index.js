// Begin

const express = require('express');

const db = require('./database');
db.connect();

const app = express();
app.set('view engine', 'ejs');

require("dotenv").config();

db.query("create database lib ;",
        
        (error, result, fields) =>
         
        {
    
            if (error)
                
            {
                
                db.query("use lib");
                
                console.log("DB OK");
                    
            }
    
            else
                
            {
                
                db.query("use lib");
                
                db.query("create table users (username varchar(30), hashedsaltedpassword varchar(65), salt varchar(20), fine int DEFAULT 0, PRIMARY KEY (username)) ;");
                
                db.query("create table sessionmaintainer (username varchar(30) UNIQUE, hashedsaltedtemppassword varchar(65), salt varchar(20), FOREIGN KEY (username) REFERENCES users(username)) ;");
                
                db.query("create table books (title varchar(30), quantity int , quantityavailable int, PRIMARY KEY (title)) ;");
                
                db.query("create table issuerequests (title varchar(30), username varchar(30) , status tinyint DEFAULT 0 , requestdate date, replydate date, FOREIGN KEY (username) REFERENCES users(username) ) ;");
                
                db.query("create table issuerecords (title varchar(30), username varchar(30) , requestdate date, acceptdate date, issuedate date , FOREIGN KEY (username) REFERENCES users(username) ) ;");
                
                db.query("create table returnrequests (title varchar(30), username varchar(30) , returndate date,  FOREIGN KEY (username) REFERENCES users(username) ) ;");
                
                db.query("create table history (title varchar(30), username varchar(30) , requestdate date, acceptdate date, issuedate date, returndate date, FOREIGN KEY (username) REFERENCES users(username) ) ;");
                
                db.query("create table admins (username varchar(30), hashedsaltedpassword varchar(65), salt varchar(20), PRIMARY KEY (username)) ;");
                
                db.query("create table sessionmaintaineradmin (username varchar(30) UNIQUE, hashedsaltedtemppassword varchar(65), salt varchar(20), FOREIGN KEY (username) REFERENCES admins(username)) ;");
                
                db.query("create table adminrequests (username varchar(30), hashedsaltedpassword varchar(65), salt varchar(20) ) ;");
                
                console.log("DB made");
                
            }
    
        });


//Body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



//ENVs

const PORT = process.env.PORT || 5500;

app.listen(PORT, () =>
    console.log(`server started at ${PORT}`));



//Requests

const router = express.Router();

app.use('/',router);

router.get('/', (req, res) => 
    
{
    
    res.render('userLogin')
    
});


router.get('/goTouserLoginpage', (req, res) => 
    
{
    
    res.render('userLogin');
    
});



router.get('/goTouserRegisterpage', (req, res) => 
    
{
    
    res.render('userRegister');
    
});



router.get('/goToadminLoginpage', (req, res) => 
    
{
    
    res.render('adminLogin');
    
});



router.get('/goToadminRegisterpage', (req, res) => 
    
{
    
    res.render('adminRegister');
    
});



router.post('/registerAdmin', (req, res) => 
    
{
    
    for (let i = 0 ; i < req.body.username.length ; i ++)
        
    {
        
        if (req.body.username[i] == " ")
            
        {
            
            return res.render('adminspaceInusername');
            
        }
        
    }
    
    if (req.body.password.length < 8)
        
    {
    
        return res.render('adminshortPassword');
            
    }
    
    else
        
    {
    
        let crypto = require('crypto');

        let someRandomsaltNumber = Math.floor(Math.random() * 1e20);

        let someRandomsalt = someRandomsaltNumber.toString();

        const hash = crypto.createHash('sha256').update(req.body.password+someRandomsalt).digest('base64');

        db.query('select * from admins where username=' + db.escape(req.body.username) + ';' , 

            (error,result,fields) =>

            {

                if (error) 

                {

                    return res.render('adminRegistrationfailed');

                }

                else

                {

                    if (result.length)

                    {

                        return res.render('adminAlreadyexists');

                    }

                    else

                    {

                        db.query('insert into adminrequests (username, hashedsaltedpassword, salt) values (' + db.escape(req.body.username) + ', ' + db.escape(hash) + ', ' + db.escape(someRandomsalt) + ');',

                            (error, result, fields) => 

                            {

                                if (error) 

                                {

                                    return res.render('adminRegistrationfailed');

                                }

                                else 

                                {

                                    return res.render('adminRegistrationsuccessful');

                                }

                            });   

                    }

                }

            });
        
    }
        
});



router.post('/loginAdmin', (req, res) => 
    
{
    
    db.query('select * from admins where username =' + db.escape(req.body.username) + ';',
             
        (error, result, fields) => 
             
        {
        
            if (error) 
            
            {
                
                return res.redirect('adminloginFailed');
                
            }
        
            if (result.length == 0)
                
            {
                
                return res.render('notAdmin');
                
            }
        
            else 
            
            {
                
                if (result[0] == undefined)
                    
                {
                    
                    db.query("select * from adminrequests where username=" + db.escape(req.body.username) + ";",
                            
                        (error, result, fields) =>
                             
                             {
                        
                                if (error)
                                    
                                {
                                    
                                    return res.render('notAdmin');
                                    
                                }
                                
                                if (result[0] != undefined)
                                    
                                {
                                    
                                    let crypto = require('crypto');
        
                                    const hash = crypto.createHash('sha256').update(req.body.password+result[0].salt).digest('base64');

                                    if (result[0] != undefined && result[0].hashedsaltedpassword === hash) 

                                    {
                                        
                                        return res.render('notAcceptedyet');
                                        
                                    }
                                    
                                    else
                                        
                                    {
                                        
                                        return res.render('notAdmin');
                                        
                                    }
                                    
                                }
                        
                                else 
                                    
                                {
                                    
                                    return res.render('notAdmin');
                                    
                                }
                        
                    });
                    
                }
        
                let crypto = require('crypto');
        
                const hash = crypto.createHash('sha256').update(req.body.password+result[0].salt).digest('base64');
                
                if (result[0] != undefined && result[0].hashedsaltedpassword === hash) 
                
                {
                    let crypto = require('crypto');
                    
                    let someRandompasswordNumber = Math.floor(Math.random() * 1e20);
                    
                    let someRandompassword = someRandompasswordNumber.toString();
                    
                    let someRandomsaltNumber = Math.floor(Math.random() * 1e20);
    
                    let someRandomsalt = someRandomsaltNumber.toString();
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');
                    
                    db.query("delete from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";");
                    
                    db.query("insert into sessionmaintaineradmin (username, hashedsaltedtemppassword, salt) values (" + db.escape(req.body.username) + ", " + db.escape(someRandomhash) + ", " + db.escape(someRandomsalt) + ");");

                    return res.render('adminLoginsuccessful', {data: {username:req.body.username, tempPassword:someRandompassword}});
                    
                }
                
                else 
                
                {
                    
                    return res.render('adminWrongpassword');
                    
                }
                
            }
        
        });
    
});



router.post('/logoutAdmin', (req,res) =>
           
{          
    db.query("delete from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";");
    
    return res.render('adminLogoutsuccessful');       
               
});



router.post('/goToadminPortal', (req, res) => 
            
{

    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('sessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                    return res.render('adminPortal');
                    
                    }
                
                    else 
                    
                    {
                    
                    return res.render('sessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/goToadminRequestissuespage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                    db.query(" select issuerequests.* , books.quantityavailable from issuerequests left join books on issuerequests.title = books.title ;" ,
                            
                            (error, result, fields) =>
                             
                            {
                        
                                if (error)
                                    
                                {
                                    
                                    return res.render('adminsessionTimeout')
                                    
                                }
                                
                                else
                                
                                {
                                 
                                    return res.render('adminIssuesrequest', {data: result});
                                
                                }
                        
                            });
                    
                    }
                
                    else 
                    
                    {
                    
                    return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/actOnaRequest', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('sessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                        
                        if (req.body.action == 1)

                        {

                            db.query("select * from issuerequests where title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";",

                                (error,result,fields) =>

                                {   

                                    if (error) 

                                    {

                                        return res.render('sessionTimeout');

                                    }


                                    if (result.length == 0)

                                    {

                                        return res.render('sessionTimeout');  

                                    }

                                    if (result[0].status == 1)

                                    {

                                        thisshouldonlyhappeniftheuseristryingtomesswiththesite=0;
                                        
                                        db.query(" select issuerequests.* , books.quantityavailable from issuerequests left join books on issuerequests.title = books.title ;" ,
                            
                                            (error, result, fields) =>

                                            {

                                                if (error)

                                                {

                                                    return res.render('adminsessionTimeout')

                                                }

                                                return res.render('adminIssuesrequest', {data: result});

                                            });

                                    }

                                    else if (result[0].status == 2)

                                    { 

                                        db.query("update books set quantityavailable = quantityavailable - 1 where title=" + db.escape(req.body.booktitle) + ";");

                                        db.query("update issuerequests set status=1, replydate=CURDATE() where title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";");
                                        
                                        db.query(" select issuerequests.* , books.quantityavailable from issuerequests left join books on issuerequests.title = books.title ;" ,
                            
                                            (error, result, fields) =>

                                            {

                                                if (error)

                                                {

                                                    return res.render('adminsessionTimeout')

                                                }

                                                return res.render('adminIssuesrequest', {data: result});

                                            });

                                    }

                                    else if (result[0].status == 0)

                                    {

                                        db.query("update books set quantityavailable = quantityavailable - 1 where title=" + db.escape(req.body.booktitle) + ";");

                                        db.query("update issuerequests set status=1, replydate=CURDATE() where title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";"); 
                                        
                                        db.query(" select issuerequests.* , books.quantityavailable from issuerequests left join books on issuerequests.title = books.title ;" ,
                            
                                            (error, result, fields) =>

                                            {

                                                if (error)

                                                {

                                                    return res.render('adminsessionTimeout')

                                                }

                                                return res.render('adminIssuesrequest', {data: result});

                                            });

                                    }

                                });

                        }

                        if (req.body.action == 2)

                        {

                            db.query("select * from issuerequests where title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";",

                                (error,result,fields) =>

                                {   

                                    if (error) 

                                    {

                                        return res.render('sessionTimeout');

                                    }


                                    if (result.length == 0)

                                    {

                                        return res.render('adminPortal'); 

                                    }

                                    if (result[0].status == 1)

                                    {

                                        db.query("update books set quantityavailable = quantityavailable + 1 where title=" + db.escape(req.body.booktitle) + ";");

                                        db.query("update issuerequests set status=2, replydate=CURDATE() where title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";"); 
                                        
                                        db.query(" select issuerequests.* , books.quantityavailable from issuerequests left join books on issuerequests.title = books.title ;" ,
                            
                                            (error, result, fields) =>

                                            {

                                                if (error)

                                                {

                                                    return res.render('adminsessionTimeout')

                                                }

                                                return res.render('adminIssuesrequest', {data: result});

                                            });

                                    }

                                    else if (result[0].status == 2)

                                    {

                                        thisshouldonlyhappeniftheuseristryingtomesswiththesite=0;
                                        
                                        db.query(" select issuerequests.* , books.quantityavailable from issuerequests left join books on issuerequests.title = books.title ;" ,
                            
                                            (error, result, fields) =>

                                            {

                                                if (error)

                                                {

                                                    return res.render('adminsessionTimeout')

                                                }

                                                return res.render('adminIssuesrequest', {data: result});

                                            });

                                    }

                                    else if (result[0].status == 0)

                                    {

                                        db.query("update issuerequests set status=2, replydate=CURDATE() where title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";"); 
                                        
                                        db.query(" select issuerequests.* , books.quantityavailable from issuerequests left join books on issuerequests.title = books.title ;" ,
                            
                                            (error, result, fields) =>

                                            {

                                                if (error)

                                                {

                                                    return res.render('adminsessionTimeout')

                                                }

                                                return res.render('adminIssuesrequest', {data: result});

                                            });

                                    }

                                });

                        }
                    
                    }
                
                    else 
                    
                    {
                    
                    return res.render('sessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/goToadminRequestadminspage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                        db.query("select username from adminrequests;", 
                                 
                            (error,result,fields) => 
                            
                            {
                            
                                db.query("select username from admins;", 
                                 
                                    (error,resultzenpen,fields) => 

                                    {

                                        return res.render('adminAdminrequests', {data: {requests: result, admins:resultzenpen}});

                                    });

                            });
                        
                    }
                
                    else 
                    
                    {
                    
                        return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/approveAnadmin', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                        
                        if (req.body.action == 1)
                            
                        {
                        
                            db.query("insert into admins select * from adminrequests where username=" + db.escape(req.body.adminusername) + ";");
                            
                            db.query("delete from adminrequests where username=" + db.escape(req.body.adminusername) + ";");
                            
                            db.query("select username from adminrequests;", 
                                 
                                (error,result,fields) => 

                                {

                                    db.query("select username from admins;", 

                                        (error,resultzenpen,fields) => 

                                        {

                                            return res.render('adminAdminrequests', {data: {requests: result, admins:resultzenpen}});

                                        });

                                });
                        
                        }
                        
                        else if (req.body.action == 2)
                            
                        {
                                                    
                            db.query("delete from adminrequests username=" + db.escape(req.body.adminusername) + ";");
                            
                            db.query("select username from adminrequests;", 
                                 
                                (error,result,fields) => 

                                {

                                    db.query("select username from admins;", 

                                        (error,resultzenpen,fields) => 

                                        {

                                            return res.render('adminAdminrequests', {data: {requests: result, admins:resultzenpen}});

                                        });

                                });
                        
                        }
                        
                        else
                            
                        {
                                                    
                            db.query("select username from adminrequests;", 
                                 
                                (error,result,fields) => 

                                {

                                    db.query("select username from admins;", 

                                        (error,resultzenpen,fields) => 

                                        {

                                            return res.render('adminAdminrequests', {data: {requests: result, admins:resultzenpen}});

                                        });

                                });
                        
                        }
                        
                        
                    }
                
                    else 
                    
                    {
                    
                        return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/goToadminBooksgivepage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                    db.query(" select * from issuerequests where status=1;" ,
                            
                            (error, result, fields) =>
                             
                            {
                        
                                if (error)
                                    
                                {
                                    
                                    return res.render('adminsessionTimeout')
                                    
                                }
                                
                                else
                                
                                {
                                    return res.render('adminGivebooks', {data: result});
                            
                                }
                        
                            });
                    
                    }
                
                    else 
                    
                    {
                    
                    return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/giveAbook', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                        db.query("select * from issuerequests where status=1 AND title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";",

                            (error,result,fields) =>

                            {

                                if (error)
                                    
                                {
                                    
                                    return res.render('adminsessionTimeout');
                                    
                                }
                            
                                if (result.length)
                                
                                {
                                    
                                    db.query("insert into issuerecords (title, username, requestdate, acceptdate, issuedate) values (" + db.escape(req.body.booktitle) + ", " + db.escape(req.body.clientname) + ", " + db.escape(result[0].requestdate) + ", " + db.escape(result[0].replydate) + ", CURDATE() );");
                                    
                                    db.query("delete from issuerequests where status=1 AND title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";");
                                    
                                    db.query(" select * from issuerequests where status=1;" ,

                                        (error, result, fields) =>

                                        {

                                            if (error)

                                            {

                                                return res.render('adminsessionTimeout')

                                            }

                                            return res.render('adminGivebooks', {data: result});

                                        });
                                    
                                }
                            
                                else
                                    
                                {
                                    
                                 db.query(" select * from issuerequests where status=1;" ,

                                    (error, result, fields) =>

                                    {

                                        if (error)

                                        {

                                            return res.render('adminsessionTimeout')

                                        }

                                        return res.render('adminGivebooks', {data: result});

                                    });   
                                    
                                }

                            });    
                        
                    }
                
                    else 
                    
                    {
                    
                    return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/goToadminBookstakepage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                    db.query(" select * from returnrequests ;" ,
                            
                            (error, result, fields) =>
                             
                            {
                        
                                if (error)
                                    
                                {
                                    
                                    return res.render('adminsessionTimeout')
                                    
                                }
                                
                                else
                                    
                                {
                                    return res.render('adminTakebooks', {data: result});
                        
                                }
                        
                            });
                    
                    }
                
                    else 
                    
                    {
                    
                    return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/takeAbook', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                        if (req.body.action == 1)

                        {
                            
                            db.query(" select * from issuerecords cross join returnrequests where issuerecords.title = returnrequests.title AND issuerecords.username = returnrequests.username AND returnrequests.username=" + db.escape(req.body.clientname) + " AND returnrequests.title=" + db.escape(req.body.booktitle) + ";", 

                                (error,result,fields) =>

                                {
                                
                                    if (result.length)

                                    {

                                        db.query("insert into history (title, username, requestdate, acceptdate, issuedate, returndate) values (" + db.escape(result[0].title) + ", " + db.escape(result[0].username) + ", " + db.escape(result[0].requestdate) + ", " + db.escape(result[0].acceptdate) + ", " + db.escape(result[0].issuedate) + ", " + db.escape(result[0].returndate) + ");");

                                        db.query("delete from issuerecords where username=" + db.escape(result[0].username) + " AND title=" + db.escape(result[0].title) + ";");
                                        
                                        db.query("delete from returnrequests where username=" + db.escape(result[0].username) + " AND title=" + db.escape(result[0].title) + ";");

                                        db.query("update books set quantityavailable = quantityavailable + 1 where title=" + db.escape(result[0].title) + ";");

                                        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

                                        a=new Date(result[0].issuedate);

                                        b=new Date(result[0].returndate);

                                        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                                        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

                                        let d= Math.floor((utc2 - utc1) / _MS_PER_DAY);

                                        if (d > 7)

                                            {

                                                d = d - 7 ;

                                                d = d.toString();

                                                db.query("update users set fine = fine + " + d + " where username=" + db.escape(result[0].username) + ";" ,

                                                    (error,result,fields) =>  

                                                    {

                                                        db.query(" select * from returnrequests ;" ,

                                                            (error, result, fields) =>

                                                            {

                                                                if (error)

                                                                {

                                                                    return res.render('adminsessionTimeout');

                                                                }

                                                                return res.render('adminTakebooks', {data: result});

                                                            });

                                                    }); 

                                            }
                                        
                                        else 
                                            
                                        {
                                            
                                            db.query(" select * from returnrequests ;" ,

                                                (error, result, fields) =>

                                                {

                                                    if (error)

                                                    {

                                                        return res.render('adminsessionTimeout');

                                                    }

                                                    return res.render('adminTakebooks', {data: result});

                                                });

                                        }
                                        
                                    }

                                    else 

                                    {

                                        return res.render('adminsessionTimeout');

                                    }


                                });

                        }

                        else

                        {

                            db.query("delete from returnrequests where title=" + db.escape(req.body.booktitle) + " AND username=" + db.escape(req.body.clientname) + ";");
                            
                            db.query("update users set fine = fine + 100 where username=" + db.escape(req.body.clientname) + ";" ,

                                (error,result,fields) =>  

                                {

                                    db.query(" select * from returnrequests ;" ,

                                        (error, result, fields) =>

                                        {

                                            if (error)

                                            {

                                                return res.render('adminsessionTimeout');

                                            }

                                            return res.render('adminTakebooks', {data: result});

                                        });

                                }); 

                        }
                
                    }
                
                    else 
                    
                    {
                    
                    return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/goToadminBooksaddpage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                        return res.render('adminAddbooks', {data: ""});
                        
                    }
                
                    else 
                    
                    {
                    
                        return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/addBooks', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                                
                        db.query("select * from books where title = " + db.escape(req.body.booktitle) + ";",
                                
                                
                            (error,result,fields) => 
                                 
                            {
                                        
                                if (error)
                                    
                                {
                                    
                                    return res.render('adminAddbooks', {data: "Please Try Again"});
                                    
                                }
                            
                                else if (result.length)
                                    
                                {
                                    
                                    db.query("update books set quantity = quantity + " + db.escape(req.body.quantity) + " where title =" + db.escape(req.body.booktitle) + ";");
                                    
                                    db.query("update books set quantityavailable = quantityavailable + " + db.escape(req.body.quantity) + " where title =" + db.escape(req.body.booktitle) + ";");
                                    
                                    return res.render('adminAddbooks', {data: "Successfully Added"});
                                    
                                }
                            
                                else
                                    
                                {
                                    
                                    db.query("insert into books (title , quantity , quantityavailable) values ( " + db.escape(req.body.booktitle) + " , " + db.escape(req.body.quantity) + " , " + db.escape(req.body.quantity) + ");");
                                    
                                    return res.render('adminAddbooks', {data: "Successfully Added"});
                                    
                                }
                        
                            });
                    
                    }
                
                    else 
                    
                    {
                    
                        return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/goToadminBooksremovepage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                        db.query("select * from books;", 
                                 
                            (error,result,fields) => 
                            
                            {
                            
                                return res.render('adminRemovebooks', {data: result});
                            
                            });
                        
                    }
                
                    else 
                    
                    {
                    
                        return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/removeAbook', (req, res) => 
            
{
        
    db.query("select * from sessionmaintaineradmin where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('adminsessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                        db.query("select * from books where title=" + db.escape(req.body.booktitle) + ";", 
                            (error,result,fields) => 
                            
                            {
                            
                                if (result[0].quantityavailable >= req.body.quantityfilled  && result[0].quantity > req.body.quantityfilled)
                                    
                                {

                                    db.query("update books set quantity = quantity -" + db.escape(req.body.quantityfilled) + " where title = " + db.escape(req.body.booktitle) + ";");

                                    db.query("update books set quantityavailable = quantityavailable -" + db.escape(req.body.quantityfilled) + " where title = " + db.escape(req.body.booktitle) + ";");

                                    db.query("select * from books;",

                                        (error,result,fields) => 

                                        {

                                            return res.render('adminRemovebooks', {data: result});

                                        });

                                }
                            
                                else if (result[0].quantityavailable == req.body.quantityfilled  && result[0].quantity == req.body.quantityfilled)
                                    
                                {

                                    db.query("delete from books where title = " + db.escape(req.body.booktitle) + ";");

                                    db.query("select * from books;",

                                        (error,result,fields) => 

                                        {

                                            return res.render('adminRemovebooks', {data: result});

                                        });

                                }
                            
                                else
                                    
                                {
                                    
                                    db.query("select * from books;",

                                        (error,result,fields) => 

                                        {

                                            return res.render('adminRemovebooks', {data: result});

                                        });
                                    
                                }
                            
                            });
                        
                    }
                
                    else 
                    
                    {
                    
                        return res.render('adminsessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/registerUser', (req, res) => 
    
{
    
    for (let i = 0 ; i < req.body.username.length ; i ++)
        
    {
        
        if (req.body.username[i] == " ")
            
        {
            
            return res.render('spaceInusername');
            
        }
        
    }
    
    if (req.body.password.length < 8)
        
    {
    
        return res.render('shortPassword');
            
    }
    
    else
        
    {
    
        let crypto = require('crypto');

        let someRandomsaltNumber = Math.floor(Math.random() * 1e20);

        let someRandomsalt = someRandomsaltNumber.toString();

        const hash = crypto.createHash('sha256').update(req.body.password+someRandomsalt).digest('base64');

        db.query('select * from users where username=' + db.escape(req.body.username) + ';' , 

            (error,result,fields) =>

            {

                if (error) 

                {

                    return res.render('userRegistrationfailed');

                }

                else

                {

                    if (result.length)

                    {

                        return res.render('userAlreadyexists');

                    }

                    else

                    {

                        db.query('insert into users (username, hashedsaltedpassword, salt) values (' + db.escape(req.body.username) + ', ' + db.escape(hash) + ', ' + db.escape(someRandomsalt) + ');',

                            (error, result, fields) => 

                            {

                                if (error) 

                                {

                                    return res.render('userRegistrationfailed');

                                }

                                else 

                                {

                                    return res.render('userRegistrationsuccessful');

                                }

                            });   

                    }

                }

            });
        
    }
        
});



router.post('/loginUser', (req, res) => 
    
{
    
    db.query('select * from users where username =' + db.escape(req.body.username) + ';',
             
        (error, result, fields) => 
             
        {
            
            if (error) 
            
            {
                
                return res.render('loginFailed');
                
            }
        
            if (result.length == 0)
                
            {
                
                return res.render('notUser');
                
            }
        
            else 
            
            {
                
                if (result[0] == undefined)
                    
                {
                    
                    return res.render('notUser')
                    
                }
                
                
                let crypto = require('crypto');
        
                const hash = crypto.createHash('sha256').update(req.body.password+result[0].salt).digest('base64');
                
                
                if (result[0].hashedsaltedpassword === hash) 
                
                {
                    let crypto = require('crypto');
                    
                    let someRandompasswordNumber = Math.floor(Math.random() * 1e20);
                    
                    let someRandompassword = someRandompasswordNumber.toString();
                    
                    let someRandomsaltNumber = Math.floor(Math.random() * 1e20);
    
                    let someRandomsalt = someRandomsaltNumber.toString();
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');
                    
                    db.query("delete from sessionmaintainer where username=" + db.escape(req.body.username) + ";");
                    
                    db.query("insert into sessionmaintainer (username, hashedsaltedtemppassword, salt) values (" + db.escape(req.body.username) + ", " + db.escape(someRandomhash) + ", " + db.escape(someRandomsalt) + ");");

                    return res.render('userLoginsuccessful', {data: {username:req.body.username, tempPassword:someRandompassword}});
                    
                }
                
                else 
                
                {
                    
                    return res.render('wrongPassword');
                    
                }
                
            }
        
        });
    
});



router.post('/logoutUser', (req,res) =>
           
{          
    db.query("delete from sessionmaintainer where username=" + db.escape(req.body.username) + ";");
    
    return res.render('userLogoutsuccessful');       
           
});



router.post('/goTouserPortal', (req, res) => 
            
{
        
    db.query("select * from sessionmaintainer where username=" + db.escape(req.body.username) + ";" , 
            
            (error, result, fields) => 
            
            {
        
                if (error) 
                
                {

                    return res.redirect('sessionTimeout');
                
                }
        
                else 
                
                {
                    
                    let crypto = require('crypto');
                    
                    let someRandompassword = req.body.temppassword;
                    
                    let someRandomsalt = result[0].salt;
                    
                    let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                    if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 
                    
                    {
                    
                    return res.render('userPortal');
                    
                    }
                
                    else 
                    
                    {
                    
                    return res.render('sessionTimeout');
                    
                    }
                    
                }
        
            });

});



router.post('/goTouserRequestbookspage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintainer where username=" + db.escape(req.body.username) + ";" , 
            
        (error, result, fields) => 

        {

            if (error) 

            {

                return res.redirect('sessionTimeout');

            }

            else 

            {

                let crypto = require('crypto');

                let someRandompassword = req.body.temppassword;

                let someRandomsalt = result[0].salt;

                let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 

                {

                db.query("select * from books;" , 

                    (error, result, fields) => 

                    {

                        if (error) 

                        {

                            return res.redirect('sessionTimeout');

                        }

                        else 

                        {
                            
                            
                           db.query("select * from issuerequests where username=" + db.escape(req.body.username) + ";" , 

                                (error, resultzenpen, fields) => 

                                {

                                    if (error) 

                                    {
                                                                                
                                        return res.redirect('sessionTimeout');

                                    }

                                    else 

                                    {

                                        db.query("select * from issuerecords where username=" + db.escape(req.body.username) + ";" , 

                                            (error, resultsan, fields) => 

                                            {

                                                if (error) 

                                                {

                                                    return res.redirect('sessionTimeout');

                                                }

                                                else 

                                                {

                                                    return res.render('userRequestbooks', {data : {books : result, requestsmade : resultzenpen, issuedbooks:resultsan }});

                                                }

                                            });    
                                    }

                                });    
                            
                        }

                    });    

                }

                else 

                {

                return res.render('sessionTimeout');

                }

            }

        });

});



router.post('/makeArequest', (req, res) => 
            
{
        
    db.query("select * from sessionmaintainer where username=" + db.escape(req.body.username) + ";" , 
            
        (error, result, fields) => 

        {

            if (error) 

            {

                return res.redirect('sessionTimeout');

            }

            else 

            {

                let crypto = require('crypto');

                let someRandompassword = req.body.temppassword;

                let someRandomsalt = result[0].salt;

                let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 

                {
                    
                db.query("insert into issuerequests (username, title, requestdate ) values (" + db.escape(req.body.username) + ", " + db.escape(req.body.booktitle) + ", CURDATE() );");
                    
                db.query("select * from books;" , 

                    (error, result, fields) => 

                    {

                        if (error) 

                        {

                            return res.redirect('sessionTimeout');

                        }

                        else 

                        {
                            
                            
                           db.query("select * from issuerequests where username=" + db.escape(req.body.username) + ";" , 

                                (error, resultzenpen, fields) => 

                                {

                                    if (error) 

                                    {
                                                                                
                                        return res.redirect('sessionTimeout');

                                    }

                                    else 

                                    {

                                        db.query("select * from issuerecords where username=" + db.escape(req.body.username) + ";" , 

                                            (error, resultsan, fields) => 

                                            {

                                                if (error) 

                                                {

                                                    return res.redirect('sessionTimeout');

                                                }

                                                else 

                                                {

                                                    return res.render('userRequestbooks', {data : {books : result, requestsmade : resultzenpen, issuedbooks:resultsan }});

                                                }

                                            });    
                                    }

                                });    
                            
                        }

                    });    

                }

                else 

                {

                return res.render('sessionTimeout');

                }

            }

        });

});



router.post('/goTouserRequestedbookspage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintainer where username=" + db.escape(req.body.username) + ";" , 
            
        (error, result, fields) => 

        {

            if (error) 

            {

                return res.redirect('sessionTimeout');

            }

            else 

            {

                let crypto = require('crypto');

                let someRandompassword = req.body.temppassword;

                let someRandomsalt = result[0].salt;

                let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 

                {
                    
                    db.query(" select * from issuerequests where username=" + db.escape(req.body.username) + " ;" , 
                            
                        (error,result,fields) => 
                        
                        {
                            
                            if (error) 

                            {

                                return res.redirect('sessionTimeout');

                            }

                            else 

                            {

                                return res.render('userRequestedbooks', {data : result});

                            }
                            
                        });
                
                }

                else 

                {

                return res.render('sessionTimeout');

                }

            }

        });

});



router.post('/completeRequest', (req, res) => 
            
{
        
    db.query("select * from sessionmaintainer where username=" + db.escape(req.body.username) + ";" , 
            
        (error, result, fields) => 

        {

            if (error) 

            {

                return res.redirect('sessionTimeout');

            }

            else 

            {

                let crypto = require('crypto');

                let someRandompassword = req.body.temppassword;

                let someRandomsalt = result[0].salt;

                let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 

                {
                    
                    db.query(" select * from issuerequests where username=" + db.escape(req.body.username) + " AND title=" + db.escape(req.body.booktitle) + ";" , 
                            
                        (error,result,fields) => 
                        
                        {
                            
                            if (error) 

                            {

                                return res.redirect('sessionTimeout');

                            }

                            else 

                            {

                                if (result.length)
                                    
                                {

                                    if (result[0].status == 1)

                                    {
                                        
                                        db.query("update books set quantityavailable = quantityavailable + 1 where title=" + db.escape(req.body.booktitle) + ";");
                                        
                                        db.query("delete from issuerequests where username=" + db.escape(req.body.username) + " AND title=" + db.escape(req.body.booktitle) + ";");
                                        
                                        db.query(" select * from issuerequests where username=" + db.escape(req.body.username) + ";" , 

                                            (error,result,fields) => 

                                            {

                                                if (error) 

                                                {

                                                    return res.redirect('sessionTimeout');

                                                }

                                                else 

                                                {

                                                    return res.render('userRequestedbooks', {data : result});

                                                }

                                            });

                                    }
                                    
                                    else 
                                        
                                    {
                                        
                                        db.query("delete from issuerequests where username=" + db.escape(req.body.username) + " AND title=" + db.escape(req.body.booktitle) + ";");
                                        
                                        db.query(" select * from issuerequests where username=" + db.escape(req.body.username) + ";" , 

                                            (error,result,fields) => 

                                            {

                                                if (error) 

                                                {

                                                    return res.redirect('sessionTimeout');

                                                }

                                                else 

                                                {

                                                    return res.render('userRequestedbooks', {data : result});

                                                }

                                            });
                                        
                                    }

                                }

                            }
                            
                        });
                    
                }

                else 

                {

                return res.render('sessionTimeout');

                }

            }

        });

});



router.post('/goTouserReturnbookspage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintainer where username=" + db.escape(req.body.username) + ";" , 
            
        (error, result, fields) => 

        {

            if (error) 

            {

                return res.redirect('sessionTimeout');

            }

            else 

            {

                let crypto = require('crypto');

                let someRandompassword = req.body.temppassword;

                let someRandomsalt = result[0].salt;

                let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 

                {

                db.query("select issuerecords.*, returnrequests.returndate from issuerecords LEFT JOIN returnrequests ON issuerecords.title = returnrequests.title where issuerecords.username=" + db.escape(req.body.username) + ";" , 

                    (error, result, fields) => 

                    {

                        if (error) 

                        {

                            return res.redirect('sessionTimeout');

                        }

                        else 

                        {

                            return res.render('userReturnbooks', {data : result});
                            
                        }

                    });    

                }

                else 

                {

                return res.render('sessionTimeout');

                }

            }

        });

});



router.post('/makeAreturn', (req, res) => 
            
{
        
    db.query("select * from sessionmaintainer where username=" + db.escape(req.body.username) + ";" , 
            
        (error, result, fields) => 

        {

            if (error) 

            {

                return res.redirect('sessionTimeout');

            }

            else 

            {

                let crypto = require('crypto');

                let someRandompassword = req.body.temppassword;

                let someRandomsalt = result[0].salt;

                let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 

                {
                
                db.query("insert into returnrequests ( username , title , returndate ) values (" + db.escape(req.body.username) + ", " + db.escape(req.body.title) + ", CURDATE() ) ;" );

                db.query("select issuerecords.*, returnrequests.returndate from issuerecords LEFT JOIN returnrequests ON issuerecords.title = returnrequests.title where issuerecords.username=" + db.escape(req.body.username) + ";" , 

                    (error, result, fields) => 

                    {

                        if (error) 

                        {

                            return res.redirect('sessionTimeout');

                        }

                        else 

                        {

                            return res.render('userReturnbooks', {data : result});
                            
                        }

                    });    


                }

                else 

                {

                return res.render('sessionTimeout');

                }

            }

        });

});



router.post('/goTouserHistorypage', (req, res) => 
            
{
        
    db.query("select * from sessionmaintainer where username=" + db.escape(req.body.username) + ";" , 
            
        (error, result, fields) => 

        {

            if (error) 

            {
                
                return res.redirect('sessionTimeout');

            }

            else 

            {

                let crypto = require('crypto');

                let someRandompassword = req.body.temppassword;

                let someRandomsalt = result[0].salt;

                let someRandomhash = crypto.createHash('sha256').update(someRandompassword+someRandomsalt).digest('base64');

                if (result[0].hashedsaltedtemppassword != undefined && result[0].hashedsaltedtemppassword === someRandomhash) 

                {
                    
                    db.query(" select * from users where username=" + db.escape(req.body.username) + " ;" , 
                            
                        (error,result,fields) => 
                        
                        {
                            
                            if (error) 

                            {

                                return res.redirect('sessionTimeout');

                            }

                            else 

                            {

                                db.query("select * from history where username=" + db.escape(req.body.username) + " ;" , 
                                        
                                        (error,resultzenpen,fields) =>
                                         
                                         {
                                    
                                            if (error) 

                                            {
                                                
                                                return res.redirect('sessionTimeout');

                                            }

                                            else 

                                            {
                                             
                                                return res.render('userHistory', {data : {userinfo : result, booksissued : resultzenpen}} );
                                                
                                            }
                                            
                                    
                                        });

                            }
                            
                        });
                
                }

                else 

                {

                return res.render('sessionTimeout');

                }

            }

        });

});



router.get('/*', (req, res) => 
            
{
    
    return res.render('404');
    
});



router.post('/*', (req, res) => 
            
{
    
    return res.render('404');
    
});
