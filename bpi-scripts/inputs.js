
const deposit = JSON.parse(localStorage.getItem('deposit')) || [];
const pautang =JSON.parse(localStorage.getItem('pautang')) || [];
let mainBalance =JSON.parse(localStorage.getItem('mainBalance')) || 0;

function saveALl(){
  localStorage.setItem("deposit",JSON.stringify(deposit));
  localStorage.setItem("pautang",JSON.stringify(pautang));

  console.log(deposit);
}

function mainBalance1(){
  deposit.forEach((itemInside) => {
    let balance = Number(itemInside.amount);
    let balance1 = 0;
    if(!itemInside.otherTran){
    balance1 = 0;
    mainBalance = mainBalance + balance + balance1;
    }else{
      itemInside.otherTran.forEach((othertranvalue)=>{
        balance1 = balance1 + othertranvalue.amount;
       console.log(balance1);
      })
      mainBalance = mainBalance + balance + balance1;
    }
  });
  document.querySelector('.balance').innerHTML = `₱ ${mainBalance.toFixed(2)}`;
  }
mainBalance1();

document.querySelector('.submit-button').addEventListener('click',()=>{
  let trantype = document.getElementById("transaction").value;
  let inputdesc = document.querySelector('.item-desc').value;
  let dateToday = new Date().toLocaleDateString("de-DE");
  let ids = Math.random() + dateToday + Math.random();
  let tranAmount = Number(document.querySelector('.inputAmount').value);

  if (trantype === 'Select' || !tranAmount || !inputdesc){
    alert("Please Fill out the Fields!");
    return;
  }
  else if(trantype === 'Pautang'){
    if(tranAmount > mainBalance){
      alert("Not Enough Balance!");
      return;
    }else{
      tranAmount = tranAmount * (-1);
      if(value === 'none'){
        pautang.push({
          id : ids,
          date : dateToday,
          amount : tranAmount*(-1),
          description : inputdesc,
          otherTran :[]
          });
          pushValue();

      }else if(value === 'ShowingTranList'){
        pautang.push({
        id : ids,
        date : dateToday,
        amount : tranAmount *(-1),
        description : inputdesc,
        otherTran :[]
        });
        pushValue();
        updateTranlist();
    }else if(value=== 'showingPautang'){
      pushValue();
      pautang.push({
        id : ids,
        date : dateToday,
        amount : tranAmount *(-1),
        description : inputdesc,
        otherTran :[]
      });
      showPautang();
      }
      mainBalance = mainBalance + tranAmount;
    }
  }
  else if(trantype === 'Deposit'){
    if(value === 'none' || value === 'showingPautang'){
          pushValue();
      }else if(value=== 'ShowingTranList'){
        pushValue();
        updateTranlist();
      }
    mainBalance = mainBalance + tranAmount;
  }else if(trantype === 'Withraw'){
    if(tranAmount > mainBalance){
      alert("Not Enough Balance!");
      return;
    }else{
    tranAmount = tranAmount * (-1);
    if(value === 'none' || value === 'showingPautang'){
        pushValue();
    }else if(value=== 'ShowingTranList'){
      pushValue();
      updateTranlist();
    }
    mainBalance = mainBalance + tranAmount;
  }
  }
  
    function pushValue(){
      deposit.push({
      id : ids,
      type : trantype,
      date : dateToday,
      amount : tranAmount,
      description : inputdesc,
      otherTran :[]
      });
    }

    defaultPage();
});

function defaultPage(){
       document.getElementById("transaction").value = 'Select';
      document.querySelector('.inputAmount').value = '';
      document.querySelector('.item-desc').value ='';
     
      document.querySelector('.balance').innerHTML = `₱ ${mainBalance.toFixed(2)}`;
      saveALl();
}