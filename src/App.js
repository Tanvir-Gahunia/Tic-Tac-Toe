import React from "react"


function Square(props) {

    return (
        <button className="square" onClick={props.click}>{props.value}</button>
    )
}


function ResetGame(props) {
    return (
        <div className="reset">
            <button className="reset-btn" onClick={props.reset}>Reset Game</button>
        </div>
    )
}

export default function Board() {

    const [Squares, setSquares] = React.useState(Array(9).fill(''))
    const [XPlayer, setPlayer] = React.useState(true)
    const [winner, setWinner] = React.useState(null);

    
    
    
    function handleClick(i) {
        if (Squares[i] !== '' || winner != null) {
            return;
        }

        const nextSquares=Squares.slice()
        if (XPlayer) {
            nextSquares[i] = 'X'
        } else {
            nextSquares[i] = 'O'
        }
        setSquares(nextSquares)
        setPlayer(!XPlayer)
    }

    React.useEffect(() => {
        
        const gameWinner = findwin(Squares);
        if (gameWinner) {
            setWinner(gameWinner);
        } else if (Squares.every((square) => square !== "")) {
            setWinner("Tie");
        }
    // eslint-disable-next-line
    }, [Squares]);

    function reload() {
        setSquares(Array(9).fill('')) 
        setPlayer(true)
        setWinner(null)
    }

    return (
        <div>
            <div>
                <h3>
                    {(() => {
                        let gameStatus;
                        if (winner === "Tie") {
                            gameStatus = "It's a tie!";
                        } else if (winner) {
                            gameStatus = `Winner: ${winner}`;
                        } else {
                            gameStatus = "Game in progress...";
                        }
                        return gameStatus;
                    })()}
                </h3>
            </div>
            <div className="Board">
                <div className="row">
                    <Square value={Squares[0]} click={() => handleClick(0)}/>
                    <Square value={Squares[1]} click={() => handleClick(1)}/>
                    <Square value={Squares[2]} click={() => handleClick(2)}/>
                </div>
                <div className="row">
                    <Square value={Squares[3]} click={() => handleClick(3)}/>
                    <Square value={Squares[4]} click={() => handleClick(4)}/>
                    <Square value={Squares[5]} click={() => handleClick(5)}/>
                </div>
                <div className="row">
                    <Square value={Squares[6]} click={() => handleClick(6)}/>
                    <Square value={Squares[7]} click={() => handleClick(7)}/>
                    <Square value={Squares[8]} click={() => handleClick(8)}/>
                </div>
            </div>
            <div>
                <ResetGame reset={reload}/>
            </div>
            
        </div>
    )

    function findwin() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (Squares[a] && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
              return Squares[a];
            }
          }
          return null;
    }
}


