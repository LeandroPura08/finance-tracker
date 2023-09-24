

function updateButton(){
  document.querySelectorAll('.updateMe').forEach((updateButton)=>{
    updateButton.addEventListener('click',()=>{
      updateButton.classList.add("selectedButton");
      document.querySelector('.edit-pauts').classList.add("showPauts");
      let ind = updateButton.dataset.index;

      if(updateButton.innerHTML ==="Update"){
        if(document.querySelector('.edit-pauts').innerHTML === ""){
          updateButton.innerHTML ="Cancel";
          displayToUpdate(ind);
        }else{
          updateButton.classList.remove("selectedButton");
          alert("Cancel the Current Transaction!");
        }
      }else if(updateButton.innerHTML ==="Cancel"){
        document.querySelector('.edit-pauts').classList.remove("showPauts");
          updateButton.classList.remove("selectedButton");
          updateButton.innerHTML ="Update";
          document.querySelector('.edit-pauts').innerHTML = "";
      }
    })
  })
}

function displayToUpdate(ind){
  pautang.forEach((pautanglist)=>{
    if(pautanglist.id === ind){
      document.querySelector('.edit-pauts').innerHTML =
          `
          <div class="amountContainer">
             <div class="label">Amount :</div>
             <div class="outPut">${pautanglist.amount}</div>
          </div>
          <div class="descContainer">
             <div class="label">Description :</div>
             <div class="outPut">${pautanglist.description}</div>
          </div>
          <div class="buttonContainer">
              <div class="payContainer">
                 <button class="pay" data-pay="${ind}">Pay</button>
              </div>
              <div class="addContainer">
                 <button class="add">Add</button>
              </div>
          </div>
          `
    }
  })
  payButton(ind);
  addButton(ind);
}

function payButton(ind){
  document.querySelectorAll('.pay').forEach((payButton)=>{
    payButton.addEventListener('click',()=>{
      pautang.forEach((selectedItem)=>{
        if(selectedItem.id === ind){
          document.querySelector('.edit-pauts').innerHTML =
          `
          <div class="payingheader">Paying</div>
          <div class="amountContainer">
             <div class="label">Amount :</div>
             <div class="outPut">${selectedItem.amount}</div>
             <div class="updateType">-</div>
             <div class="chngAMntContainer">
              <input class="changeAmount">
            </div>
          </div>
          <div class="descContainer">
             <div class="label">Description :</div>
             <div class="outPut">${selectedItem.description}</div>
             <div class="updateType">-</div>
             <div class="chngAMntContainer">
              <input class="tranComment">
              </div>
          </div>
          <div class="buttonContainer">
              <div class="confirmContainer">
                 <button class="confirm" data-pay="${ind}">Confirm</button>
              </div>
              <div class="cancelContainer">
                 <button class="cancel">Cancel</button>
              </div>
          </div>
          `
        }
      })
      cancelButton(ind);
      confirmPayUpdate(ind);
    })
  })
}

function cancelButton(ind){
  document.querySelectorAll('.cancel').forEach((cancelButton)=>{
    cancelButton.addEventListener('click',()=>{
      displayToUpdate(ind);
    })
  })
}

function confirmPayUpdate(ind){
  document.querySelectorAll('.confirm').forEach((confirmPayButton)=>{
    confirmPayButton.addEventListener('click',()=>{
      const paymentAmount = Number(document.querySelector('.changeAmount').value);
      let tranComment = document.querySelector('.tranComment').value;
      let dateToday = new Date().toLocaleDateString("de-DE");
      let ids = Math.random() + dateToday + Math.random();
      
      let newUtang;

      if(!paymentAmount){
        alert("Fill the Field!");
      }else{
        pautang.forEach((selected,i)=>{
          let payDesc = tranComment;
          let trantype = 'Payment';

          if(selected.id === ind){
            if(paymentAmount > selected.amount){
              alert("Input amount is greater than Current utang");
            }else if(paymentAmount <= selected.amount){
              newUtang = selected.amount -paymentAmount;
              pautang[i].amount =newUtang;

              deposit.forEach((depoitem,j)=>{
                if(depoitem.id === selected.id){
                
                  deposit[j].otherTran.push(
                    {
                      id : ids,
                      type : trantype,
                      date : dateToday,
                      amount : paymentAmount,
                      description : payDesc
                    }
                  ) 
                }
              })
                mainBalance = mainBalance + paymentAmount;
              showPautang();

              setTimeout(function showthis(){
                document.querySelector('.edit-pauts').classList.remove("updatedTransaction");
                document.querySelector('.edit-pauts').innerHTML = "";
                document.querySelector('.edit-pauts').classList.remove("showPauts");
                
              },2000);
              document.querySelector('.edit-pauts').classList.add("updatedTransaction");
              document.querySelector('.updatedTransaction').innerHTML = `
              <div class="result">Transaction Completed!</div>
              `;
              defaultPage();
              saveALl();
            }
          }
        })
      }
    })
  })
}

function addButton(ind){
  document.querySelectorAll('.add').forEach((addButton)=>{
    addButton.addEventListener('click',()=>{
      pautang.forEach((selectedItem)=>{
        if(selectedItem.id === ind){
          document.querySelector('.edit-pauts').innerHTML =
          `
          <div class="payingheader">Paying</div>
          <div class="amountContainer">
             <div class="label">Amount :</div>
             <div class="outPut">${selectedItem.amount}</div>
             <div class="updateType">+</div>
             <div class="chngAMntContainer">
              <input class="changeAmount">
            </div>
          </div>
          <div class="descContainer">
             <div class="label">Description :</div>
             <div class="outPut">${selectedItem.description}</div>
             <div class="updateType">-</div>
             <div class="chngAMntContainer">
              <input class="tranComment">
             </div>
          </div>
          <div class="buttonContainer">
              <div class="confirmContainer">
                 <button class="confirm" data-pay="${ind}">Confirm</button>
              </div>
              <div class="cancelContainer">
                 <button class="cancel">Cancel</button>
              </div>
          </div>
          `
        }
      })
      cancelButton(ind);
      confirmAddUpdate(ind);
    })
  })
}

function confirmAddUpdate(ind){
  document.querySelectorAll('.confirm').forEach((confirmAddButton)=>{
    confirmAddButton.addEventListener('click',()=>{
      const addAmount = Number(document.querySelector('.changeAmount').value);
      let tranComment = document.querySelector('.tranComment').value;
      let dateToday = new Date().toLocaleDateString("de-DE");
      let ids = Math.random() + dateToday + Math.random();
      let newUtang;


      if(!addAmount){
        alert("Fill the Field!");
      }else{
        if(addAmount > mainBalance){
          alert("Not Enough Balance");
        }else{
          pautang.forEach((selected,i)=>{
            let addDesc = tranComment;
            let trantype = 'Pautang';


            if(selected.id === ind){
                newUtang = selected.amount + addAmount;
                pautang[i].amount = newUtang;

                deposit.forEach((depoitem,j)=>{
                  if(depoitem.id === selected.id){
                    deposit[j].otherTran.push(
                      {
                        id : ids,
                        type : trantype,
                        date : dateToday,
                        amount : addAmount * (-1),
                        description : addDesc
                      }
                    ) 
                  }
                });
                  mainBalance = mainBalance - addAmount;
                showPautang();
                document.querySelector('.edit-pauts').innerHTML = ""
                defaultPage();
                saveALl();
            }
          })
        }
      }
    })
  })
}