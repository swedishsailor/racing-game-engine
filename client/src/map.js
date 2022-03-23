import { drawCircle } from "./client.js";

// Radius of curves -> REMEMBER if you change radius dont forget to change lineWidth in client.js
const radius = 60;
// Array with all the hitbox/way drawing coords
const coords = [];
// Coords of the first element
let startingPosX = 0;
let startingPosY = radius;

export function prepareMap(ctx, pattern) {
    // Quarters positions in circle drawining -> [translatiom, startAngle, rotation]
    const quarter = [[0, Math.PI / 2, 0], [Math.PI / 2, Math.PI / 2 + Math.PI / 2, 0], [Math.PI, Math.PI / 2 + Math.PI, radius],
    [Math.PI * 3 / 2, Math.PI / 2 + Math.PI * 3 / 2, radius]]
    /* PATTERN ID LIST
    1 - south east quart                    \/   lista z obrazkami z wyjaśnionymi patternami  \/
    2 - south west quart                    
    3 - north west quart                        https://i.postimg.cc/MG1NBMzy/infografika.png
    4 - north east quart
    5 - right line
    6 - bottom line */

    //const pattern = [22,8, 31]
    // Drawing the road and correcting offsets
    for (let i = 0; i < pattern.length; i++) {
        // First Element IT DETERMINES WHERE THE WAY SHOULD START DRAWING
        if (i === 0) {
            drawCircle(startingPosX + radius*3, startingPosY + radius*3, radius, quarter[3][0], quarter[3][1])
            coords.push([startingPosX + radius*3, startingPosY + radius*3, 'ne'])
        } else {
            const thisPattern = pattern[i];
            const previousPattern = pattern[i - 1];
            const previousPatternX = coords[i - 1][0];
            const previousPatternY = coords[i - 1][1];
            // PATTERN 1 - South East
            if (thisPattern === 11) {
                if (previousPattern === 5) {
                    drawCircle(previousPatternX, previousPatternY - radius, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY - radius, 'se'])
                } else if (previousPattern === 41) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY, 'se'])
                } else if (previousPattern === 31) {
                    drawCircle(previousPatternX, previousPatternY - radius * 2, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY - radius * 2, 'se'])
                } else if (previousPattern === 6) {
                    drawCircle(previousPatternX - radius, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX - radius, previousPatternY, 'se'])
                } else {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY, 'se'])
                }
            } else if (thisPattern === 12) {
                if (previousPattern === 5) {
                    drawCircle(previousPatternX, previousPatternY - radius, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY - radius, 'seR'])
                } else if (previousPattern === 41) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY, 'seR'])
                }else if (previousPattern === 6) {
                    drawCircle(previousPatternX - radius, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX - radius, previousPatternY, 'se'])
                } else if (previousPattern === 32) {
                    drawCircle(previousPatternX - radius * 2, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX - radius * 2, previousPatternY, 'seR'])
                } else {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY, 'seR'])
                }
            }
            // PATTERN 2 -- South West
            else if (thisPattern === 21) {
                if (previousPattern === 6) {
                    drawCircle(previousPatternX + radius, previousPatternY, radius, quarter[1][0], quarter[1][1])
                    coords.push([previousPatternX + radius, previousPatternY, 'sw'])
                } else if (previousPattern === 41) {
                    drawCircle(previousPatternX + radius * 2, previousPatternY, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX + radius * 2, previousPatternY, 'sw'])
                } else if (previousPattern === 7) {
                    drawCircle(previousPatternX, previousPatternY - radius, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX, previousPatternY - radius, 'sw'])
                }else if (previousPattern === 32) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX, previousPatternY, 'sw'])
                }  else {
                    drawCircle(previousPatternX - radius, previousPatternY, radius, quarter[1][0], quarter[1][1])
                    coords.push([previousPatternX - radius, previousPatternY, 'sw'])
                }
            } else if (thisPattern === 22) {
                if (previousPattern === 6) {
                    drawCircle(previousPatternX + radius, previousPatternY, radius, quarter[1][0], quarter[1][1])
                    coords.push([previousPatternX + radius, previousPatternY, 'swR'])
                } else if (previousPattern === 41) {
                    drawCircle(previousPatternX + radius * 2, previousPatternY, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX + radius * 2, previousPatternY, 'swR'])
                } else if (previousPattern === 7) {
                    drawCircle(previousPatternX, previousPatternY - radius, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX, previousPatternY - radius, 'swR'])
                } else if (previousPattern === 42) {
                    drawCircle(previousPatternX, previousPatternY - radius * 2, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX, previousPatternY - radius * 2, 'swR'])
                } else if (previousPattern === 32) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX, previousPatternY, 'swR'])
                } else if (previousPattern === 12) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX, previousPatternY, 'swR'])
                } else {
                    drawCircle(previousPatternX - radius, previousPatternY, radius, quarter[1][0], quarter[1][1])
                    coords.push([previousPatternX - radius, previousPatternY, 'swR'])
                }
            }
            // PATTERN 3 --- North West
            else if (thisPattern === 31) {
                if (previousPattern === 11) {
                    drawCircle(previousPatternX + radius * 2, previousPatternY, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX + radius * 2, previousPatternY, 'nw'])
                } else if (previousPattern === 8) {
                    drawCircle(previousPatternX + radius, previousPatternY, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX + radius, previousPatternY, 'nw'])
                }else if (previousPattern === 22) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY, 'nw'])
                }else {
                    drawCircle(previousPatternX, previousPatternY + radius, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY + radius, 'nw'])
                }
            }
            else if (thisPattern === 32) {
                if (previousPattern === 12) {
                    drawCircle(previousPatternX, previousPatternY + radius * 2, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY + radius * 2, 'nwR'])
                } else if (previousPattern === 42) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY, 'nwR'])
                } else if (previousPattern === 22) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY, 'nwR'])
                } else {
                    drawCircle(previousPatternX, previousPatternY + radius, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY + radius, 'nwR'])
                }
            }
            // PATTERN 4 ---- North East
            else if (thisPattern === 41) {
                if (previousPattern === 5) {
                    drawCircle(previousPatternX, previousPatternY + radius, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY + radius, 'ne'])
                } else if (previousPattern === 21 || previousPattern === 22) {
                    drawCircle(previousPatternX, previousPatternY + radius * 2, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY + radius * 2, 'ne'])
                } else if (previousPattern === 31) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY, 'ne'])
                } else if (previousPattern === 11) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY, 'ne'])
                } else {
                    drawCircle(previousPatternX - radius * 3, previousPatternY + radius * 2, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX - radius * 3, previousPatternY + radius * 2, 'ne'])
                }
                // 4.2
            } else if (thisPattern === 42) {
                if (previousPattern === 5) {
                    drawCircle(previousPatternX, previousPatternY + radius, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY + radius, 'neR'])
                } else if (previousPattern === 22) {
                    drawCircle(previousPatternX - radius * 2, previousPatternY, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX - radius * 2, previousPatternY, 'neR'])
                }else if (previousPattern === 11) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY, 'neR'])
                }else if (previousPattern === 8) {
                    drawCircle(previousPatternX - radius, previousPatternY, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX - radius, previousPatternY, 'neR'])
                } else {
                    drawCircle(previousPatternX - radius * 3, previousPatternY + radius * 2, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX - radius * 3, previousPatternY + radius * 2, 'neR'])
                }
            }
            // PATTERN 5 ----- Line to right
            else if (thisPattern === 5) {
                if (previousPattern === 21) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.lineTo(previousPatternX + radius, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX + radius, previousPatternY + radius, 'lr'])
                } else if (previousPattern === 5) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX + radius, previousPatternY);
                    ctx.stroke();
                    coords.push([previousPatternX + radius, previousPatternY, 'lr'])
                } else if (previousPattern === 31) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.lineTo(previousPatternX + radius, previousPatternY - radius);
                    ctx.stroke();
                    coords.push([previousPatternX + radius, previousPatternY - radius, 'lr'])
                }
            }
            // PATTERN 6 ------- Line to bottom
            else if (thisPattern === 6) {
                if (previousPattern === 41) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX + radius, previousPatternY);
                    ctx.lineTo(previousPatternX + radius, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX + radius, previousPatternY + radius, 'bl'])
                } else if (previousPattern === 6) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX, previousPatternY + radius, 'bl'])
                } else if (previousPattern === 31 || previousPattern === 32) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX - radius, previousPatternY);
                    ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX - radius, previousPatternY + radius, 'bl'])
                }
            }
            // PATTERN 7 -------- Line to left
            else if (thisPattern === 7) {
                if (previousPattern === 7) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX - radius, previousPatternY);
                    ctx.stroke();
                    coords.push([previousPatternX - radius, previousPatternY, 'll'])
                } else if (previousPattern === 12) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX - radius, previousPatternY + radius, 'll'])
                } else if (previousPattern === 42) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.lineTo(previousPatternX - radius, previousPatternY - radius);
                    ctx.stroke();
                    coords.push([previousPatternX - radius, previousPatternY - radius, 'll'])
                }
                else {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX, previousPatternY + radius, 'll'])
                }
            }
            // PATTERN 8 -------- Line to top
            else if (thisPattern === 8) {
                if (previousPattern === 22) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX - radius, previousPatternY - radius);
                    ctx.lineTo(previousPatternX - radius, previousPatternY);
                    ctx.stroke();
                    coords.push([previousPatternX - radius, previousPatternY, 'll'])
                } else if (previousPattern === 8) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.stroke();
                    coords.push([previousPatternX, previousPatternY - radius, 'll'])
                } else if (previousPattern === 11) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX + radius, previousPatternY);
                    ctx.lineTo(previousPatternX + radius, previousPatternY - radius);
                    ctx.stroke();
                    coords.push([previousPatternX + radius, previousPatternY - radius, 'll'])
                }
            }
        }
    }
    console.log(coords)
}

