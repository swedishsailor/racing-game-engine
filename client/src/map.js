import { drawCircle } from "./client.js";

// Radius of curves -> REMEMBER if you change radius dont forget to change lineWidth in client.js
const radius = 80;
// Array with all the hitbox/way drawing coords
const coords = [];

function matchElements(ctx, coords, thisPattern, previousPattern, previousPatternX, previousPatternY) {
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
            coords.push([previousPatternX + radius, previousPatternY + radius, 'bl'])
        } else if (previousPattern === 6) {
            ctx.beginPath();
            ctx.lineTo(previousPatternX, previousPatternY);
            ctx.lineTo(previousPatternX, previousPatternY + radius);
            ctx.stroke();
            coords.push([previousPatternX, previousPatternY + radius, 'bl'])
        } else if (previousPattern === 31) {
            ctx.beginPath();
            ctx.lineTo(previousPatternX - radius, previousPatternY);
            ctx.lineTo(previousPatternX - radius, previousPatternY + radius);
            ctx.stroke();
            coords.push([previousPatternX - radius, previousPatternY + radius, 'bl'])
        } else if (previousPattern === 32) {
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

export function prepareMap(ctx, pattern, firstElemPos, lineWidth) {
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
                    ctx.lineTo(previousPatternX - radius, previousPatternY - radius);
                    ctx.lineTo(previousPatternX - radius, previousPatternY);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX - radius, previousPatternY, 'll'])
                } else if (previousPattern === 8) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX, previousPatternY);
                    ctx.lineTo(previousPatternX, previousPatternY - radius);
                    ctx.stroke();
                    ctx.closePath();
                    coords.push([previousPatternX, previousPatternY - radius, 'll'])
                } else if (previousPattern === 11) {
                    ctx.beginPath();
                    ctx.lineTo(previousPatternX + radius, previousPatternY);
                    ctx.lineTo(previousPatternX + radius, previousPatternY - radius);
                    ctx.stroke();
                    ctx.closePath();
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
export const proceduralPattern = (numberOfElements) => {
    const arr = [];
    for (let i = 0; i < numberOfElements; i++) {
        const previousElement = arr[i - 1];
        if (i === 0) {
            arr.push(8);
        } else if (i > 0) {
            if (previousElement === 41) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(12)
                        break;
                    case 2: arr.push(21)
                        break;
                    case 3: arr.push(6)
                        break;
                }
            } else if (previousElement === 31) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(41)
                        break;
                    case 2: arr.push(11)
                        break;
                    case 3: arr.push(5)
                        break;
                }
            } else if (previousElement === 21) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(41)
                        break;
                    case 2: arr.push(11)
                        break;
                    case 3: arr.push(5)
                        break;
                }
            } else if (previousElement === 11) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(31)
                        break;
                    case 2: arr.push(42)
                        break;
                    case 3: arr.push(8)
                        break;
                }
            } else if (previousElement === 42) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(32)
                        break;
                    case 2: arr.push(22)
                        break;
                    case 3: arr.push(7)
                        break;
                }
            } else if (previousElement === 32) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(21)
                        break;
                    case 2: arr.push(12)
                        break;
                    case 3: arr.push(6)
                        break;
                }
            } else if (previousElement === 22) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(42)
                        break;
                    case 2: arr.push(31)
                        break;
                    case 3: arr.push(8)
                        break;
                }
            } else if (previousElement === 12) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(32)
                        break;
                    case 2: arr.push(22)
                        break;
                    case 3: arr.push(7)
                        break;
                }
            }
            else if (previousElement === 5) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(41)
                        break;
                    case 2: arr.push(11)
                        break;
                    case 3: arr.push(5)
                        break;
                }
            } else if (previousElement === 6) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(21)
                        break;
                    case 2: arr.push(12)
                        break;
                    case 3: arr.push(6)
                        break;
                }
            }
            else if (previousElement === 7) {
                switch (Math.floor(Math.random() * 3 + 1)) {
                    case 1: arr.push(32)
                        break;
                    case 2: arr.push(22)
                        break;
                    case 3: arr.push(7)
                        break;
                }
            }
            else if (previousElement === 8) {
                switch (Math.floor(Math.random() * 3 + 1)) {
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
// Temaplate of rolling a random pattern element
const rollSingleElement = (parrentArray, case1, case2, case3) => {
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
    const quart1 = { x: [0, canvas.height / 2], y: [0, canvas.width / 2] };
    return { x: Math.floor((Math.random() * canvas.height / 2 + 10) + 1), y: canvas.height / 2 }
}
const rollNewElement = (previousElement, parrentArray) => {
    if (previousElement === 41) {
        rollSingleElement(parrentArray, 12, 21, 6)
    } else if (previousElement === 31) {
        rollSingleElement(parrentArray, 41, 11, 5)
    } else if (previousElement === 21) {
        rollSingleElement(parrentArray, 41, 11, 5)
    } else if (previousElement === 11) {
        rollSingleElement(parrentArray, 31, 42, 8)
    } else if (previousElement === 42) {
        rollSingleElement(parrentArray, 32, 22, 7)
    } else if (previousElement === 32) {
        rollSingleElement(parrentArray, 21, 12, 6)
    } else if (previousElement === 22) {
        rollSingleElement(parrentArray, 42, 31, 8)
    } else if (previousElement === 12) {
        rollSingleElement(parrentArray, 32, 22, 7)
    } else if (previousElement === 5) {
        rollSingleElement(parrentArray, 41, 11, 5)
    } else if (previousElement === 6) {
        rollSingleElement(parrentArray, 21, 12, 6)
    } else if (previousElement === 7) {
        rollSingleElement(parrentArray, 32, 22, 7)
    } else if (previousElement === 8) {
        rollSingleElement(parrentArray, 31, 42, 8)
    }
}

let element42Counter = 0;
let element7Counter = 0;
let element31Counter = 0;
let element8Counter = 0;
let element5Counter = 0;
let element6Counter = 0;

let quart1Coords = [8];
let POS_COORDS = [];
export const proceduralQuartPattern = (ctx, canvas, firstPos) => {
    if (POS_COORDS.length === 0) {
        POS_COORDS.push([firstPos.x, firstPos.y - radius, 'll'])
    }

    const previousElement = quart1Coords[quart1Coords.length - 1]
    rollNewElement(previousElement, quart1Coords)
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

    matchElements(ctx, POS_COORDS, quart1Coords[quart1Coords.length - 1], quart1Coords[quart1Coords.length - 2], POS_COORDS[POS_COORDS.length - 1][0], POS_COORDS[POS_COORDS.length - 1][1])

    if (element42Counter >= 1 && quart1Coords[quart1Coords.length - 1] === 42) {
        quart1Coords.pop();
        POS_COORDS.pop();
        proceduralQuartPattern(ctx, canvas, firstPos)
    } else if (element7Counter >= 1 && quart1Coords[quart1Coords.length - 1] === 7) {
        POS_COORDS.pop();
        quart1Coords.pop();
        proceduralQuartPattern(ctx, canvas, firstPos)
    } else if (element8Counter >= 2 && quart1Coords[quart1Coords.length - 1] === 8) {
        POS_COORDS.pop();
        quart1Coords.pop();
        proceduralQuartPattern(ctx, canvas, firstPos)
    } else if (element8Counter >= 1 && quart1Coords[quart1Coords.length - 1] === 6) {
        POS_COORDS.pop();
        quart1Coords.pop();
        proceduralQuartPattern(ctx, canvas, firstPos)
    } else if (quart1Coords.length < 5 && quart1Coords[quart1Coords.length - 1] === 41) {
        POS_COORDS.pop();
        quart1Coords.pop();
        proceduralQuartPattern(ctx, canvas, firstPos)
    }

    // If one element of pattern is not allowed, reset this func
    if (POS_COORDS[POS_COORDS.length - 1][0] < 0 || POS_COORDS[POS_COORDS.length - 1][1] - radius / 2 < 0 || POS_COORDS[POS_COORDS.length - 1][1] > canvas.height / 2 - radius / 2) {
        POS_COORDS = [POS_COORDS[0]];
        quart1Coords = [8];
        // Get rid of random deffects created by new coords transition
        ctx.clearRect(0,0,canvas.width, canvas.height)
        console.log('Reset patternu')
    }

    // Recursion conditiom
    if (POS_COORDS[POS_COORDS.length - 1][0] <= canvas.width / 2 && POS_COORDS.length < 26) {
        proceduralQuartPattern(ctx, canvas, firstPos)
    }
    return quart1Coords
}