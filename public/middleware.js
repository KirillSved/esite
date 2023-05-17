import moment from "moment";
import colors from "colors";
export function requestTime(req,res,next){
req.requestTime=moment(new Date()).format('HH:mm:ss')
next();
}

export function logger(req,res,next){
console.log(colors.green(`requestTime : ${req.requestTime}|` + 
             colors.blue(`method :${req.method}`)  + colors.cyan(`path: ${req.path} &&  url: ${req.url}` )));
next();
}