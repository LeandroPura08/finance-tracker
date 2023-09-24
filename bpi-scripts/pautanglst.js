
function showPautang(){
  let utangsToHTML = '';
  pautang.forEach((transaction)=>{
    id = transaction.id;
    date = transaction.date;
    amount = transaction.amount;
    description = transaction.description;

    utangsToHTML = utangsToHTML +
  `
  <div class="input-transaction">
      <div class="amount">${amount}</div>
      <div class="desc" >${description}</div>
      <div class="date">${date}</div>
      <div class="update-btn">
        <button class="updateMe" data-index="${id}">Update</button>
      </div>
  </div>
  `
  });
  document.querySelector('.pauts-list').innerHTML = utangsToHTML;
  updateButton();
  defaultPage();
}

document.querySelector('.pautang-button').addEventListener('click',()=>{
  if(value=== 'none' || value=== 'ShowingTranList'){
      value = 'showingPautang';
      document.querySelector('.tranlist-header').classList.remove("depo-header");
      document.querySelector('.tranlist-header').innerHTML='';
      document.querySelector('.tranlist-header').classList.add("pauts-header");

      arrowShowTransaction();
      arrowHidePautang();
      
      document.querySelector('.pauts-header').innerHTML = 
      `
      <div class="amount">Amount</div>
      <div class="desc">Description</div>
      <div class="date">Date</div>
      <div class="update-btn"></div>
      `;

      document.querySelector('.display-transaction').classList.remove("trans-list");
      document.querySelector('.display-transaction').innerHTML ='';
      document.querySelector('.display-transaction').classList.add("pauts-list");
      showPautang();
      tranButtonCss();
      
  }else if(value=== 'showingPautang'){
       value = 'none';

       arrowShowPautang();

       document.querySelector('.display-transaction').classList.remove("pauts-list");
       document.querySelector('.display-transaction').innerHTML ='';
       document.querySelector('.tranlist-header').classList.remove("pauts-header");
       document.querySelector('.tranlist-header').innerHTML='';
       tranButtonCss();
  }
})

function arrowShowPautang(){
  document.querySelector('.pautang-button').classList.remove("selected");
  document.querySelector('.pautang-button').innerHTML =
          `
          <img class="arrowbutton" src="/images/tags.png" alt="Arrow">
          <div class="textholder-pautang">
            <div>Show</div>
            <div>Pautang List</div>
          </div>
          `;
}

function arrowHidePautang(){
  document.querySelector('.pautang-button').classList.add("selected");
  document.querySelector('.pautang-button').innerHTML =
      `
            <img class="arrowbutton" src="/images/tagsblack.png" alt="Arrow">
            <div class="textholder-pautang">
              <div>Hide</div>
              <div>Pautang List</div>
            </div>
      `;
}



