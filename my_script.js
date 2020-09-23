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


    self.calculateBTN = document.getElementById ('result');
    self.calc_condition = false;

    self.c_btn = document.getElementById ('c');
    self.ce_btn = document.getElementById ('ce');


    //     *****     event listners     *****

    for (let i = 0; i < self.btn_numbers.length; i++) {
        self.btn_numbers[i].addEventListener ('click', function (e) {
            //   ***   if after calculation button '=' was pressed numder button
            //   ***   use c_button function to clear all
            if (self.calc_condition) {
                c_button ();
                self.calc_condition = false;
            }


            //   ***   if the previous time one of the symbols was displayed in the
            //   ***   display field, then replaces it with itself, otherwise  it
            //   ***   is attached to the end of the expression shown on the display
            if (self.displayBlock.value === '0' || self.displayBlock.value === '/' || self.displayBlock.value === '*' || self.displayBlock.value === '-' || self.displayBlock.value === '+') {
                self.displayBlock.value = e.srcElement.textContent;
            }
            else {
                self.displayBlock.value += e.srcElement.textContent;
            }

        })
    }


    self.decimal.addEventListener ('click', function (e) {
        //    ***   disables the button if the point button was previously pressed and displayed
        if (self.displayBlock.value.indexOf ('.') === -1) {
            self.displayBlock.value += e.srcElement.textContent;
        }
    })


    for (let i = 0; i < self.operators.length; i++) {
        self.operators[i].addEventListener ('click', function (e) {
            //   ***   disables the button if the last dot is displayed on the 
            //   ***   display or the operator has already been pressed before
            if( !(self.displayBlock.value.lastIndexOf ('.') == (self.displayBlock.value.length - 1)) && (self.math_operator === '0')) {
                self.fist_digit = self.displayBlock.value;
                self.math_operator = e.srcElement.textContent;
                self.displayBlock.value = e.srcElement.textContent;

            }
        })
    }


    self.calculateBTN.addEventListener ('click', calculate_func);
    function calculate_func () {
        

        //   ***   check decimal position at digit

        let decimal_1st_num_size = 0, decimal_2st_num_size = 0, dot_size = 0;
        if ((+self.fist_digit.indexOf ('.')) !== -1) {
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

        }

        //   ***   this line prohibits double-clicking the operation button 
        self.math_operator = '0';

        //   *** chanche calculate condition
        self.calc_condition = true;
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