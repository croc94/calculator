'use strict'

window.onload = function () {
    console.log ('working!!!');

    //     *****     variables    *****
    
    let self = this;

    self.displayBlock = document.getElementById ('display');
    self.fist_digit = 0;

    self.btn_numbers = document.getElementsByClassName ('number');


    self.decimal = document.getElementById ('decimal');


    self.operators = document.getElementsByClassName ('operator');
    self.math_operator = '0';
    self.negative_marker = false;


    self.calculateBTN = document.getElementById ('result');
    self.calc_condition = false;

    self.c_btn = document.getElementById ('c');
    self.ce_btn = document.getElementById ('ce');


    //     *****     event listners     *****

    for (let i = 0; i < self.btn_numbers.length; i++) {
        self.btn_numbers[i].addEventListener ('click', function (e) {
            add_numbers (e);
        })
    }
    function add_numbers (event) {
        //   ***   if the previous time one of the symbols was displayed in the
            //   ***   display field, then replaces it with itself, otherwise  it
            //   ***   is attached to the end of the expression shown on the display
            if (self.negative_marker !== false) {
                self.displayBlock.value = '-' + event.srcElement.textContent;
                self.negative_marker = false;
                return
            }

            if (self.displayBlock.value === '0' || self.displayBlock.value === '/' || self.displayBlock.value === '*' || self.displayBlock.value === '-' || self.displayBlock.value === '+' || displayBlock.value === '√' || displayBlock.value === 'pow') {
                self.displayBlock.value = event.srcElement.textContent;
            }
            else {
                self.displayBlock.value += event.srcElement.textContent;
            }
    }


    self.decimal.addEventListener ('click', function (e) {
        //    ***   disables the button if the point button was previously pressed and displayed
        if (self.displayBlock.value.indexOf ('.') === -1) {
            self.displayBlock.value += e.srcElement.textContent;
        }
    })


    for (let i = 0; i < self.operators.length; i++) {
        self.operators[i].addEventListener ('click', function (e) {
            /* if there is a number on the display, and it is not equal to 0 or not math 
            operator, then this is an operator and you need to call the operator_func function 
            */
            if ((typeof parseFloat(self.displayBlock.value) === 'number') && (parseFloat(self.displayBlock.value) !== 0) && (self.displayBlock.value !== '/') && (self.displayBlock.value !== '*') && (self.displayBlock.value !== '-') && (self.displayBlock.value !== '+') && (self.displayBlock.value !== '√') && (self.displayBlock.value !== 'pow')) {
                operator_func (e);
            } else if ((parseFloat(self.displayBlock.value) === 0) || ((self.displayBlock.value === '/')  || (self.displayBlock.value === '*') || (self.displayBlock.value === '-') || (self.displayBlock.value === '+') || (self.displayBlock.value === '√') || (self.displayBlock.value === 'pow')) && (e.srcElement.textContent === '-')){
                /* otherwise, if the line contains the number 0, or a mathematical operator,
                 and if a minus was pressed and there is nothing else in the line, then this 
                 is a negative number, and you just need to add a minus sign to the line 
                 */
                self.displayBlock.value = e.srcElement.textContent;
                self.negative_marker = true;
            }
        })
    }
    function operator_func (event) {
            // если переменная self.math_operator = '0'; не ноль, а знак, и был нажат новый знак, то посчитать
            if (self.math_operator !== '0') {
                calculate_func ();
            }
            //   ***   disables the button if the last dot is displayed on the 
            //   ***   display or the operator has already been pressed before
            if( !(self.displayBlock.value.lastIndexOf ('.') == (self.displayBlock.value.length - 1)) && (self.math_operator === '0')) {
                self.fist_digit = self.displayBlock.value;
                self.math_operator = event.srcElement.textContent;
                self.displayBlock.value = event.srcElement.textContent;

                //if was choosed √ operator, calculate immediately
                if (self.displayBlock.value === '√') {
                    calculate_func ();
                }
            }
    }


    self.calculateBTN.addEventListener ('click', calculate_func);
    function calculate_func () {
        

        //   ***   check decimal position at digit

        let decimal_1st_num_size = 0, decimal_2st_num_size = 0, dot_size = 0;
        if (self.fist_digit.toString ().indexOf ('.') !== -1) {
            decimal_1st_num_size = self.fist_digit.length -1 - (+self.fist_digit.indexOf ('.'));
        }
        if (self.displayBlock.value.indexOf ('.') !== -1){
            decimal_2st_num_size = self.displayBlock.value.length -1 - (+self.displayBlock.value.indexOf ('.'));

        }

        //    **** choose math operator

        switch (self.math_operator) {
            //   ***   dot_size defines how many decimal places there will be in the expression
            case '+':
                if (decimal_1st_num_size || decimal_2st_num_size) {
                    dot_size = (decimal_1st_num_size > decimal_2st_num_size) ? decimal_1st_num_size : decimal_2st_num_size;
                }
                self.displayBlock.value = (parseFloat (self.fist_digit) + parseFloat (self.displayBlock.value)).toFixed (dot_size);
                break;
            case '-':
                if (decimal_1st_num_size || decimal_2st_num_size) {
                    dot_size = (decimal_1st_num_size > decimal_2st_num_size) ? decimal_1st_num_size : decimal_2st_num_size;
                }
                self.displayBlock.value = (self.fist_digit - self.displayBlock.value).toFixed (dot_size);
                break;
            case '*':
                dot_size = (decimal_1st_num_size && decimal_2st_num_size) ? decimal_1st_num_size + decimal_2st_num_size : decimal_1st_num_size ? decimal_1st_num_size : decimal_2st_num_size;
                self.displayBlock.value = (self.fist_digit * self.displayBlock.value).toFixed (dot_size);
                break;
            case '/':
                self.displayBlock.value = self.fist_digit / self.displayBlock.value;
                break;
            case '√':
                //if number negative break
                if (self.fist_digit < 0) {
                    self.displayBlock.value = 'not correct';
                    setTimeout(time_func, 1000);
                    function time_func () {
                        self.displayBlock.value = '0';
                    }
                    break;
                }
                self.displayBlock.value = Math.sqrt (self.fist_digit);
                break;
            case 'pow':
                if (self.displayBlock.value === 'pow') {
                    self.displayBlock.value = 1;
                }
                self.displayBlock.value = Math.pow (self.fist_digit, self.displayBlock.value);
                break;

        }

        //   ***   this line prohibits double-clicking the operation button 
        self.math_operator = '0';

        //   *** chanche calculate condition
        self.calc_condition = true;

        //   ***   self.negative_marker condition
        self.negative_marker = false;
    }


    self.c_btn.addEventListener ('click', c_button);
    function c_button () {
        //   ***   delete all data buttons
        self.fist_digit = 0;
        self.math_operator = '0';
        self.displayBlock.value = 0;
    }

    

    self.ce_btn.addEventListener ('click', function (e) {
        //   ***   delete only the last data button
        self.displayBlock.value = 0;
    })

}