import { drawCircle } from "./client.js";

// Radius of curves -> REMEMBER if you change radius dont forget to change lineWidth in client.js
const radius = 90;
// Array with all the hitbox/way drawing coords
const coords = [];
let element42Counter = 0;
let element7Counter = 0;
let element31Counter = 0;
let element8Counter = 0;
let element5Counter = 0;
let element6Counter = 0;
let element11Counter = 0;
let element12Counter = 0;
let element22Counter = 0;
let element21Counter = 0;
let element32Counter = 0;

let quart1Coords = [8]; // Define the first pattern element to be 8 to make map BIGGER but not TOO BUGGED (map shouldn't be big enough to go out of canvas)
let quart2Coords = []; // The rest are the Pattern Arrays for each QUART functions
let quart3Coords = [];
let quart4Coords = [];
let POS_COORDS = [];
let posCoordsLength; // This variables is used to define the length of POS_CORDS at the start of each pattern creating function

function createPositionOfPatternElement(ctx, coords, thisPattern, previousPattern, previousPatternX, previousPatternY) {
    // PATTERN 1 - South East
    if (thisPattern === 11) {
        if (previousPattern === 5) {
            coords.push([previousPatternX, previousPatternY - radius, 'se'])
        } else if (previousPattern === 41) {
            coords.push([previousPatternX, previousPatternY, 'se'])
        } else if (previousPattern === 31) {
            coords.push([previousPatternX, previousPatternY - radius * 2, 'se'])
        } else if (previousPattern === 6) {
            coords.push([previousPatternX - radius, previousPatternY, 'se'])
        } else {
            coords.push([previousPatternX, previousPatternY, 'se'])
        }
    } else if (thisPattern === 12) {
        if (previousPattern === 5) {
            coords.push([previousPatternX, previousPatternY - radius, 'seR'])
        } else if (previousPattern === 41) {
            coords.push([previousPatternX, previousPatternY, 'seR'])
        } else if (previousPattern === 6) {
            coords.push([previousPatternX - radius, previousPatternY, 'se'])
        } else if (previousPattern === 32) {
            coords.push([previousPatternX - radius * 2, previousPatternY, 'seR'])
        } else {
            coords.push([previousPatternX, previousPatternY, 'seR'])
        }
    }
    // PATTERN 2 -- South West
    else if (thisPattern === 21) {
        if (previousPattern === 6) {
            coords.push([previousPatternX + radius, previousPatternY, 'sw'])
        } else if (previousPattern === 41) {
            coords.push([previousPatternX + radius * 2, previousPatternY, 'sw'])
        } else if (previousPattern === 7) {
            coords.push([previousPatternX, previousPatternY - radius, 'sw'])
        } else if (previousPattern === 32) {
            coords.push([previousPatternX, previousPatternY, 'sw'])
        } else {
            coords.push([previousPatternX - radius, previousPatternY, 'sw'])
        }
    } else if (thisPattern === 22) {
        if (previousPattern === 6) {
            coords.push([previousPatternX + radius, previousPatternY, 'swR'])
        } else if (previousPattern === 41) {
            coords.push([previousPatternX + radius * 2, previousPatternY, 'swR'])
        } else if (previousPattern === 7) {
            coords.push([previousPatternX, previousPatternY - radius, 'swR'])
        } else if (previousPattern === 42) {
            coords.push([previousPatternX, previousPatternY - radius * 2, 'swR'])
        } else if (previousPattern === 32) {
            coords.push([previousPatternX, previousPatternY, 'swR'])
        } else if (previousPattern === 12) {
            coords.push([previousPatternX, previousPatternY, 'swR'])
        } else {
            coords.push([previousPatternX - radius, previousPatternY, 'swR'])
        }
    }
    // PATTERN 3 --- North West
    else if (thisPattern === 31) {
        if (previousPattern === 11) {
            coords.push([previousPatternX + radius * 2, previousPatternY, 'nw'])
        } else if (previousPattern === 8) {
            coords.push([previousPatternX + radius, previousPatternY, 'nw'])
        } else if (previousPattern === 22) {
            coords.push([previousPatternX, previousPatternY, 'nw'])
        } else {
            coords.push([previousPatternX, previousPatternY + radius, 'nw'])
        }
    }
    else if (thisPattern === 32) {
        if (previousPattern === 12) {
            coords.push([previousPatternX, previousPatternY + radius * 2, 'nwR'])
        } else if (previousPattern === 42) {
            coords.push([previousPatternX, previousPatternY, 'nwR'])
        } else if (previousPattern === 22) {
            coords.push([previousPatternX, previousPatternY, 'nwR'])
        } else {
            coords.push([previousPatternX, previousPatternY + radius, 'nwR'])
        }
    }
    // PATTERN 4 ---- North East
    else if (thisPattern === 41) {
        if (previousPattern === 5) {
            coords.push([previousPatternX, previousPatternY + radius, 'ne'])
        } else if (previousPattern === 21 || previousPattern === 22) {
            coords.push([previousPatternX, previousPatternY + radius * 2, 'ne'])
        } else if (previousPattern === 31) {
            coords.push([previousPatternX, previousPatternY, 'ne'])
        } else if (previousPattern === 11) {
            coords.push([previousPatternX, previousPatternY, 'ne'])
        } else {
            coords.push([previousPatternX - radius * 3, previousPatternY + radius * 2, 'ne'])
        }
        // 4.2
    } else if (thisPattern === 42) {
        if (previousPattern === 5) {
            coords.push([previousPatternX, previousPatternY + radius, 'neR'])
        } else if (previousPattern === 22) {
            coords.push([previousPatternX - radius * 2, previousPatternY, 'neR'])
        } else if (previousPattern === 11) {
            coords.push([previousPatternX, previousPatternY, 'neR'])
        } else if (previousPattern === 8) {
            coords.push([previousPatternX - radius, previousPatternY, 'neR'])
        } else {
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
            coords.push([previousPatternX + radius, previousPatternY + radius, 'lb'])
        } else if (previousPattern === 6) {
            ctx.beginPath();
            ctx.lineTo(previousPatternX, previousPatternY);
            ctx.lineTo(previousPatternX, previousPatternY + radius);
            ctx.stroke();
            coords.push([previousPatternX, previousPatternY + radius, 'lb'])
        } else if (previousPattern === 31) {
            ctx.beginPath();
            ctx.lineTo(previousPatternX - radius, previousPatternY);
            ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
            ctx.stroke();
            coords.push([previousPatternX - radius, previousPatternY + radius, 'lb'])
        } else if (previousPattern === 32) {
            ctx.beginPath();
            ctx.lineTo(previousPatternX - radius, previousPatternY);
            ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
            ctx.stroke();
            coords.push([previousPatternX - radius, previousPatternY + radius, 'lb'])
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
            coords.push([previousPatternX - radius, previousPatternY, 'lt'])
        } else if (previousPattern === 8) {
            ctx.beginPath();
            ctx.lineTo(previousPatternX, previousPatternY);
            ctx.lineTo(previousPatternX, previousPatternY - radius);
            ctx.stroke();
            coords.push([previousPatternX, previousPatternY - radius, 'lt'])
        } else if (previousPattern === 11) {
            ctx.beginPath();
            ctx.lineTo(previousPatternX + radius, previousPatternY);
            ctx.lineTo(previousPatternX + radius, previousPatternY - radius);
            ctx.stroke();
            coords.push([previousPatternX + radius, previousPatternY - radius, 'lt'])
        }
    }
}

