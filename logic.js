$(document).ready(function() {
    var multiDigit = '';
    var result = $("#result");
    var input = $("#input");
    var previousButt = '';

    var operators = [ "plus", "divide", "minus", "times", "power", "open-paran", "close-paran" ];
    
    var operation = [];

    $("button").on("click", function(event){

        var currButton = event.currentTarget.value;

        console.log(currButton);

        if((currButton === "open-paran" && previousButt === "open-paran") || (currButton === "open-paran" && previousButt === "close-paran")) {
            operation.push(currButton);
            input.append($("<h1>" + currButton + "</h1>"));
        }

        if((operators.includes(currButton) && previousButt === 'open-paran') || (currButton === 'close-paran' && operators.includes(previousButt)))
            return;

        if(currButton === 'clear')
            clear();
            
            
        else {
            

            if(operation.length === 1 && !operators.includes(currButton) && previousButt !== "open-paran") {
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

                operation.push(currButton);
                input.append($("<h1>" + currButton + "</h1>"));
            }
            
            else if(!operators.includes(currButton) && currButton !== "equals") {
                // console.log(multiDigit);
                if(input[0].lastChild && input[0].lastChild.innerText === multiDigit) {
                    $(input[0].lastChild).remove();
                }
                multiDigit += currButton;
                input.append($("<h1>" + multiDigit + "</h1>"));
            }
            
            if((currButton === "equals" && multiDigit !== '') ||currButton === "equals" && previousButt ==='close-paran') {
                input.append($("<h1>" + currButton + "</h1>"))
                if(!(multiDigit == '')) {
                    operation.push(parseInt(multiDigit));
                    multiDigit = '';
                }
                console.log(operation);
                result.text(equals(operation));
            }

            if(currButton !== 'equals')
                previousButt = currButton;
        }
    });

    function equals(subOp) {

        while(subOp.length > 1) {

            if(subOp.includes("open-paran"))
                for(var i = 0; i < subOp.length; i ++)

                    if(subOp[i] === "open-paran") {
                        var paranReplace = [];

                        paranReplace.push(equals(subOp.slice(i + 1, subOp.lastIndexOf("close-paran"))));

                        if(subOp[i-1] !== undefined && !operators.includes(subOp[i-1]))
                            paranReplace.unshift("times");

                        if((subOp.lastIndexOf("close-paran") < subOp.length - 1) && (!operators.includes(subOp[subOp.lastIndexOf("close-paran") + 1])))
                            paranReplace.push("times");

                            
                        subOp.splice(i, (subOp.lastIndexOf("close-paran") + 1) - i, );
                        
                        for(var j = paranReplace.length - 1; j >= 0; j--) {
                            subOp.splice(i, 0, paranReplace[j]);
                            }
                        }

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
        previousButt = '';
    }
    
    });