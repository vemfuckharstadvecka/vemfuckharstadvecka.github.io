async function fetchAndDisplayQuote() {
    try {
        // Fetch the text file
        const response = await fetch('vem.txt');
        const text = await response.text();
        
        // Split the text into lines
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        // Calculate which line to show based on the week number
        const startDate = new Date('2024-01-01'); // Set your start date
        const currentDate = new Date();
        const timeDiff = currentDate - startDate;
        const weekNumber = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000)) + 1;
        console.log(weekNumber);
        // Use modulo to cycle through the lines if we reach the end
        const lineToShow = weekNumber % lines.length;
        
        // Display the quote
        document.getElementById('quote').textContent = lines[lineToShow];
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('quote').textContent = 'Error loading quote';
    }
}

// Call the function when page loads
fetchAndDisplayQuote();
