async function fetchAndDisplayQuote() {
    try {
        const startWeek = 44;
        // Fetch the text file
        const responseSchedule = await readFile('vem.txt');
        const responseRoomId = await readFile('namn.txt');
        const guardABs = responseSchedule.split('\n').filter(line => line.trim() !== '');
        const namesWithIds = responseRoomId.split('\n').filter(line => line.trim() !== '');

        const currentWorkersIds = guardABs[await whoseTurn(startWeek)].split(' ');
        console.log(currentWorkersIds[0]);
        console.log(currentWorkersIds[1]);
        document.getElementById('guardA').textContent = getNameByNumber(currentWorkersIds[0], namesWithIds);
        document.getElementById('guardB').textContent = getNameByNumber(currentWorkersIds[1], namesWithIds);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('quote').textContent = 'Error loading quote';
    }
}

// Call the function when page loads
async function whoseTurn(startWeek) {
    const startDate = new Date('2024-01-01');
    const currentDate = new Date();
    const timeDiff = currentDate - startDate;
    const weekNumber = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000)) + 1;
    console.log(weekNumber);
    return weekNumber-startWeek;
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
