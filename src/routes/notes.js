'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = require('../models/note.js');

/* GET /Notes listing. */
router.get('/', function (req, res, next) {
  
  Note.find(function (err, notes) { // Kitten.find({ name: /^fluff/ }, callback);

    if (err) return next(err);
    console.log('get: success..');
    res.json(notes);
  });
});

/* POST /Notes */
router.post('/', function (req, res, next) {

  Note.create(req.body, function (err, post) {

    console.log('crated post:' + JSON.stringify(post, null, 2));
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /Notes/id */
router.get('/:id', function (req, res, next) {

  Note.findById(req.params.id, function (err, post) {

    if (err) return next(err);
    res.json(post);
  });
});


/* PUT /Notes/:id */
router.put('/', function (req, res, next) {

  console.log('put:' + req.body._id + ', update:' + JSON.stringify(req.body.updateObject, null, 2));
  //Note.findByIdAndUpdate(req.body._id, {note:req.body.text}, function (err, post) {
  Note.findByIdAndUpdate(req.body._id, req.body.updateObject, function (err, post) {

    if (err) return next(err);

    console.log('put, no error');
    res.json(post);
  });
});

/* DELETE /Notes/:id */
router.delete('/', function (req, res, next) {
 
  console.log('findByIdAndRemove' + req.body._id); // findOneAndDelete
  Note.findByIdAndRemove(req.body._id, function (err, post) {

    console.log('delete note' + req.body._id);
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;