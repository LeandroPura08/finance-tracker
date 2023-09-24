let value = 'none';

function tranButtonCss(){
  if(value === 1){
    document.querySelector('.pautang-button').classList.remove("chosen");
    document.querySelector('.tran-button').classList.add("chosen");
  }else if(value === 2){
    document.querySelector('.tran-button').classList.remove("chosen");
    document.querySelector('.pautang-button').classList.add("chosen");
  }else if(value === 0){
    document.querySelector('.tran-button').classList.remove("chosen");
    document.querySelector('.pautang-button').classList.remove("chosen");
  }

}

function updateTranlist(){
  let tranToHTML = '';
  deposit.forEach((transaction)=>{
    let show = 'Show Details'
    id = transaction.id;
    date = transaction.date;
    amount = transaction.amount;
    description = transaction.description;
    type = transaction.type;

    let otherTranHTML ='';

    transaction.otherTran.forEach((otherTran)=>{
    const othertype = otherTran.type;
    const otherdate = otherTran.date;
    const otheramount = otherTran.amount;
    const otherdescription = otherTran.description;

    if(othertype === 'Payment'){
      otherTranHTML = otherTranHTML + 
    `
    <div class="other-tran deposit">
        <div class="othertype">${othertype}</div>
        <div class="otheramount">${otheramount}</div>
        <div class="otherdescription">${otherdescription}</div>
        <div class="otherdate">${otherdate}</div>
    </div>
    `

    }else if(othertype === 'Pautang'){
      otherTranHTML = otherTranHTML + 
    `
    <div class="other-tran withraw">
        <div class="othertype">${othertype}</div>
        <div class="otheramount">${otheramount}</div>
        <div class="otherdescription">${otherdescription}</div>
        <div class="otherdate">${otherdate}</div>
    </div>
    `

    }
    })

  if(type === 'Deposit' || type === 'Payment'){
  tranToHTML = tranToHTML +
  ` 
  <div class="input-transaction deposit">
      <div class="type">${type}</div>
      <div class="amount">${amount}</div>
      <div class="desc" >${description}</div>
      <div class="date">${date}</div>
  </div>
  `}else if(type === 'Withraw'){
    tranToHTML = tranToHTML +
    ` 
  <div class="input-transaction withraw">
      <div class="type">${type}</div>
      <div class="amount">${amount}</div>
      <div class="desc" >${description}</div>
      <div class="date">${date}</div>
  </div>
  `
  }
  else if(type === 'Pautang'){
    tranToHTML = tranToHTML +
    ` 
  <div class="input-transaction withraw">
      <div class="type">${type}</div>
      <div class="amount">${amount}</div>
      <div class="desc" >${description}</div>
      <div class="date">
        <div>${date}</div>
        <div class="showOtherTran">
            <button class="otherTranButton" data-butid="${id}">
              <div class="dropdown" id="drp${id}">Show Details</div>
              <img class="burger" src="/images/burger.png" alt="">
            </button>
        </div>
      </div> 
  </div>
  <div class="other-tran-container" id="${id}">
  ${otherTranHTML}
 </div>
  `

  }

  });
    document.querySelector('.trans-list').innerHTML = tranToHTML;
    defaultPage();

    document.querySelectorAll('.otherTranButton').forEach((button)=>{
      let dropdown = true;
      button.addEventListener('click',()=>{
        
        if(dropdown===false){
          dropdown = true;
    
        }else if(dropdown === true){
          dropdown =false;

        }
        console.log(dropdown);
          deposit.forEach((selectedButton)=>{
            let buttonId = button.dataset.butid;


            
            if(selectedButton.id === buttonId){ 
              if(selectedButton.otherTran.length===0){
                alert("No Other Transaction Yet!");
              }else{
              let drp = document.getElementById(["drp"+buttonId]);
              let otherid = document.getElementById(buttonId);
              if(dropdown===false){
                  drp.innerHTML = "Hide Details";
                  otherid.classList.add("other-tran-container-selected");
              }else if(dropdown ===true){
                otherid.classList.remove("other-tran-container-selected"); 
                drp.innerHTML = "Show Details";
              } 
            }
            
            }

          })
 
      })
    })

  }
  
  



document.querySelector('.tran-button').addEventListener('click',()=>{
  if(value=== 'none' || value=== 'showingPautang'){
        value = 'ShowingTranList';
        document.querySelector('.display-transaction').classList.remove("pauts-list");
        document.querySelector('.display-transaction').innerHTML ='';
        document.querySelector('.display-transaction').classList.add("trans-list");

        arrowShowPautang();
        arrowHideTransaction();

        document.querySelector('.tranlist-header').classList.remove("pauts-header");
        document.querySelector('.tranlist-header').innerHTML='';
        document.querySelector('.tranlist-header').classList.add("depo-header");

        document.querySelector('.depo-header').innerHTML = 
          `
          <div class="typeheader">Type</div>
          <div class="amountheader" >Amount</div>
          <div class="descheader">Description</div>
          <div class="dateheader">Date</div>
          `;
        tranButtonCss();
        updateTranlist();
  }else if(value === 'ShowingTranList'){
        value = 'none';

        arrowShowTransaction();

        document.querySelector('.display-transaction').classList.remove("trans-list");
        document.querySelector('.display-transaction').innerHTML ='';
        document.querySelector('.tranlist-header').classList.remove("depo-header");
        document.querySelector('.tranlist-header').innerHTML='';
        tranButtonCss();
  
  }
  
})

function arrowShowTransaction(){
  document.querySelector('.tran-button').classList.remove("selected");
        document.querySelector('.tran-button').innerHTML =
        `
        <img class="arrowbutton" src="/images/tags.png" alt="Arrow">
          <div class="textholder-tran">
              <div>Show</div>
              <div>Transaction List</div>
            </div>
        `;
}

function arrowHideTransaction(){
  document.querySelector('.tran-button').classList.add("selected");
        document.querySelector('.tran-button').innerHTML =
        `
        <img class="arrowbutton" src="/images/tagsblack.png" alt="Arrow">
           <div class="textholder-tran">
              <div>Hide</div>
              <div>Transaction List</div>
            </div>
        `;
}