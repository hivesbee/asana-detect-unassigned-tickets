
const waitTargetElement = () => new Promise(resolve => {
  const intervalId = setInterval(() => {
    if (!document.querySelector('.ProjectPageToolbarHiddenChildrenWhenNoTasks-child:last-child')) {
      console.info('[ADUT] Searching Target element...')
      return
    }

    clearInterval(intervalId)
    resolve()
  }, 1000)
})

const createEl = () => {
  const el = document.createElement('div')
  el.className = 'ProjectPageToolbarHiddenChildrenWhenNoTasks-child'

  const labelEl = document.createElement('label')
  labelEl.id = 'adut_label'
  
  const checkboxEl = document.createElement('input')
  checkboxEl.id = 'adut_checkbox'
  checkboxEl.setAttribute('type', 'checkbox')
  checkboxEl.setAttribute('name','name')
  checkboxEl.onchange = toggleCondition

  labelEl.appendChild(checkboxEl)
  labelEl.appendChild(document.createTextNode('未アサインチケットを表示'))
  el.appendChild(labelEl)

  return el
}

const toggleCondition = (e) => {
  const els = document.querySelectorAll('.BoardColumnWithSortableTasks-sortableItemWrapper:has(.AvatarPhoto-image)')

  if (e.target.checked) {
    Array.from(els).map(({ style }) => { style.display = 'none' })
    console.info('[ADUT] Set filter conditions.')
  } else {
    Array.from(els).map(({ style }) => { style.display = 'block' })
    console.info('[ADUT] Release filter conditions.')
  }

}

const main = async () => {
  console.info('[ADUT] Start setting.')

  await waitTargetElement()
  console.info('[ADUT] Found target element')

  const el = createEl()
  console.info('[ADUT] Created Element.')

  const targetEl = document.querySelector('.PageToolbarStructure-leftChildren')
  targetEl.append(el)
  console.info('[ADUT] Appended Element.')

  console.info('[ADUT] Finish setting.')
}

window.addEventListener('load', main(), false)