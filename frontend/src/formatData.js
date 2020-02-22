// Adjusts the day since getDay() returns Sunday as 0
export function adjustDay(day)
{
    switch(day)
    {
        case 0:
            return 6;
            break;
        
        case 1:
            return 0;
            break;
        
        case 2:
            return 1;
            break;
        
        case 3:
            return 2;
            break;

        case 4:
            return 3;
            break;
        
        case 5:
            return 4;
            break;
        
        case 6:
            return 5;
            break;
    }
}

export function getWeeklyData(data){

    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let temp = [];
    data.forEach((item)=>{
        temp.push({x: days[adjustDay(new Date(item.Timestamp).getDay())], y: +(item.Total.toFixed(2)), Store: item.Store})
    })

    temp.sort((a,b) => days.indexOf(a.x)-days.indexOf(b.x));

    
    //Summing all the values for a particular day
    let tempSum = {};

    for (let i =0; i < temp.length; i++){
        let obj = temp[i];
     
        if (!tempSum[obj.x]){
            tempSum[obj.x] = obj;
        }
        else{
            tempSum[obj.x].y += +(obj.y.toFixed(2));
            tempSum[obj.x].Store += ", " + obj.Store; 
        }
    }

    let result = [];

    for (var prop in tempSum)
        result.push(tempSum[prop]);

    return result;
}

export function getMonthlyData(data){
    let temp = [];
    data.forEach((item)=>{
        temp.push({x:(item.Timestamp.slice(5,10)), y: +(item.Total.toFixed(2)), Store: item.Store})
    });

    temp.sort((a,b) => a.x - b.x);

      //Summing all the values for a particular day
      let tempSum = {};

      for (let i =0; i < temp.length; i++){
          let obj = temp[i];
       
          if (!tempSum[obj.x]){
              tempSum[obj.x] = obj;
          }
          else{
              tempSum[obj.x].y += +(obj.y.toFixed(2));
              tempSum[obj.x].Store += ", " + obj.Store; 
          }
      }
      let result = [];

      for (var prop in tempSum)
        result.push(tempSum[prop]);
      
    result.sort((a,b) => parseInt(a.x.slice(3)) - parseInt(b.x.slice(3)));
    
    return result;
}