$(document).ready(function() {
    var multiDigit = '';
    var result = $("#result");
    var input = $("#input");
    var carryOver = false;

    var operators = [ "plus", "divide", "minus", "times", "power" ];
    
    var operation = [];

    $("button").on("click", function(event){

        var currButton = event.currentTarget.value;

        console.log(currButton);

        if(currButton === 'clear')
            clear();
            
            
        else {
            

            if(operation.length === 1 && !operators.includes(currButton)) {
                clear();
            }
            
            if(operators.includes(currButton)) {
                if(multiDigit === '' && operation.length === 1) {
                    input.empty();
                    result.empty();
                    input.append($("<h1>" + operation[0] + "</h1>"));
                }

                if (multiDigit !== '') {
                    operation.push(parseInt(multiDigit));
                    multiDigit = '';
                }

                operation.push(currButton);
                input.append($("<h1>" + currButton + "</h1>"));
            }
            
            else if(!operators.includes(currButton) && currButton !== "equals") {
                // console.log(multiDigit);
                if(input[0].lastChild && input[0].lastChild.innerText === multiDigit) {
                    console.log(input[0].lastChild)
                    $(input[0].lastChild).remove();
                }
                multiDigit += currButton;
                input.append($("<h1>" + multiDigit + "</h1>"));
            }
            
                
            if(currButton === "equals" && multiDigit !== '') {
                input.append($("<h1>" + currButton + "</h1>"))
                operation.push(parseInt(multiDigit));
                multiDigit = '';
                console.log(operation);
                result.text(equals(operation));
                carryOver = true;
            }

        }
    });

    function equals(opString) {
        subOp = opString;

        while(subOp.length > 1) {

            if(subOp.includes("power"))
                for(var i = 0; i < subOp.length; i ++)
                    if(subOp[i] === "power") {
                        subOp.splice(i - 1, 3, powerOf(subOp[i - 1], subOp[i + 1]));
                        break;
                    }
            
            if(subOp.includes("times"))
                for(var i = 0; i < subOp.length; i ++) {
                    if(subOp[i] === "times") {
                        subOp.splice(i - 1, 3, multiply(subOp[i - 1], subOp[i + 1]));
                        break;
                    }
                }


            if(subOp.includes("divide"))
                for(var i = 0; i < subOp.length; i ++)
                    if(subOp[i] === "divide") {
                        subOp.splice(i - 1, 3, divide(subOp[i - 1], subOp[i + 1]));
                        break;
                    }

            if(subOp.includes("plus"))
                for(var i = 0; i < subOp.length; i ++)
                    if(subOp[i] === "plus") {
                        subOp.splice(i - 1, 3, add(subOp[i - 1], subOp[i + 1]));
                        break;
                    }

            if(subOp.includes("minus"))
                for(var i = 0; i < subOp.length; i ++)
                    if(subOp[i] === "minus") {
                        subOp.splice(i - 1, 3, subtract(subOp[i - 1], subOp[i + 1]));
                        break;
                    }
        }
        console.log(subOp);
        return subOp[0];
    }

    function add(add1, add2) {
        return parseInt(add1) + parseInt(add2);
    }
    function multiply(factor1, factor2) {
        return parseInt(factor1) * parseInt(factor2);
    }

    function divide(dividend, divisor) {
        return parseInt(dividend) / parseInt(divisor);
    }

    function subtract(minuend, subtrahend) {
        return parseInt(minuend) - parseInt(subtrahend);
    }

    function powerOf(base, exponent) {
        return Math.pow(base, exponent);
    }

    function clear() {
        input.empty();
        result.empty();
        operation = [];
        carryOver = false;
    }
    
    });