export function drawMap(ctx, pattern, firstElemPos, lineWidth) {
    // Quarters positions in circle drawining -> [translatiom, startAngle, rotation]
    const quarter = [[0, Math.PI / 2, 0], [Math.PI / 2, Math.PI / 2 + Math.PI / 2, 0], [Math.PI, Math.PI / 2 + Math.PI, radius],
    [Math.PI * 3 / 2, Math.PI / 2 + Math.PI * 3 / 2, radius]]
    /* PATTERN ID LIST
    1 - south east quart                    \/   lista z obrazkami z wyjaśnionymi patternami  \/
    2 - south west quart                    
    3 - north west quart                        https://i.postimg.cc/MG1NBMzy/infografika.png
    4 - north east quart
    5 - line to right
    6 - line to bottom
    7 - line to left
    8 - line to top */
    // Drawing the road and correcting offsets
    for (let i = 0; i < pattern.length; i++) {
        // First Element IT DETERMINES WHERE THE WAY SHOULD START DRAWING
        if (i === 0) {
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.lineTo(firstElemPos.x, firstElemPos.y);
            ctx.lineTo(firstElemPos.x, firstElemPos.y - radius);
            ctx.stroke();
            coords.push([firstElemPos.x, firstElemPos.y - radius, 'll'])
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
                } else if (previousPattern === 6) {
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
                } else if (previousPattern === 32) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[1][0], quarter[1][1]);
                    coords.push([previousPatternX, previousPatternY, 'sw'])
                } else {
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
                } else if (previousPattern === 22) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[2][0], quarter[2][1])
                    coords.push([previousPatternX, previousPatternY, 'nw'])
                } else {
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
                } else if (previousPattern === 11) {
                    drawCircle(previousPatternX, previousPatternY, radius, quarter[3][0], quarter[3][1])
                    coords.push([previousPatternX, previousPatternY, 'neR'])
                } else if (previousPattern === 8) {
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
                    ctx.closePath();
                    coords.push([previousPatternX + radius, previousPatternY + radius, 'lr'])
                } else if (previousPattern === 5) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX + radius, previousPatternY);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX + radius, previousPatternY, 'lr'])
                } else if (previousPattern === 31) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.lineTo(previousPatternX + radius, previousPatternY - radius);
                    ctx.stroke();
                    ctx.closePath();
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
                    ctx.closePath();
                    coords.push([previousPatternX + radius, previousPatternY + radius, 'bl'])
                } else if (previousPattern === 6) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX, previousPatternY + radius, 'bl'])
                } else if (previousPattern === 31) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX - radius, previousPatternY);
                    ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX - radius, previousPatternY + radius, 'bl'])
                } else if (previousPattern === 32) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX - radius, previousPatternY);
                    ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
                    ctx.stroke();
                    ctx.closePath();
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
                    ctx.closePath();
                    coords.push([previousPatternX - radius, previousPatternY, 'll'])
                } else if (previousPattern === 12) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX - radius, previousPatternY + radius, 'll'])
                } else if (previousPattern === 42) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.lineTo(previousPatternX - radius, previousPatternY - radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX - radius, previousPatternY - radius, 'll'])
                }
                else {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX, previousPatternY + radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX, previousPatternY + radius, 'll'])
                }
            }
            // PATTERN 8 -------- Line to top
            else if (thisPattern === 8) {
                if (previousPattern === 22) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX - radius, previousPatternY);
                    ctx.lineTo(previousPatternX - radius, previousPatternY - radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX - radius, previousPatternY - radius, 'lt'])
                } else if (previousPattern === 8) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX, previousPatternY - radius, 'lt'])
                } else if (previousPattern === 11) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX + radius, previousPatternY);
                    ctx.lineTo(previousPatternX + radius, previousPatternY - radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX + radius, previousPatternY - radius, 'lt'])
                }
            }
        }
    }
    console.log(coords)
}

