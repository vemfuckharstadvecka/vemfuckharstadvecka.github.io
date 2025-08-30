async function fetchAndDisplayQuote() {
    try {
        const startWeek = 35;
        // Fetch the text file
        const responseSchedule = await readFile('vem.txt');
        const responseRoomId = await readFile('namn.txt');
        const guardABs = responseSchedule.split('\n').filter(line => line.trim() !== '');
        const namesWithIds = responseRoomId.split('\n').filter(line => line.trim() !== '');
        console.log(await whoseTurn(startWeek));
        const currentWorkersIds = guardABs[await whoseTurn(startWeek, false)].split(' ');
        const nextWorkersIds = guardABs[await whoseTurn(startWeek, true)].split(' ');
        console.log(currentWorkersIds[0]);
        console.log(currentWorkersIds[1]);
        document.getElementById('guardA').textContent = "Sopor: " + getNameByNumber(currentWorkersIds[0], namesWithIds);
        document.getElementById('guardB').textContent = "Bänk: " + getNameByNumber(currentWorkersIds[1], namesWithIds);
        document.getElementById('nGuardA').textContent = "Nästa: " + getNameByNumber(nextWorkersIds[0], namesWithIds);
        document.getElementById('nGuardB').textContent = "Nästa: " + getNameByNumber(nextWorkersIds[1], namesWithIds);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('quote').textContent = 'Error loading quote';
    }
}

// Call the function when page loads
async function whoseTurn(startWeek, isNext) {
    const startDate = new Date('2024-12-30');
    const currentDate = new Date();
    const timeDiff = currentDate - startDate;
    const weekNumber = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000)) + 1;
    console.log(weekNumber);
    const res = weekNumber -startWeek;
    if (isNext) {
        return res+1;
    } else {
        return res;
    }
    
    // Update if new week is bigger
}
// Read entire file
async function readFile(filename) {
    try {
        const response = await fetch(filename);
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

function getNameByNumber(number, list1) {
    const res = list1.find(entry => entry.startsWith(number + ' ')).split(" ")[1];
    console.log(res);
    return res;
}
fetchAndDisplayQuote();
