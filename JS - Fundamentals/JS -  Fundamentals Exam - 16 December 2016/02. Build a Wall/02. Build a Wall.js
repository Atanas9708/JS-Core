function buildingWall(arr) {
  arr = arr.map(Number);
  let complete = false;
  let result = [];

  while (!complete){
      let crete = 0;
      complete = true;
      for (let i = 0; i < arr.length; i++){
          if(arr[i] < 30){
              arr[i] +=1;
              crete += 195;
              complete = false;
          }
      }

      if (!complete) result.push(crete);
    }

    console.log(result.join(', '));
    console.log(result.reduce((a, b) => a + b, 0) * 1900 + ' pesos');

    
}

buildingWall(['21, 25, 28']);