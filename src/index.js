const btn_submit = document.getElementById('submit');
const table = document.getElementById('counter__table');
const form = document.getElementById('form');
const inputs_list = form.querySelectorAll('input[class = "field"]');

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

function addElement(){
  const fragment = new DocumentFragment();
  inputs_list.forEach( 
    field =>{
      let lbl = document.createElement('tag');
      lbl.innerText = field.value;
      field.value = '';
      fragment.appendChild(lbl)
    }
  );
  
  table.appendChild(fragment);
}

function manageField(event){
  debugger;
  event.preventDefault();//The event "click" ocurred on a btn inside a from, the web try to do a get (http method), so we need to prevent it.
  if(!emptyFields()){
    addElement();  
  }
}

function toggleEmptyClass(event){
  debugger;
  const input = event.target;
  if(input.tagName === 'INPUT'){
    input.classList.remove('field--empty');
  }
}


form.addEventListener('keydown', toggleEmptyClass)
btn_submit.addEventListener('click', manageField)