function getPoint(c1, c2, radius, angle) {
    return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
}

export function calculateMapHitboxes(ctx) {
    //console.log(getPoint(coords[0][0], coords[0][1], radius, Math.PI / 2))
    // Get the element of [][] and distract from it coords and tag
    coords.forEach(element => {
        // Every element offset correction
        const tag = element[2];
        if (tag === 'ne') {
            element[0] += radius;
        } else if (tag === 'sw') {
            element[1] += radius;
        } else if (tag === 'se') {
            element[0] += radius;
        } else if (tag === 'nw') {
            element[1] -= radius;
        } else if (tag === 'nwR') {
            element[0] -= radius;
        } else if (tag === 'neR') {
            element[1] -= radius;
        } else if (tag === 'seR') {
            element[1] += radius;

        } else if (tag === 'swR') {
            element[1] -= radius / 2;
            element[0] -= radius;
        }
        // Drawing circles of Hitboxes

        
        ctx.beginPath();
        ctx.arc(element[0], element[1], 10, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        
    })
}
export const proceduralPattern = (numberOfElements) => {
    const arr = [];
    for(let i = 0; i< numberOfElements; i++){
        const previousElement = arr[i-1];
        if(i ===0){
            arr.push(41);
        }else if (i > 0){
            if(previousElement === 41){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(12)
                    break;
                    case 2: arr.push(21)
                    break;
                    case 3: arr.push(6)
                    break;
                }
            } else if(previousElement === 31){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(41)
                    break;
                    case 2: arr.push(11)
                    break;
                    case 3: arr.push(5)
                    break;
                }
            }else if(previousElement === 21){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(41)
                    break;
                    case 2: arr.push(11)
                    break;
                    case 3: arr.push(5)
                    break;
                }
            }else if(previousElement === 11){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(31)
                    break;
                    case 2: arr.push(42)
                    break;
                    case 3: arr.push(8)
                    break;
                }
            }else if(previousElement === 42){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(32)
                    break;
                    case 2: arr.push(22)
                    break;
                    case 3: arr.push(7)
                    break;
                }
            } else if(previousElement === 32){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(21)
                    break;
                    case 2: arr.push(12)
                    break;
                    case 3: arr.push(6)
                    break;
                }
            }else if(previousElement === 22){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(42)
                    break;
                    case 2: arr.push(31)
                    break;
                    case 3: arr.push(8)
                    break;
                }
            }else if(previousElement === 12){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(32)
                    break;
                    case 2: arr.push(22)
                    break;
                    case 3: arr.push(7)
                    break;
                }
            }
            else if(previousElement === 5){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(41)
                    break;
                    case 2: arr.push(11)
                    break;
                    case 3: arr.push(5)
                    break;
                }
            }else if(previousElement === 6){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(21)
                    break;
                    case 2: arr.push(12)
                    break;
                    case 3: arr.push(6)
                    break;
                }
            }
            else if(previousElement === 7){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(32)
                    break;
                    case 2: arr.push(22)
                    break;
                    case 3: arr.push(7)
                    break;
                }
            }
            else if(previousElement === 8){
                switch(Math.floor(Math.random()*3 + 1)){
                    case 1: arr.push(31)
                    break;
                    case 2: arr.push(42)
                    break;
                    case 3: arr.push(8)
                    break;
                }
            }
        }
    }
    console.log(arr)
    return arr;
}