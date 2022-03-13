import Board from './components/Board';

const myBoard =  function (){   
       const board = new Board();
       board.createInstance();
       board.displayBoard();
       board.addEventListeners();
}

export default myBoard;