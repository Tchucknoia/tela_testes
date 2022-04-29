const { stringify } = require("jade/lib/utils");

let aArray = [];
let data2 = {};

for(let i=0;i<20;i++){
    aArray[i] = i+1;
}

for(let i=0;i<aArray.length;i++){
    data2[`cParam${i+1}`] = aArray[i];
}

let data = { 
    cParam1  : aArray[0]     //00
    ,cParam2 : aArray[1]     //01
    ,cParam3 : aArray[2]     //02
    ,cParam4 : aArray[3]     //03
    ,cParam5 : aArray[4]     //04
    ,cParam6 : aArray[5]     //05
    ,cParam7 : aArray[6]     //06
    ,cParam8 : aArray[7]     //07
    ,cParam9 : aArray[8]     //08
    ,cParam10: aArray[9]     //09
    ,cParam11: aArray[10]    //10
    ,cParam12: aArray[11]    //11
    ,cParam13: aArray[12]    //12
    ,cParam14: aArray[13]    //13
    ,cParam15: aArray[14]    //14
    ,cParam16: aArray[15]    //15
    ,cParam17: aArray[16]    //16
    ,cParam18: aArray[17]    //17
    ,cParam19: aArray[18]    //18
    ,cParam20: aArray[19]    //19
}

console.log(`data:${JSON.stringify(data)}\ndata2:${JSON.stringify(data2)}`);