module.exports = function(app, urlencoded){

  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'estore'
  });

connection.connect();

app.get('/laptops',function(req,res){
  console.log('User Viewing Laptops');
  var arr =[]
  var b={};

  qs = req.query;

  var brand = [];
  var x = qs.sort;
  if(qs.brand == 'All')
  {
    brand.push('HP');
    brand.push('Acer');
    brand.push('Dell');
    brand.push('Asus');
  }
  else {
    if(qs.brand.constructor == Array )
    {
      for(var i=0;i<qs.brand.length;i++) {
        brand.push(qs.brand[i]);
      }
    }
    else {
      brand.push(qs.brand);
    }
  }

  var sql = "SELECT * from laptops WHERE brand = ? AND price <= ? AND price >= ? AND discount >= ? ";

  for (var i = 0; i < brand.length; i++)
  {
    connection.query(sql, [brand[i],qs.priceto, qs.pricefrom, qs.discount], function(err,result,fields){
      for (var j = 0; j < result.length; j++)
      {
        b = result[j];
        arr.push(b);
      }
    });
  }

  setTimeout(()=> {res.render('laptops',{filters: arr, qs: qs});},2000);
});

app.get('/tvs',function(req,res){
  console.log('User Viewing Laptops');
  var arr =[]
  var b={};

  qs = req.query;

  var brand = [];
  var x = qs.sort;
  if(qs.brand == 'All')
  {
    brand.push('HP');
    brand.push('Acer');
    brand.push('Dell');
    brand.push('Asus');
  }
  else {
    if(qs.brand.constructor == Array )
    {
      for(var i=0;i<qs.brand.length;i++) {
        brand.push(qs.brand[i]);
      }
    }
    else {
      brand.push(qs.brand);
    }
  }

  var sql = "SELECT * from tvs WHERE brand = ? AND price <= ? AND price >= ? AND discount >= ? ";

  for (var i = 0; i < brand.length; i++)
  {
    connection.query(sql, [brand[i],qs.priceto, qs.pricefrom, qs.discount], function(err,result,fields){
      for (var j = 0; j < result.length; j++)
      {
        b = result[j];
        arr.push(b);
      }
    });
  }

  setTimeout(()=> {res.render('tvs',{filters: arr, qs: qs});},2000);
});

app.get('/mobiles',function(req,res){

  console.log('User Viewing Mobiles');
  var arr =[]
  var b={};
  qs = req.query;

  var brand = [];
  if(qs.brand == 'All')
  {
    brand.push('Samsung');
    brand.push('Apple');
    brand.push('OnePlus');
    brand.push('Mi');
    brand.push('Moto');
  }
  else {
    if(qs.brand.constructor == Array )
    {
      for(var i=0;i<qs.brand.length;i++) {
        brand.push(qs.brand[i]);
      }
    }
    else {
      brand.push(qs.brand);
    }
  }

  var sql = "SELECT * from mobiles WHERE brand = ? AND price <= ? AND price >= ? AND discount >= ? ";
  for (var i = 0; i < brand.length; i++)
  {
    connection.query(sql, [brand[i], qs.priceto, qs.pricefrom, qs.discount], function(err,result,fields){
      for (var j = 0; j < result.length; j++)
      {
        b = result[j];
        arr.push(b);
      }
      //res.render('laptops');
    });
  }
  setTimeout(()=> {res.render('mobiles',{filters: arr,qs: qs});},2000);
});


app.get("/laptops/:id",function(req,res){

    console.log('User Viewing Specific Laptop : ' + req.params.id);
    var sql = "SELECT * FROM laptops WHERE id= ? ";
    connection.query(sql, [req.params.id], function (err, result,fields){
    if (err) {
        console.log(err);
    }
    else{
       res.render('individual_laptops',{laptop: result});
    }
    });
});

app.get("/mobiles/:id",function(req,res){

    console.log('User Viewing Specific Mobile : ' + req.params.id);
    var sql = "SELECT * FROM mobiles WHERE id= ? ";
    connection.query(sql, [req.params.id], function (err, result,fields){
    if (err) {
        console.log(err);
    }
    else{
       res.render('individual_mobiles',{mobile: result});
    }
    });
});

};