// Show the visual representation of ingame map hitboxes
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
// Temaplate of rolling a random pattern element
const rollSinglePatternElement = (parrentArray, case1, case2, case3) => {
    switch (Math.floor(Math.random() * 3 + 1)) {
        case 1: parrentArray.push(case1)
            break;
        case 2: parrentArray.push(case2)
            break;
        case 3: parrentArray.push(case3)
            break;
    }
}
// Roll the start of drawing map
export const rollFirstPoint = (canvas) => {
    return { x: Math.floor((Math.random() * canvas.height / 2 + radius/2) + 1), y: canvas.height / 2 }
}
const rollNewPatternElement = (previousElement, parrentArray) => {
    if (previousElement === 41) {
        rollSinglePatternElement(parrentArray, 12, 21, 6)
    } else if (previousElement === 31) {
        rollSinglePatternElement(parrentArray, 41, 11, 5)
    } else if (previousElement === 21) {
        rollSinglePatternElement(parrentArray, 41, 11, 5)
    } else if (previousElement === 11) {
        rollSinglePatternElement(parrentArray, 31, 42, 8)
    } else if (previousElement === 42) {
        rollSinglePatternElement(parrentArray, 32, 22, 7)
    } else if (previousElement === 32) {
        rollSinglePatternElement(parrentArray, 21, 12, 6)
    } else if (previousElement === 22) {
        rollSinglePatternElement(parrentArray, 42, 31, 8)
    } else if (previousElement === 12) {
        rollSinglePatternElement(parrentArray, 32, 22, 7)
    } else if (previousElement === 5) {
        rollSinglePatternElement(parrentArray, 41, 11, 5)
    } else if (previousElement === 6) {
        rollSinglePatternElement(parrentArray, 21, 12, 6)
    } else if (previousElement === 7) {
        rollSinglePatternElement(parrentArray, 32, 22, 7)
    } else if (previousElement === 8) {
        rollSinglePatternElement(parrentArray, 31, 42, 8)
    }
}
const getRidOfLastPatternElement = (quartArray) => {
    quartArray.pop();
    POS_COORDS.pop();
}
/**
 * 
 * BELOW FUNCTIONS CREATE PATTERN QUARTER BY QUARTER
 * START OF CREATING IS FROM NORTH-WEST PATTERN CLOCKWISE
 * 
 */
