const total = document.querySelector('.total');
const list = document.querySelector('.list');
const amount = document.querySelector('#amount');
const custom = document.querySelector('#custom');
const calc = document.querySelector('#calc');

arr = [];
document.querySelectorAll('.tip').forEach((btn) => {
  btn.addEventListener('click',() => {
    custom.value = '';
  })
})
custom.addEventListener('click',() => {
  let selected = document.querySelector('input[name="tip"]:checked');
  if(selected){
    selected.checked = false;
  }
})
calc.addEventListener('click',() => {
  if(amount.value.trim() !== ''){
    let tip;
  let selected = document.querySelector('input[name="tip"]:checked');
  if(selected){
    tip = Number(selected.value) * Number(amount.value);
    selected.checked = false;
  }
  else tip = Number(custom.value)/100 * Number(amount.value);
  arr.push({bill : amount.value,total : Number(amount.value) + Number(tip) , tip : tip.toFixed(2)});
  localStorage.setItem('user',JSON.stringify(arr));
  custom.value = '';
  amount.value = '';
  display();
  }
})
function display(){
  let sum = '<p>Bill : 0</p><p>TIP : 0</p><p>TOTAL : 0</p>'
  let show = '';
  arr.forEach((obj) => {
    sum = `<p>Bill : ₹${obj.bill}</p><p>TIP : ₹${obj.tip}</p><p>TOTAL : ₹${obj.total}</p>`;
    show += `<tr><td>₹${obj.bill}</td><td>₹${obj.tip}</td><td>₹${obj.total}</td><td><button class="remove">X</button></td></tr>`;
  });
  list.innerHTML = show;
  total.innerHTML = sum;
  document.querySelectorAll('.remove').forEach((btn,index) => {
    btn.addEventListener("click",()=>{
      arr.splice(index,1);
      display();
      localStorage.setItem('user',JSON.stringify(arr));
    });
  });
}
window.onload = function(){
  let saved = localStorage.getItem('user');
  if(saved){
    arr = JSON.parse(saved);
    display();
  };
}