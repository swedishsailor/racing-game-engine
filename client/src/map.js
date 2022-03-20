import { drawCircle } from "./client.js";

const radius = 60;
const coords = [];

export function prepareMap(ctx) {
    // Quarters positions in circle drawining -> [translatiom, startAngle, rotation]
    const quarter = [[0, Math.PI / 2, 0], [Math.PI / 2, Math.PI / 2 + Math.PI / 2, 0], [Math.PI, Math.PI / 2 + Math.PI, radius],
    [Math.PI * 3 / 2, Math.PI / 2 + Math.PI * 3 / 2, radius]]
    /* PATTERN ID LIST
    1 - south east quart                    \/      lista z obrazkami z wyjaśnionymi patternami     \/
    2 - south west quart                    
    3 - north west quart                   https://i.postimg.cc/MG1NBMzy/infografika.png
    4 - north east quart
    5 - right line
    6 - bottom line */
    const pattern = [41, 21, 5, 41, 21, 5, 5, 5, 5, 5, 11, 31, 5, 5, 5, 5, 5, 5, 5, 5, 41, 6, 6, 6, 21, 41, 12, 7, 7, 7, 7, 7, 22, 42, 7, 7, 7, 7, 32, 6, 6, 6, 21, 41, 6]
    //const pattern = [5,5,5,5,41,21,41, 12]

    for (let i = 0; i < pattern.length; i++) {
        // First Element

        if (i === 0) {
            drawCircle(radius * i, 50, radius, quarter[3][0], quarter[3][1])
            coords.push([radius * i, 50, 'ne'])
        } else {
            const thisPattern = pattern[i];
            const previousPattern = pattern[i - 1];
            const previousPatternX = coords[i - 1][0];
            const previousPatternY = coords[i - 1][1];
            // PATTERN 1 -
            if (thisPattern === 11) {
                if (previousPattern === 5) {
                    drawCircle(previousPatternX, previousPatternY - radius, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY - radius, 'se'])
                } else if (previousPattern === 41) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY, 'se'])
                } else {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY, 'se'])
                }
            }else if (thisPattern === 12) {
                if (previousPattern === 5) {
                    drawCircle(previousPatternX, previousPatternY - radius, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY - radius, 'seR'])
                } else if (previousPattern === 41) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY, 'seR'])
                } else {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[0][0], quarter[0][1])
                    coords.push([previousPatternX, previousPatternY, 'seR'])
                }
            }
            // PATTERN 2 --
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
                } else {
                    drawCircle(previousPatternX - radius, previousPatternY, radius, quarter[1][0], quarter[1][1])
                    coords.push([previousPatternX - radius, previousPatternY, 'sw'])
                }

            }else if (thisPattern === 22) {
                if (previousPattern === 6) {
                    drawCircle(previousPatternX + radius, previousPatternY, radius, quarter[1][0], quarter[1][1])
                    coords.push([previousPatternX + radius, previousPatternY, 'swR'])
                } else if (previousPattern === 41) {
                    drawCircle(previousPatternX + radius * 2, previousPatternY, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX + radius * 2, previousPatternY, 'swR'])
                } else if (previousPattern === 7) {
                    drawCircle(previousPatternX, previousPatternY - radius, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX, previousPatternY - radius, 'swR'])
                } else {
                    drawCircle(previousPatternX - radius, previousPatternY, radius, quarter[1][0], quarter[1][1])
                    coords.push([previousPatternX - radius, previousPatternY, 'swR'])
                }

            }
            // PATTERN 3 ---
            else if (thisPattern === 31) {
                if (previousPattern === 11 || previousPattern === 12) {
                    drawCircle(previousPatternX + radius * 2, previousPatternY, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX + radius * 2, previousPatternY, 'nw'])
                } else {
                    drawCircle(previousPatternX, previousPatternY + radius, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY + radius, 'nw'])
                }
            }
            else if (thisPattern === 32) {
                if (previousPattern === 11|| previousPattern === 12) {
                    drawCircle(previousPatternX + radius * 2, previousPatternY, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX + radius * 2, previousPatternY, 'nwR'])
                } else {
                    drawCircle(previousPatternX, previousPatternY + radius, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY + radius, 'nwR'])
                }
            }
            // PATTERN 4 ----
            else if (thisPattern === 41) {
                if (previousPattern === 5) {
                    drawCircle(previousPatternX, previousPatternY + radius, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY + radius, 'ne'])
                } else if (previousPattern === 21  || previousPattern === 22) {
                    drawCircle(previousPatternX, previousPatternY + radius * 2, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY + radius * 2, 'ne'])
                } else {
                    drawCircle(previousPatternX - radius * 3, previousPatternY + radius * 2, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX - radius * 3, previousPatternY + radius * 2, 'ne'])
                }
                // 4.2
            } else if (thisPattern === 42) {
                if (previousPattern === 5) {
                    drawCircle(previousPatternX, previousPatternY + radius, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY + radius, 'neR'])
                } else if (previousPattern === 21  || previousPattern === 22) {
                    drawCircle(previousPatternX - radius * 2, previousPatternY, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX - radius * 2, previousPatternY, 'neR'])
                } else {
                    drawCircle(previousPatternX - radius * 3, previousPatternY + radius * 2, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX - radius * 3, previousPatternY + radius * 2, 'neR'])
                }
            }
            // PATTERN 5 -----
            else if (thisPattern === 5) {
                if (previousPattern === 21 || previousPattern === 22) {
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
                } else if (previousPattern === 31 || previousPattern === 32) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.lineTo(previousPatternX + radius, previousPatternY - radius);
                    ctx.stroke();
                    coords.push([previousPatternX + radius, previousPatternY - radius, 'lr'])
                }
            }
            // PATTERN 6 -------
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
            // PATTERN 7 --------
            else if (thisPattern === 7) {
                if (previousPattern === 41) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX + radius, previousPatternY);
                    ctx.lineTo(previousPatternX + radius, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX + radius, previousPatternY + radius, 'bl'])
                } else if (previousPattern === 7) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX - radius, previousPatternY);
                    ctx.stroke();
                    coords.push([previousPatternX - radius, previousPatternY, 'bl'])
                } else if (previousPattern === 11|| previousPattern === 12) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX - radius, previousPatternY + radius, 'bl'])
                } else if (previousPattern === 42) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.lineTo(previousPatternX - radius, previousPatternY - radius);
                    ctx.stroke();
                    coords.push([previousPatternX - radius, previousPatternY - radius, 'bl'])
                }
                else {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.stroke();
                    coords.push([previousPatternX, previousPatternY + radius, 'bl'])
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

    //coords.forEach
    console.log(getPoint(coords[0][0], coords[0][1], radius, Math.PI / 2))
    // Get the element of [][] and distract from it coords and tag
    coords.forEach(element => {
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
        } else if (tag === 'seR'){
            element[1] += radius;
            
        } else if (tag === 'swR'){
            element[1] -= radius/2;
            element[0] -= radius;
        }
        /*switch (tag) {
            case 'sw': {
                element[0] += radius;
                break;
            }
            case 'ne': {
                element[0] += radius;
                break;
            }
            case 'se': {
                element[0] += radius;
                break;
            }
            case 'nwR': {
                element[0] -= radius;
                break;
            } case 'neR': {
                element[1] += radius;
                break;
            } case 'nw': {
                element[1] -= radius;
                break;
            }
        }*/
        ctx.beginPath();

        ctx.arc(element[0], element[1], 10, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    })
}