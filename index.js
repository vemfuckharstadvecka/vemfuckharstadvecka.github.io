async function showSchedule() {
    try {
        // Fetch the text file
        const responseSchedule = await readFile('vem.txt');
        const responseRoomId = await readFile('namn.txt');

        const now = new Date();
        const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        
        const guardABs = responseSchedule.split('\n').map(l => l.trim()).filter(Boolean);
        const namesWithIds = responseRoomId.split('\n').map(l => l.trim()).filter(Boolean);
        
        const [currentA, currentB] = getNames(whoseTurnIndex(today, guardABs.length), guardABs, namesWithIds);
        const [nextA, nextB] = getNames(whoseTurnIndex(today+MS_PER_WEEK, guardABs.length), guardABs, namesWithIds);
        
        document.getElementById('guardA').textContent = "Sopor: " + currentA;
        document.getElementById('guardB').textContent = "Bänk: " + currentB;
        document.getElementById('nGuardA').textContent = "Nästa: " + nextA;
        document.getElementById('nGuardB').textContent = "Nästa: " + nextB;
    } catch (error) {
        console.error('Error:', error);
    }
}

const MS_PER_WEEK = 7*24*60*60*1000; // milliseconds in one week

// Find the Monday on or after the given date (month is 0-indexed, 7=Aug)
function mondayOnOrAfter(year, month, day) {
    const d = new Date(Date.UTC(year, month, day));
    return d.getTime() + ((8 - d.getUTCDay()) % 7) * 24 * 60 * 60 * 1000;
}

// Returns the line index in vem.txt, or null if it's summer break
function whoseTurnIndex(date, length) {
    let year = new Date(date).getUTCFullYear();
    if (date < mondayOnOrAfter(year, 7, 28)) year--; // still in last academic year

    const start = mondayOnOrAfter(year, 7, 28);
    const end = mondayOnOrAfter(year + 1, 5, 1) + 2*MS_PER_WEEK; // second week of June

    if (date >= end) return null; // summer break

    const weekNumber = Math.floor((date - start) / MS_PER_WEEK); // week number

    return weekNumber % length

}

// Read entire file
async function readFile(filename) {
    const response = await fetch(filename);
    if (!response.ok) throw new Error(`Could not load ${filename}`);
    return response.text();
}

// Get name by room ID
function getNameByNumber(number, namesWithNumber) {
    const res = namesWithNumber.find(entry => entry.startsWith(number + ' ')).split(" ")[1];
    console.log(res);
    return res;
}

function getNames(index, schedule, namesWithIds) {
    if (index == null) return ['Uppehåll', 'Uppehåll'];
    const [a, b] = schedule[index].split(' ');
    return [getNameByNumber(a, namesWithIds), getNameByNumber(b, namesWithIds)]
}

showSchedule();
