const btn_submit = document.getElementById('submit');
const table = document.getElementById('counter__table');
const form = document.getElementById('form');
const inputs_list = Array.from(form.querySelectorAll('input[class = "field"]'));
const register = [];



function emptyFields(){
  let isEnyEmpty = false
  inputs_list.forEach(
    (field) => {
      //let noSpaces =field.textContent.replace(/\s+/g,'')
      if( field.value === ''){
        isEnyEmpty = true;
        field.classList.add('field--empty');
      }
    }
  )
  return isEnyEmpty;
}

function addRegister(){
  const newResgister = {
    description: inputs_list[0].value,
    calories: numericInput(inputs_list[1].value),
    carbs: numericInput(inputs_list[2].value),
    protein: numericInput(inputs_list[3].value)
  }
  register.push(newResgister);
}

function numericInput(value){
  let parseValue = parseInt(value);
  if(isNaN(parseValue)){
    throw Error ('Incorrect input values, number required')
  }
  else{
    return parseValue
  }
}

function showRegister(){
  const fragment = new DocumentFragment();
  let i = 0;
  inputs_list.forEach( 
    input =>{
      createHTMLElement(fragment, input);
      resetInputValue(i++);
    }
  );
  table.appendChild(fragment);
}

function createHTMLElement(fragment, input){
  let lbl = document.createElement('tag');
  lbl.innerText = input.value;
  fragment.appendChild(lbl)
}

function resetInputValue(index){
  inputs_list[index].value = '';
}

function manageField(event){
  try {
    event.preventDefault();//The event "click" ocurred on a btn inside a from, the web try to do a get (http method), so we need to prevent it.
    if(!emptyFields()){
      addRegister();
      console.log(register);
      showRegister();  
    }
  } catch (error) {
    alert(error)
  }
  
}

function getValueInputs(){
  const values = inputs_list.map(input => input.value);
  return values;
}

function toggleEmptyClass(event){
  const input = event.target;
  if(input.tagName === 'INPUT'){
    input.classList.remove('field--empty');
  }
}

form.addEventListener('keydown', toggleEmptyClass)
btn_submit.addEventListener('click', manageField)