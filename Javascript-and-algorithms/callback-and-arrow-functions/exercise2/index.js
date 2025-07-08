const returnTime = function (time) {
  console.log('The current time is: ' + time)
}

const getTime = function(callback){
    callback(new Date());
}

getTime(returnTime)
