var PrintUtils = {

    printMatrix: function (matrix) {
        console.log('-------------matrix start--------------');
        for (var i = 0; i < matrix.length; i++) {
            var row = '';
            for (var j = 0; j < matrix[0].length; j++) {
                row += matrix[i][j] + ' ';
            }
            
            console.log(row);
        }
        console.log('-------------matrix end--------------');
    },

    printColInMatrix: function (matrix, col) {
        console.log('-------------matrix start--------------');
        var row = '';
        
        for (var i = 0; i < matrix.length; i++) {
            
            for (var j = 0; j < matrix[0].length; j++) {
                if (j === col) row += matrix[i][j] + ', ';
            }
            
        }
        console.log(row);
        console.log('-------------matrix end--------------');
    },
}

module.exports = PrintUtils;