/** NORTH WEST PATTERN */
export const proceduralNorthWestPattern = (ctx, canvas, firstPos) => {
    if (POS_COORDS.length === 0) {
        POS_COORDS.push([firstPos.x, firstPos.y - radius, 'start'])
    }
    const previousElement = quart1Coords[quart1Coords.length - 1]
    rollNewPatternElement(previousElement, quart1Coords)
    if (quart1Coords[quart1Coords.length - 1] === 42) {
        element42Counter++;
    } else if (quart1Coords[quart1Coords.length - 1] === 7) {
        element7Counter++;
    } else if (quart1Coords[quart1Coords.length - 1] === 31) {
        element31Counter++;
    } else if (quart1Coords[quart1Coords.length - 1] === 8) {
        element8Counter++;
    } else if (quart1Coords[quart1Coords.length - 1] === 6) {
        element6Counter++;
    }
    createPositionOfPatternElement(ctx, POS_COORDS, quart1Coords[quart1Coords.length - 1], quart1Coords[quart1Coords.length - 2], POS_COORDS[POS_COORDS.length - 1][0], POS_COORDS[POS_COORDS.length - 1][1])
    if (element42Counter >= 1 && quart1Coords[quart1Coords.length - 1] === 42) {
        getRidOfLastPatternElement(quart1Coords);
        proceduralNorthWestPattern(ctx, canvas, firstPos)
    } else if (element7Counter >= 1 && quart1Coords[quart1Coords.length - 1] === 7) {
        getRidOfLastPatternElement(quart1Coords);
        proceduralNorthWestPattern(ctx, canvas, firstPos)
    } else if (element8Counter >= 2 && quart1Coords[quart1Coords.length - 1] === 8) {
        getRidOfLastPatternElement(quart1Coords);
        proceduralNorthWestPattern(ctx, canvas, firstPos)
    } else if (element8Counter >= 1 && quart1Coords[quart1Coords.length - 1] === 6) {
        getRidOfLastPatternElement(quart1Coords);
        proceduralNorthWestPattern(ctx, canvas, firstPos)
    } else if (quart1Coords.length < 5 && quart1Coords[quart1Coords.length - 1] === 41) {
        getRidOfLastPatternElement(quart1Coords);
        proceduralNorthWestPattern(ctx, canvas, firstPos)
    }
    // If one element of pattern is not allowed, reset this func
    if (POS_COORDS[POS_COORDS.length - 1][0] < 0 || POS_COORDS[POS_COORDS.length - 1][1] - radius < 0 || POS_COORDS[POS_COORDS.length - 1][1] > canvas.height / 2 - radius / 2) {
        POS_COORDS = [POS_COORDS[0]];
        quart1Coords = [8];
        // Get rid of random deffects created by new coords transition
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        console.log('Reset patternu numer 1')
    }
    // Recursion conditiom
    if (POS_COORDS[POS_COORDS.length - 1][0] <= canvas.width / 2 && POS_COORDS.length < 26) {
        proceduralNorthWestPattern(ctx, canvas, firstPos)
    }
    return quart1Coords
}// END OF NORTH WEST

