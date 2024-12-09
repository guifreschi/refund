// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

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
}
