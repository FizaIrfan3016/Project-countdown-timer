#! /usr/bin/env node

// Import all the packages I use in this project
import inquirer from "inquirer";
import chalk from "chalk";
import chalkanimation from "chalk-animation"

// npm i date-fns 
// command to instal date-fns for program.
import {differenceInSeconds} from "date-fns";

const sleep = () => {
    return new Promise((res) => {
        setTimeout (res,3000)
    });
}

// Making a neontitle for program
async function start() {
    let neonTitle = chalkanimation.rainbow("\n *Countdown Timer* \n");
    await sleep()
    neonTitle.stop()
}
// calling the function
await start()

const response=await inquirer.prompt([
    {
        name:"userInput",
        type:"number",
        message:"Please enter the amount of seconds!",
        validate:(input) => {
            if(isNaN(input)){
                console.log (chalkanimation.neon( 'Please Enter valid number'))
            } else if (input > 60){
                console.log(chalkanimation.neon('Seconds must be in 60.'));
                 
            } else {
                return true;
            }
        },
    }
])

let input = response.userInput

function startTime(value:number){

    const initialTime = new Date().setSeconds(new Date().getSeconds() + value)
    const intervalTime = new Date(initialTime)
    setInterval((()=>{
      const currentTime = new Date()
      const timeDifference = differenceInSeconds(intervalTime,currentTime);

      if(timeDifference <= 0){
        console.log(chalk.redBright('Timer has expired!'));
        process.exit()
      } 

      let minutes = Math.floor(timeDifference % ( 3600 * 24) / 3600)
      let seconds = Math.floor(timeDifference % 60)
      console.log(chalk.cyan(`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`));
      
    }),1000)
}
startTime(input)