/** NORTH EAST PATTERN */
const proceduralNorthEastPattern = (ctx, canvas, firstPos) => {
    if (quart2Coords.length === 0) {
        element42Counter, element7Counter, element31Counter, element8Counter, element5Counter, element6Counter, element11Counter, element12Counter, element22Counter = 0;
        posCoordsLength = POS_COORDS.length;
        rollNewPatternElement(quart1Coords[quart1Coords.length - 1], quart2Coords)
        createPositionOfPatternElement(ctx, POS_COORDS, quart2Coords[quart2Coords.length - 1], quart1Coords[quart1Coords.length - 1], POS_COORDS[POS_COORDS.length - 1][0], POS_COORDS[POS_COORDS.length - 1][1])
    }
    const previousElement = quart2Coords[quart2Coords.length - 1]
    rollNewPatternElement(previousElement, quart2Coords)
    if (quart2Coords[quart2Coords.length - 1] === 11) {
        element11Counter++;
    } else if (quart2Coords[quart2Coords.length - 1] === 8) {
        element8Counter++;
    } else if (quart2Coords[quart2Coords.length - 1] === 42) {
        element42Counter++;
    } else if (quart2Coords[quart2Coords.length - 1] === 22) {
        element22Counter++;
    }
    createPositionOfPatternElement(ctx, POS_COORDS, quart2Coords[quart2Coords.length - 1], quart2Coords[quart2Coords.length - 2], POS_COORDS[POS_COORDS.length - 1][0], POS_COORDS[POS_COORDS.length - 1][1])
    if (element11Counter >= 1 && quart2Coords[quart2Coords.length - 1] === 11) {
        getRidOfLastPatternElement(quart2Coords);
        proceduralNorthEastPattern(ctx, canvas, firstPos)
    } else if (element8Counter >= 1 && quart2Coords[quart2Coords.length - 1] === 8) {
        getRidOfLastPatternElement(quart2Coords);
        proceduralNorthEastPattern(ctx, canvas, firstPos)
    } else if (element42Counter >= 0 && quart2Coords[quart2Coords.length - 1] === 42) {
        getRidOfLastPatternElement(quart2Coords);
        proceduralNorthEastPattern(ctx, canvas, firstPos)
    } else if (element22Counter >= 0 && quart2Coords[quart2Coords.length - 1] === 22) {
        getRidOfLastPatternElement(quart2Coords);
        proceduralNorthEastPattern(ctx, canvas, firstPos)
    }
    // If one element of pattern is not allowed, reset this func
    if (POS_COORDS[POS_COORDS.length - 1][1] - radius < 0 || POS_COORDS[POS_COORDS.length - 1][0] < canvas.width / 2 - radius / 2 || POS_COORDS[POS_COORDS.length - 1][0] + radius * 2/3 > canvas.width) {
        POS_COORDS.splice(posCoordsLength, POS_COORDS.length - posCoordsLength)
        quart2Coords = [];
        // Get rid of random deffects created by new coords transition
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        console.log('Reset patternu numer 2')
    }
    // Recursion conditiom
    if (POS_COORDS[POS_COORDS.length - 1][1] + radius <= canvas.height / 2 && POS_COORDS.length < posCoordsLength + 13) {
        proceduralNorthEastPattern(ctx, canvas, firstPos)
    }
    return quart2Coords
}// END OF NORTH EAST

