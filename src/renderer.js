// Call main function downloadImages from HTML by click button

document.getElementById('parseBtn').addEventListener('click', async () => {
    console.log('electron === ', await window.electron);
    await window.electron.downloadImages()
})