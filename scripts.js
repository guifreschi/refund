// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

// Seleciona os elementos da lista
const expenseList = document.querySelector('ul')

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "")

  // Transforma o valor em centavos
  value = Number(value) / 100

  amount.value = formatCurrencyBRL(value)
}

// Função para formatar o valor no padrão BRL
function formatCurrencyBRL(value){
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  return value
}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (e) => {
  e.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }

  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    // Cria elementos para adicionar na lista

    // li
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')

    // img
    const expenseIcon = document.createElement('img')
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // div
    const expenseInfo = document.createElement('div')
    expenseInfo.classList.add('expense-info')

    // strong
    const expenseName = document.createElement('strong')
    expenseName.textContent = newExpense.expense

    // span
    const expenseCategory = document.createElement('span')
    expenseCategory.textContent = newExpense.category_name

    // valor
    const expenseAmount = document.createElement('span')
    expenseAmount.classList.add('expense-amount')
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // botão de remover
    const removeIcon = document.createElement('img')
    removeIcon.setAttribute("src", "./img/remove.svg")
    removeIcon.setAttribute("alt", "remover")
    removeIcon.classList.add("remove-icon")

    expenseInfo.append(expenseName, expenseCategory)

    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
    expenseList.append(expenseItem)

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}
