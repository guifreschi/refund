// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

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

// Adiciona um novo item na lista
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

    updateTotals()
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

// Atualiza os totais
function updateTotals() {
  try {
    // Recupera todos os itens da lista
    const items = expenseList.children
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
    
    // Variável para incrementar o total
    let total = 0

    // Percorre os itens da lista
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector('.expense-amount')
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      value = parseFloat(value)
      if (isNaN(value)) {
        return alert("Não foi possível calcular o total. O valor não parece ser um número.")
      }

      total += Number(value)
    }

    // Cria a small para adicionar o R$ formatado
    const sybolBRL = document.createElement('small')
    sybolBRL.textContent = "R$"

    // Formata o valor
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
    expensesTotal.innerHTML = ""
    expensesTotal.append(sybolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}

// Evento que captura o clique nos itens da lista 
expenseList.addEventListener("click", function(event){
  // Verifica se o elemento clicado é o ícone
  if (event.target.classList.contains("remove-icon")) {
    // Obtem a li pai do elemento clicado
    const item = event.target.closest(".expense")
    
    item.remove()
  }
  updateTotals()
})
