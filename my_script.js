'use strict'

window.onload = function () {
    console.log ('working!!!');

    //     *****     variables    *****
    
    let self = this;

    self.displayBlock = document.getElementById ('display');
    //console.log (parseFloat(self.displayBlock.value));

    self.btn_numbers = document.getElementsByClassName ('number');


    self.decimal = document.getElementById ('decimal');




    //     *****     event listners     *****

    for (let i = 0; i < this.btn_numbers.length; i++) {
        self.btn_numbers[i].addEventListener ('click', function (e) {

            if (self.displayBlock.value === '0') {
                self.displayBlock.value = e.srcElement.textContent;
            }
            else {
                self.displayBlock.value += e.srcElement.textContent;
                console.log (parseFloat(self.displayBlock.value));
            }

        })
    }

    self.decimal.addEventListener ('click', function (e) {
        if (self.displayBlock.value.indexOf ('.') === -1) {
            self.displayBlock.value += e.srcElement.textContent;
        }
    })
}