let express =require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a refrence to the model
let Business = require('../models/Business');

module.exports.displayBusinessList =(req,res,next) =>{
    Business.find({},(err,businessList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(businessList);

            // sort the businessList alphabetically by name
            businessList.sort((a, b) => (a.name > b.name) ? 1 : -1);

            res.render('Business/list',
            {title:"Business",
            businessList: businessList,
            displayName: req.user ? req.user.displayName: ''
         });
        }
    });
};

module.exports.displayAddPage = (req, res, next) =>{
    res.render('Business/add', {title:"Add Business",
    displayName: req.user ? req.user.displayName: ''});

};

module.exports.processAddPage = (req, res, next) =>{
    let newBusiness= Business({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    });

    Business.create(newBusiness, (err, User) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the  business-list
            res.redirect('/business')
        }
    });
};

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business.findById(id, (err, businesstoedit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // show the edit view
            res.render('Business/edit', { title: 'Edit Business', business: businesstoedit,
            displayName: req.user ? req.user.displayName: '' });
        }
    });
};

module.exports.processEditPage = (req, res, next) =>{
    let id = req.params.id;

    let updateBusiness = Business({
        "_id":id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    });

    Business.updateOne({_id: id}, updateBusiness, (err) =>{
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
              //refresh the business
              res.redirect('/business');
        }
    });
};

module.exports.performDeletePage = (req, res, next) =>{
    let id = req.params.id;

    Business.remove({_id: id}, (err) =>{
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
              //refresh the business-list
              res.redirect('/business');
        }
    });

};