/** SOUTH EAST PATTERN */
const proceduralSouthEastPattern = (ctx, canvas, firstPos) => {
    if (quart3Coords.length === 0) {
        element42Counter, element7Counter, element31Counter, element8Counter, element5Counter, element6Counter, element11Counter, element12Counter, element22Counter = 0;
        posCoordsLength = POS_COORDS.length;
        rollNewPatternElement(quart2Coords[quart2Coords.length - 1], quart3Coords)
        createPositionOfPatternElement(ctx, POS_COORDS, quart3Coords[quart3Coords.length - 1], quart2Coords[quart2Coords.length - 1], POS_COORDS[POS_COORDS.length - 1][0], POS_COORDS[POS_COORDS.length - 1][1])
    }
    const previousElement = quart3Coords[quart3Coords.length - 1]
    rollNewPatternElement(previousElement, quart3Coords)
    if (quart3Coords[quart3Coords.length - 1] === 21) {
        element21Counter++;
    } else if (quart3Coords[quart3Coords.length - 1] === 8) {
        element8Counter++;
    }
    createPositionOfPatternElement(ctx, POS_COORDS, quart3Coords[quart3Coords.length - 1], quart3Coords[quart3Coords.length - 2], POS_COORDS[POS_COORDS.length - 1][0], POS_COORDS[POS_COORDS.length - 1][1])
    if (element21Counter >= 1 && quart3Coords[quart3Coords.length - 1] === 21) {
        getRidOfLastPatternElement(quart3Coords)
        proceduralSouthEastPattern(ctx, canvas, firstPos)
    } else if (element8Counter >= 1 && quart3Coords[quart3Coords.length - 1] === 8) {
        getRidOfLastPatternElement(quart3Coords)
        proceduralSouthEastPattern(ctx, canvas, firstPos)
    }
    // If one element of pattern is not allowed, reset this func
    if (POS_COORDS[POS_COORDS.length - 1][1] + radius > canvas.height || POS_COORDS[POS_COORDS.length - 1][0] - radius / 2 > canvas.width || POS_COORDS[POS_COORDS.length - 1][1] <= canvas.height / 2) {
        POS_COORDS.splice(posCoordsLength, POS_COORDS.length - posCoordsLength)
        quart3Coords = [];
        // Get rid of random deffects created by new coords transition
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        console.log('Reset patternu numer 3')
    }
    // Recursion conditiom
    if (POS_COORDS[POS_COORDS.length - 1][0] >= canvas.width / 2 && POS_COORDS.length < posCoordsLength + 18) {
        proceduralSouthEastPattern(ctx, canvas, firstPos)
    }
    return quart3Coords
}// END OF SOUTH EAST PATTERN

