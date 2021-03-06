var express = require('express');
var router = express.Router();
let {
	checkUser, generateToken, createUser, changepassword,
	getUserInfo, getProjectList, createNewProject, getChartsInfo,
	updateChart, getChartInfo, updateImg
} = require('../database');
let { getBody } = require('../util');

/* GET users listing. */
router.get('/', function () {
	res.sendFile('./public/morecharts/index.html')
});

router.post('/api/login',function (req, res, next) {
	checkUser(getBody(req),function (msg) {
		if(msg.status === 1){
			generateToken(getBody(req),function(token) {
				msg.token = token;
				res.send(msg)
			});
		}else{
			res.send(msg)
		}
	});
});

router.post('/api/changepassword',function (req, res, next) {
	changepassword(req, res, next)
});

router.post('/api/getUserInfo',function (req, res, next) {
	getUserInfo(req,res,next)
});

router.post('/api/register', function(req, res, next) {
	createUser(getBody(req),function (msg) {
		if(msg.status === 1){
			generateToken(getBody(req),function(token) {
				msg.token = token;
				res.send(msg)
			});
		}else{
			res.send(msg)
		}
	})
});

router.post('/api/isLogin', function(req, res, next) {
	res.send()
});

router.post('/api/getProjectList',function(req,res,next) {
	getProjectList(req,res,next);
});

router.post('/api/createNewProject', function(req, res,next) {
	createNewProject(req,res,next);
});

router.post('/api/getChartsInfo', function(req, res, next) {
	getChartsInfo(req, res, next);
});

router.post('/api/getChartInfo', function(req, res, next) {
	getChartInfo(req, res, next);
});

router.post('/api/updateChart', function(req, res, next) {
	updateChart(req,res,next)
});

router.post('/api/updateImg',function (req, res, next) {
	updateImg(req, res, next);
});

module.exports = router;
