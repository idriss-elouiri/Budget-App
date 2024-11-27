// select Element
const balanceEL = document.querySelector('.total-balance ');
const incomeTotalEl = document.querySelector('.total-income ');
const outcomeTotalEl = document.querySelector('.total-outcome');
const expenseEl = document.querySelector('.expense');
const incomeEl = document.querySelector('.income');
const allEl = document.querySelector('.all');
 // LIST 
let listExpense = document.querySelector('.expense .list') ;
let listIncome = document.querySelector('.income .list') ;
let listAll = document.querySelector('.all .list') ;
// Select Btn
const btnExpense = document.querySelector('.tab1');
const btnIncome = document.querySelector('.tab2');
const btnAll = document.querySelector('.tab3');
// Input Btn
const titleExpense = document.getElementById('title-expense');
const priceExpense = document.getElementById('price-expense');
const addExpense = document.getElementById('add-expense');

const titleIncome = document.getElementById('title-income');
const priceIncome = document.getElementById('price-income');
const addIncome = document.getElementById('add-income');
// create the variabales
let array ;
array = JSON.parse(localStorage.getItem('arr')) || [] ;
showData() ;
btnExpense.addEventListener("click" , () =>{
    show(expenseEl) ;
    hide([incomeEl , allEl]) ; 
    active(btnExpense) ;
    inactive([btnIncome , btnAll]) ;
})
btnIncome.addEventListener("click" , () =>{
    show(incomeEl) ;
    hide([expenseEl , allEl]) ; 
    active(btnIncome) ;
    inactive([btnExpense , btnAll]) ;
})
btnAll.addEventListener("click" , () =>{
    show(allEl) ;
    hide([incomeEl , expenseEl]) ; 
    active(btnAll) ;
    inactive([btnIncome , btnExpense]) ;
})

listExpense.addEventListener('click' ,deleteOrEdit) ;
listIncome.addEventListener('click' ,deleteOrEdit) ;
listAll.addEventListener('click' ,deleteOrEdit) ;
// delete or edit()
function deleteOrEdit(event){
    let targetBtn = event.target ;
    let li = targetBtn.parentNode ;
    if(targetBtn.classList == "close"){
        Delete(li)
    }else if(targetBtn.classList == "edit"){
        Edit(li) ;
    }
}
// DELETE FN
function Delete(li){
    array.splice(li.id , 1) ;
    showData() ;
}
// edit Fn
function Edit(li){
    let info = array[li.id] ;

    if(info.type == "income"){
        titleIncome.value = info.title ;
        priceIncome.value = info.price ; 
    }else if(info.type == "expense"){
        titleExpense.value = info.title ;
        priceExpense.value = info.price ;
    }
    Delete(li) ; 
}
addExpense.addEventListener('click' , () =>{
    if(!titleExpense || !priceExpense) return ;
   let expense = {
        type : "expense" ,
        title : titleExpense.value ,
        price : parseFloat(priceExpense.value)
    }
    array.push(expense) ;
    showData() ;
    clearInputs([titleExpense , priceExpense]) ;
})
addIncome.addEventListener('click' , () =>{
    if(!titleIncome || !priceIncome) return ;
   let income = {
        type : "income" ,
        title : titleIncome.value ,
        price : parseFloat(priceIncome.value)
    }
    array.push(income) ; 
    showData() ;
    clearInputs([titleIncome , priceIncome]) ;
})

//showData()
function showData(){
    let incomeTotal = calculateTotal("income" , array);
    let outcomeTotal = calculateTotal("expense" , array) ;
    let balance = Math.abs(calculateBalance(incomeTotal , outcomeTotal)) ;

    let sign = (incomeTotal >= outcomeTotal ) ? "$" : "-$" ;

    balanceEL.innerHTML = `
        <p>
        <span>${sign}</span>${balance}
        </p>    
        `   ; 
    incomeTotalEl.innerHTML = `
        <p>
            <span>$</span>${incomeTotal}
        </p>
        ` ;
        outcomeTotalEl.innerHTML = `
            <p>
                <span>$</span>${outcomeTotal}
            </p>
            `

    clearElements([listExpense , listIncome , listAll]) ;
    array.forEach((el , index) =>{
        if(el.type == 'income'){
            showElement(listIncome , el.title , el.price , index)
        }
        else if(el.type == 'expense'){
            showElement(listExpense , el.title , el.price , index)
        }
            showElement(listAll , el.title , el.price , index)
    })
localStorage.setItem('arr' , JSON.stringify(array)) ;
}

//showElement()
function showElement(list , title , price , id ){
    const List  = `
                    <li id = "${id}">
                        <div  class="entry">
                            <p>${title}:${price}</p>
                        </div>
                        <div class="edit"></div>
                        <div class="close"></div>
                    </li>
    `
    let position = "afterbegin" ;
    list.insertAdjacentHTML(position , List)

}

//clearElements()
function clearElements(elements){
    elements.forEach(element =>{
        element.innerHTML = '' ;
    })
}

//calculateTotal()
function calculateTotal(type , arr){
    let total = 0 ;
    arr.forEach(entry =>{
        if(entry.type == type){
            total = total + entry.price ;
        }
    })
    return total ;
}

// calculateBalance()
function calculateBalance(income , outcome){
    return income - outcome
}

//clearInputs()
function clearInputs(Inputs){
    Inputs.forEach(elements =>{
        elements.value = "" ;
    })
}

//show()
function show(element){
    element.classList.remove('hide');
}

//hide()
function hide(elements){
    elements.forEach(element => {
        element.classList.add('hide')
    });
}

//active
function active(element){
    element.classList.add('active')
}

//inactive
function inactive(elements){
    elements.forEach(element => {
        element.classList.remove('active')
    });
}