/** SOUTH WEST PATTERN */
const proceduralSouthWestPattern = (ctx, canvas) => {
    if (quart4Coords.length === 0) {
        element42Counter, element7Counter, element32Counter, element8Counter, element5Counter, element6Counter, element11Counter, element12Counter, element22Counter = 0;
        posCoordsLength = POS_COORDS.length;
        rollNewPatternElement(quart3Coords[quart3Coords.length - 1], quart4Coords)
        createPositionOfPatternElement(ctx, POS_COORDS, quart4Coords[quart4Coords.length - 1], quart3Coords[quart3Coords.length - 1], POS_COORDS[POS_COORDS.length - 1][0], POS_COORDS[POS_COORDS.length - 1][1])
    }
    const previousElement = quart4Coords[quart4Coords.length - 1]
    rollNewPatternElement(previousElement, quart4Coords)
    if (quart4Coords[quart4Coords.length - 1] === 32) {
        element32Counter++;
    } else if (quart4Coords[quart4Coords.length - 1] === 21) {
        element21Counter++;
    } else if (quart4Coords[quart4Coords.length - 1] === 6) {
        element6Counter++;
    }
    createPositionOfPatternElement(ctx, POS_COORDS, quart4Coords[quart4Coords.length - 1], quart4Coords[quart4Coords.length - 2], POS_COORDS[POS_COORDS.length - 1][0], POS_COORDS[POS_COORDS.length - 1][1])
    if (element32Counter >= 0 && quart4Coords[quart4Coords.length - 1] === 32) {
        getRidOfLastPatternElement(quart4Coords)
        proceduralSouthWestPattern(ctx, canvas)
    } else if (element21Counter >= 0 && quart4Coords[quart4Coords.length - 1] === 21) {
        getRidOfLastPatternElement(quart4Coords)
        proceduralSouthWestPattern(ctx, canvas)
    } else if (element6Counter >= 0 && quart4Coords[quart4Coords.length - 1] === 6) {
        getRidOfLastPatternElement(quart4Coords)
        proceduralSouthWestPattern(ctx, canvas)
    }
    // If one element of pattern is not allowed, reset this func
    if (POS_COORDS[POS_COORDS.length - 1][1] + radius > canvas.height || POS_COORDS[POS_COORDS.length - 1][0] >= canvas.width / 2 || POS_COORDS[POS_COORDS.length - 1][0] + radius / 2 <= 0 || POS_COORDS[POS_COORDS.length - 1][1] <= canvas.height / 2 + radius / 2 || POS_COORDS[POS_COORDS.length - 1][1] < POS_COORDS[0][1]) {
        POS_COORDS.splice(posCoordsLength, POS_COORDS.length - posCoordsLength)
        quart4Coords = [];
        // Get rid of random deffects created by new coords transition
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        console.log('Reset patternu numer 4')
    }
    // Recursion conditiom
    //if (POS_COORDS[POS_COORDS.length - 1][1] - radius/2 >= canvas.height / 2 && POS_COORDS.length < posCoordsLength + 18) {
    if (!(POS_COORDS[POS_COORDS.length - 1][0] === POS_COORDS[0][0] && POS_COORDS[POS_COORDS.length - 1][1] - radius === POS_COORDS[0][1]) && POS_COORDS.length < posCoordsLength + 9) {
        proceduralSouthWestPattern(ctx, canvas)
    } else {
        if (POS_COORDS[POS_COORDS.length - 1][0] !== POS_COORDS[0][0] && POS_COORDS[POS_COORDS.length - 1][1] - radius !== POS_COORDS[0][1]) {
            POS_COORDS.splice(posCoordsLength, POS_COORDS.length - posCoordsLength)
            quart4Coords = [];
            // Get rid of random deffects created by new coords transition
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            console.log('Reset patternu numer 4 ten pozniejszy')
            proceduralSouthWestPattern(ctx, canvas)
        }
    }
    console.log(quart4Coords)
    return quart4Coords
}// END OF SOUTH WEST PATTERN

export const createPattern = (ctx, canvas, firstPos) => {
    let resultArr = [];
    resultArr = [
        ...proceduralNorthWestPattern(ctx, canvas, firstPos), // NORTH WEST QUARTER OF MAP
        ...proceduralNorthEastPattern(ctx, canvas, firstPos), // NORTH EAST QUARTER OF MAP
        ...proceduralSouthEastPattern(ctx, canvas, firstPos), // SOUTH EAST QUARTER OF MAP
        ...proceduralSouthWestPattern(ctx, canvas), // SOUTH WEST QUARTER OF MAP
    ]
    console.log(resultArr);
    return resultArr;
}