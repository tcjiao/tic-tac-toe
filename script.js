// constants

const MARKERS = {
    '1' : 'X',
    '-1' : 'O',
    '0' : ''
  }
  const COLORS = {
    '1' : 'purple',
    '-1': 'orange'
  }
  // state variables
  let squares; // array of 3 column arrays
  let turn; // 1 or -1
  let winner; // null = no winner; 1 or -1 winner; 'T' = Tie
  
  // Cached Elements
  const messageEl = document.querySelector('h1');
  const resetBtn = document.querySelector('button');
  const markerEls = [...document.querySelectorAll('#squares > div')];
  
  // event listeners
  document.getElementById('squares').addEventListener('click', handleDrop);
  resetBtn.addEventListener('click', init);
  
  
  
  // functions
  init();
  
  // Initialize all state, then call render()
  function init() {
    squares =[0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = null;
    render();
  }
  
  function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    squares[colIdx] = turn;
    turn *= -1;
    winner = getWinner(colIdx);  
    render();
  }
  
  function getWinner(colIdx){
    return checkVerticalWin(colIdx) || checkHorizontalWin(colIdx) || checkDiagonalWin(colIdx) || checkDiagonalnwseWin(colIdx);
  }
  
  function checkVerticalWin(colIdx){
    return countAdjacent(colIdx, -3) === 2 ? squares[colIdx] : null;
  }
  
  function checkDiagonalWin(colIdx){
    return countAdjacent(colIdx, -2) === 2 ? squares[colIdx] : null;
  }
  
  function checkDiagonalnwseWin(colIdx){
    return countAdjacent(colIdx, -4) === 2 ? squares[colIdx] : null;
  }
  
  function checkHorizontalWin(colIdx){
    return countAdjacent(colIdx, -1) === 2 ? squares[colIdx] : null;
  }
  
  function countAdjacent(colIdx, colOffset){
    const player = squares[colIdx];
    let count = 0;
    colIdx += colOffset;
    while (
      squares[colIdx] !== undefined &&
      squares[colIdx] === player
    ) {
      count++;
      colIdx += colOffset;
    }
    return count;
  }
  
  function render() {
    renderSquares();
    renderMessage();
    renderControls();
  }
  
  function renderSquares() {
    squares.forEach(function(cellVal, colIdx){
        const cellId = `c${colIdx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.innerText = MARKERS[cellVal];
        cellEl.style.color = COLORS[cellVal];
    }); 
  }
  
  
  
  
  
  
  function renderMessage() {
    if (winner === 'T') {
      messageEl.innerText = "It's a Tie!!!";
    }
    else if (winner) {
      messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${MARKERS[winner].toUpperCase()}</span>'s Winner!!!`;  }
  
    else {
      // Game is in play
      messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${MARKERS[turn].toUpperCase()}</span>'s Turn`;  }
  }
  
  function renderControls() {
    resetBtn.style.visibility = winner ? 'visible': 'hidden';
    
  
    
  }
  
  