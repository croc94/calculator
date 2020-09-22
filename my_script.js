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
    self.math_operator = 0;


    self.calculateBTN = document.getElementById ('result');


    //     *****     event listners     *****

    for (let i = 0; i < self.btn_numbers.length; i++) {
        self.btn_numbers[i].addEventListener ('click', function (e) {

            if (self.displayBlock.value === '0' || self.displayBlock.value === '/' || self.displayBlock.value === '*' || self.displayBlock.value === '-' || self.displayBlock.value === '+') {
                self.displayBlock.value = e.srcElement.textContent;
            }
            else {
                self.displayBlock.value += e.srcElement.textContent;
            }

        })
    }


    self.decimal.addEventListener ('click', function (e) {
        if (self.displayBlock.value.indexOf ('.') === -1) {
            self.displayBlock.value += e.srcElement.textContent;
        }
    })


    for (let i = 0; i < self.operators.length; i++) {
        self.operators[i].addEventListener ('click', function (e) {

            if( !(self.displayBlock.value.lastIndexOf ('.') == (self.displayBlock.value.length - 1))) {
                self.fist_digit = self.displayBlock.value;
                self.math_operator = e.srcElement.textContent;
                self.displayBlock.value = e.srcElement.textContent;

            }
        })
    }


    self.calculateBTN.addEventListener ('click', function (e) {

        //   ***   check decimal position

        let decimal_1st_num_size, decimal_2st_num_size, dot_size = 0;

        if (self.fist_digit.indexOf ('.') !== -1) {
            decimal_1st_num_size = self.fist_digit.length -1 - (+self.fist_digit.indexOf ('.'));
        }
        if (self.displayBlock.value.indexOf ('.') !== -1){
            decimal_2st_num_size = self.displayBlock.value.length -1 - (+self.displayBlock.value.indexOf ('.'));

        }

        //    **** choose math operator

        switch (self.math_operator) {
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

        }
    })
}