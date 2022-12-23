const list = document.querySelectorAll('.list')
const button = document.querySelector('.button')
document.addEventListener('dblclick', e=>{
    if (e.target.classList.contains('desks_item') && !e.target.classList.contains('start-board')){
        e.target.remove();
    }
    else if (e.target.parentElement.classList.contains('desks_item') && !e.target.parentElement.classList.contains('start-board')){
        e.target.parentElement.remove();
    }
});

function addTask() {
    const btn = document.querySelector('.add_btn')
    const addBtn = document.querySelector('.add_item-btn')
    const cancelBtn = document.querySelector('.cancel_item-btn')
    const textarea = document.querySelector('.textarea')
    const form = document.querySelector('.form')

    let value

    btn.addEventListener('click', () => {
        form.style.display = 'block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'

        textarea.addEventListener('input', e => {
            value = e.target.value

            if (value) {
                addBtn.style.display = 'block'
            }
            else {
                addBtn.style.display = 'none'
            }
        })

    })

    cancelBtn.addEventListener('click', () => {
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex '
    })

    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('div')
        newItem.classList.add('list_item')
        newItem.draggable = true
        newItem.textContent = value
        list[0].append(newItem)

        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex '

        dragNdrop()
    })

}
addTask()

function addBoard() {
    const desks = document.querySelector('.desks')
    const desk = document.createElement('div')
    desk.classList.add('desks_item')
    desk.innerHTML = `
    <span contenteditable="true" class="title">Введите название</span>
    <div class="list"></div>
    `
    desks.append(desk)

    changeTitle()
    dragNdrop()
}
button.addEventListener('click', addBoard)

function changeTitle() {
    const titles = document.querySelectorAll('.title')

    titles.forEach(title => {
        title.addEventListener('click', e => e.target.textContent = '')
    })
}
changeTitle()


let draggedItem = null

function dragNdrop() {
    const listItems = document.querySelectorAll('.list_item')
    const lists = document.querySelectorAll('.list')

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i]

        item.addEventListener('dragstart', () => {
            draggedItem = item
            setTimeout(() => {
                item.style.display = 'none'
            }, 0)
        })

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block'
                draggedItem = null
            }, 0)
        })

        item.addEventListener('dblclick', () => {
            item.remove()
        })

        for(let j = 0; j < lists.length; j++){
            const list = lists[j]

            list.addEventListener('dragover', e => e.preventDefault())

            list.addEventListener('dragenter', function (e){
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0, .3)'
            })

            list.addEventListener('dragleave', function(e){
                this.style.backgroundColor = 'rgba(0,0,0, 0)'
            })

            list.addEventListener('drop', function(e){
                this.style.backgroundColor = 'rgba(0,0,0, 0)'
                this.append(draggedItem)
            })
        }
    }
}
dragNdrop()


