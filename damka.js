let boardMat = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0]
];
let newBoard = boardMat

function init_board(boardMat){
    
    const board = document.getElementById('board')
    let S_id=0
    let C_id =0
    for(let y=0 ; y<8 ; y++){
        for(let x=0 ; x<8 ;x++){
            const square = document.createElement('div')
            const checker = document.createElement('div')
            if(y%2 === 0){
                x%2 === 0 ? square.className = 'white' : square.className = 'black'
            }
            else{
                x%2 === 1 ? square.className = 'white' : square.className = 'black'
            }
            if (boardMat[y][x] === 1){
                checker.className = 'whiteChecker'
                C_id = y + '' +x +'C'
            }
            else if(boardMat[y][x] === 2){
                checker.className = 'blackChecker'
                C_id = y + '' +x +'C'
            }
            else if(boardMat[y][x] === 3){
                checker.className = 'whiteKing'
                C_id = y + '' +x +'K'
            }
            else if(boardMat[y][x] === 4){
                checker.className = 'whiteKing'
                C_id = y + '' +x +'K'
            }
            S_id = y + '' + x

            square.setAttribute("id",S_id);
            checker.setAttribute("id",C_id);

            square.appendChild(checker);
            square.addEventListener('click',gameHandler);
            board.appendChild(square);

        }
    }
}
let isWhite =true
let selectedPiece = null
function gameHandler(e){
    if(selectedPiece === null && e.target.id.length === 3){
        if((isWhite && e.target.className === 'whiteChecker') || (!isWhite && e.target.className === 'blackChecker')){
            selectedPiece = e.target  
        }
        else if((isWhite && e.target.className === 'whiteKing') || (!isWhite && e.target.className === 'blackKing')){
            selectedPiece = e.target 
               
        } 
            
    }
    else{
        
        if(canJumpAny(isWhite)){
            if(canPieceJump(selectedPiece , isWhite)){  
                if(isLegalPlace(e)){
                    if(isLegalJump(selectedPiece,e,isWhite)){
                        jump(selectedPiece,e,isWhite);
                        if(!canPieceJump(selectedPiece , isWhite)){  
                            selectedPiece = null
                            isWhite = !isWhite
                        }   
                    }
                    else {
                        alert('you can not jump to this place pick another') 
                    }
                }
                else {
                    alert('you can not move to white square')
                }
            }
            else{
                selectedPiece = null   
            }
            
        }
        else if (isLegalPlace(e) && isLegalMove(selectedPiece , e , isWhite)){
            move(selectedPiece , e , isWhite );
            selectedPiece = null;
            isWhite = !isWhite;
        }
        else{
            selectedPiece = null;
        }
    }
    if(checkWinBlack(boardMat)){
        alert('THE WINNER IS BLACK!!')
        
    }
    else if(checkWinWhithe(boardMat)){
        alert('THE WINNER IS WHITE!!')
        
    }
    console.log(boardMat)
    

}
// checking black had won
function checkWinBlack(boardMat){
    for(let y = 0 ; y < 8 ; y++){
        for (let x = 0 ; x<8 ; x++){
            if(boardMat[y][x]%2 === 1){
                return false
            }

        }
    }
    return true

}
// checking if the white had won
function checkWinWhithe(boardMat){
    for(let y = 0 ; y < 8 ; y++){
        for (let x = 0 ; x<8 ; x++){
            if(boardMat[y][x] === 2 || boardMat[y][x] === 4){
                return false
            }

        }
    }
    return true
}
// moving piece (jumping)
function jump(selectedPiece , e , isWhite){
    let piece_Y=parseInt(selectedPiece.id[0]);
    let piece_X = parseInt(selectedPiece.id[1]);
    let target_Y = parseInt(e.target.id[0]);
    let target_X = parseInt(e.target.id[1]);
    
    let victimID = ''
    

    if(isWhite){
        
        if(target_Y - piece_Y === 2){
            if(target_X - piece_X === 2){
                boardMat[piece_Y + 1][piece_X + 1] = 0
                victimID = (piece_Y + 1) + '' + (piece_X + 1) + 'C'
            }
            else if(piece_X - target_X === 2){
                boardMat[piece_Y + 1][piece_X - 1] = 0
                victimID = (piece_Y + 1) + '' + (piece_X - 1) + 'C'
            }
        }
        else if (piece_Y -target_Y === 2 && isWhiteKing(selectedPiece)){
            if(target_X - piece_X === 2){
                boardMat[piece_Y - 1][piece_X + 1] = 0
                victimID = (piece_Y - 1) + '' + (piece_X + 1) + 'C'
            }
            else if(piece_X - target_X === 2){
                boardMat[piece_Y - 1][piece_X - 1] = 0
                victimID = (piece_Y - 1) + '' + (piece_X - 1) + 'C'
            }
        }
    }
    else{
        
        if(piece_Y - target_Y === 2){
            
            if(target_X - piece_X === 2){
                boardMat[piece_Y - 1][piece_X + 1] = 0
                victimID = (piece_Y - 1) + '' + (piece_X + 1) + 'C'
            }
            else if(piece_X - target_X === 2){
                boardMat[piece_Y - 1][piece_X - 1] = 0
                victimID = (piece_Y - 1) + '' + (piece_X - 1) + 'C'
            }
        }
        else if(target_Y - piece_Y === 2 && isBlackKing(selectedPiece)){
            
            if(target_X - piece_X === 2){
                boardMat[piece_Y + 1][piece_X + 1] = 0
                victimID = (piece_Y + 1) + '' + (piece_X + 1) + 'C'
            }
            else if(piece_X - target_X === 2){
                boardMat[piece_Y + 1][piece_X - 1] = 0
                victimID = (piece_Y + 1) + '' + (piece_X - 1) + 'C'
            }
        }
    }
    move(selectedPiece,e,isWhite);
    document.getElementById(victimID).remove()

}
// checking if the jump we are going to make is legal
function isLegalJump(selectedPiece , e , isWhite){
    let piece_Y=parseInt(selectedPiece.id[0]);
    let piece_X = parseInt(selectedPiece.id[1]);
    let target_Y = parseInt(e.target.id[0]);
    let target_X = parseInt(e.target.id[1]);
    

    if(isWhite){
        if(target_Y - piece_Y == 2 && ((piece_X - target_X === 2) || (target_X - piece_X === 2))){
            return true
        }
        else if(isWhiteKing(selectedPiece)){
            
            if(target_Y - piece_Y == 2 && ((piece_X - target_X === 2) || (target_X - piece_X === 2))){
                return true
            }
            else if(target_Y - piece_Y == -2 && ((piece_X - target_X === 2) || (target_X - piece_X === 2))){
                return true
            }
            
        }
    }
    else{
        if(target_Y - piece_Y == -2 && ((piece_X - target_X === 2) || (target_X - piece_X === 2))){
            return true
        }
        else if(isBlackKing(selectedPiece)){
            
            if(target_Y - piece_Y == 2 && ((piece_X - target_X === 2) || (target_X - piece_X === 2))){
                
                return true
            }
            else if(target_Y - piece_Y == -2 && ((piece_X - target_X === 2) || (target_X - piece_X === 2))){
                return true
            }
            
        }
    }
    return false
}
// checking if the king can jump 
function canKingJump(selectedPiece , isWhite){
    let piece_Y=parseInt(selectedPiece.id[0]);
    let piece_X = parseInt(selectedPiece.id[1]);

    if (piece_X > 1 && piece_X < 6){
        if(piece_Y > 1 && isWhiteKing(selectedPiece) && isWhite){
            if((boardMat[piece_Y -1][piece_X -1] === 2 || boardMat[piece_Y -1][piece_X -1] === 4) && boardMat[piece_Y-2][piece_X -2] === 0){
                return true
            }
            else if((boardMat[piece_Y -1][piece_X +1] === 2 || boardMat[piece_Y -1][piece_X +1] === 4) && boardMat[piece_Y -2][piece_X +2] === 0){
                return true
            }
        }
        else if( piece_Y < 6 && isBlackKing(selectedPiece) && !isWhite){
            if(boardMat[piece_Y +1][piece_X -1]%2 === 1 && boardMat[piece_Y +2][piece_X -2] === 0){
                return true
            }
            else if(boardMat[piece_Y +1][piece_X +1]%2 === 1 && boardMat[piece_Y +2][piece_X +2] === 0){
                return true
            }
        }
    }
    else if(piece_X <2){
        if(piece_Y > 1 && isWhite && isWhiteKing(selectedPiece)){
            if((boardMat[piece_Y -1][piece_X +1] === 2 || boardMat[piece_Y -1][piece_X +1] === 4)  && boardMat[piece_Y -2][piece_X +2] === 0){
                return true
            }
        }
        else if(piece_Y < 6 && !isWhite && isBlackKing(selectedPiece)){
            if(boardMat[piece_Y +1][piece_X +1]%2 === 1  && boardMat[piece_Y+2][piece_X +2] === 0){
                return true
            }
        }
    }
    else if(piece_X >5){
        if(piece_Y >1 && isWhite && isWhiteKing(selectedPiece)){
            if((boardMat[piece_Y -1][piece_X +1] === 2 || boardMat[piece_Y -1][piece_X +1] === 4) && boardMat[piece_Y -2][piece_X -2] === 0){
                return true
            }
        }
        else if(!isWhite && piece_Y < 6 && isBlackKing(selectedPiece)){
            if(boardMat[piece_Y +1][piece_X +1]%2 === 1  && boardMat[piece_Y +2][piece_X -2] === 0){
                return true
            }
        }
    }
    return false
}
// checking if the piece we have select can jump in case that there is jumping possibility 
function canPieceJump(selectedPiece,isWhite){
    
    let piece_Y=parseInt(selectedPiece.id[0]);
    let piece_X = parseInt(selectedPiece.id[1]);
    if(canKingJump(selectedPiece,isWhite)){
        return true
    }

    else if(piece_X > 1 && piece_X < 6 ){
        if(isWhite){
            if (piece_Y <6){
                if((boardMat[piece_Y +1][piece_X +1] === 2 || boardMat[piece_Y +1][piece_X +1] === 4) && boardMat[piece_Y+2][piece_X +2] === 0){
                    return true
                }
                else if((boardMat[piece_Y +1][piece_X -1] === 2 || boardMat[piece_Y +1][piece_X -1] === 4) && boardMat[piece_Y +2][piece_X -2] === 0){
                    return true
                }
            }
        }
        else{
            if(piece_Y > 1){
                if(boardMat[piece_Y -1][piece_X -1]%2 === 1 && boardMat[piece_Y -2][piece_X -2] === 0){
                    return true
                }
                else if(boardMat[piece_Y -1][piece_X +1]%2 === 1 && boardMat[piece_Y -2][piece_X +2] === 0){
                    return true
                }
            }
        }
    }
    else if(piece_X < 2){
        if(isWhite && piece_Y < 6){
            if((boardMat[piece_Y +1][piece_X +1] === 2 || boardMat[piece_Y +1][piece_X +1] === 4) && boardMat[piece_Y+2][piece_X +2] === 0){
                return true
            }
        }
        else if(!isWhite && piece_Y > 1){
            if(boardMat[piece_Y -1][piece_X +1]%2 === 1 && boardMat[piece_Y -2][piece_X +2] === 0){
                return true
            }
        }
    }
    else if(piece_X > 5){
        if(isWhite && piece_Y < 6){
            if((boardMat[piece_Y +1][piece_X -1] === 2 || boardMat[piece_Y +1][piece_X -1] === 4) && boardMat[piece_Y +2][piece_X -2] === 0){
                return true
            }
        }
        else if(!isWhite && piece_Y > 1){
            if(boardMat[piece_Y -1][piece_X -1]%2 === 1 && boardMat[piece_Y -2][piece_X -2] === 0){
                return true
            }
        }
    }
    
    return false

}
// checking if there is a jump possibility  
function canJumpAny(isWhite){
    for (let y=1 ; y<7 ; y++){
        for (let x=1 ; x<7 ; x++){
            if(isWhite){
                
                if(boardMat[y][x] === 2 || boardMat[y][x] === 4){
                    if(((boardMat[y-1][x-1] === 1 || boardMat[y-1][x-1] === 3) && boardMat[y+1][x+1] === 0) || ((boardMat[y-1][x+1] === 1 || boardMat[y-1][x+1] === 3) && boardMat[y+1][x-1] === 0)){
                        
                        return true;
                    }
                    else if((boardMat[y+1][x+1] === 3 && boardMat[y-1][x-1] === 0) || (boardMat[y+1][x-1] === 3 && boardMat[y-1][x+1] === 0 )){
                        
                        return true
                    }
                }
            }
            else{
                
                if(boardMat[y][x]%2 === 1){
                    if(((boardMat[y+1][x-1] === 2 || boardMat[y+1][x-1] === 4) && boardMat[y-1][x+1] === 0) || ((boardMat[y+1][x+1] === 2 || boardMat[y+1][x+1] === 4) && boardMat[y-1][x-1] === 0)){
                        
                        return true;
                    }
                    else if((boardMat[y-1][x-1] === 4 && boardMat[y+1][x+1] === 0) || (boardMat[y-1][x+1] === 4 && boardMat[y+1][x-1] === 0 )){
                        return true
                    }
                }
            }
        }
    }
    return false
}
// moving pieces 
function move(selectedPiece,e , isWhite){
    let piece_Y=parseInt(selectedPiece.id[0]);
    let piece_X = parseInt(selectedPiece.id[1]);
    let target_Y = parseInt(e.target.id[0]);
    let target_X = parseInt(e.target.id[1]);

    if(isWhite && target_Y === 7){
        selectedPiece.id = e.target.id +'K'
        selectedPiece.className = 'whiteKing'
        boardMat[piece_Y][piece_X] = 0
        boardMat[target_Y][target_X] = 3
        e.target.appendChild(selectedPiece);
    }
    else if(!isWhite && target_Y === 0){
        selectedPiece.id = e.target.id +'K'
        selectedPiece.className = 'blackKing'
        boardMat[piece_Y][piece_X] = 0
        boardMat[target_Y][target_X] = 4
        e.target.appendChild(selectedPiece);
    }
    else{
        selectedPiece.id = e.target.id +'C'
        boardMat[target_Y][target_X] = boardMat[piece_Y][piece_X]
        boardMat[piece_Y][piece_X] = 0
        e.target.appendChild(selectedPiece);
    }
    
    
}
// checking if the move is legal
function isLegalMove(selectedPiece,e , isWhite){
    let piece_Y=parseInt(selectedPiece.id[0]);
    let piece_X = parseInt(selectedPiece.id[1]);
    let target_Y = parseInt(e.target.id[0]);
    let target_X = parseInt(e.target.id[1]);
    
    

    if(isWhite){
        if(target_Y - piece_Y === 1 && (target_X - piece_X === 1 || piece_X - target_X === 1)){
            return true
        }
        else if(isWhiteKing(selectedPiece)){
            if(target_Y - piece_Y === 1 && (target_X - piece_X === 1 || piece_X - target_X === 1)){
                return true
            }
            else if(target_Y - piece_Y === -1 && (target_X - piece_X === 1 || piece_X - target_X === 1)){
                return true
            }
        }
    }
    else {
        if(target_Y - piece_Y === -1 && (target_X - piece_X === 1 || piece_X - target_X === 1)){
            
            return true
        }
        else if(isBlackKing(selectedPiece)){
            
            if(target_Y - piece_Y === 1 && (target_X - piece_X === 1 || piece_X - target_X === 1)){
                
                return true
            }
            else if(target_Y - piece_Y === -1 && (target_X - piece_X === 1 || piece_X - target_X === 1)){
                return true
            }
        }
    }
    return false
}
// checking if the target is black square and its empty 
function isLegalPlace(e){
    if (e.target.className === 'black'){
        return true
    }
    return false
}
// checking f the selected piece is a white king
function isWhiteKing(selectedPiece){
    let piece_Y=parseInt(selectedPiece.id[0]);
    let piece_X = parseInt(selectedPiece.id[1]);
    if (boardMat[piece_Y][piece_X] === 3){
        return true
    }
    return false
}
// checking f the selected piece is a black king
function isBlackKing(selectedPiece){
    let piece_Y=parseInt(selectedPiece.id[0]);
    let piece_X = parseInt(selectedPiece.id[1]);
    if (boardMat[piece_Y][piece_X] === 4){
        
        return true
    }
    return false
}
function resetGame(){
    document.getElementById('board').remove()
    const board = document.createElement('div')
    board.setAttribute('id','board')
    document.getElementById('body').appendChild(board)
}
init_board(boardMat);
