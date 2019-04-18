function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('id01').style.display='none'
    const messageBox = document.querySelector('.chat-submit')
    const message = document.querySelector('#message')
    const form = document.querySelector('.gratitude-form')
    const userInput1 = document.querySelector('#input1')
    const userInput2 = document.querySelector('#input2')
    const userInput3 = document.querySelector('#input3')

    Entry.fetchAllEntries()

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const newChat = {
            date: getCurrentDate(),
            input1: userInput1.value,
            input2: userInput2.value,
            input3: userInput3.value
        }

        Entry.create(newChat)
        form.reset()
    })

    fetch('http://localhost:3000/entries')
    .then((res) => res.json())
    .then((entry) => {
       entry.forEach(newEntry => {
        let myEntry = new Entry('gratitude',newEntry.input1, newEntry.input2,newEntry.input3, newEntry.date)
        myEntry.render(newEntry.id)
       });
    })

    
   fetch('http://localhost:3000/chats')
    .then((res) => res.json())
    .then((messages)=>{
        messages.forEach(message =>{
            let newMess = new Chat(message.message)
        })
   })
   messageBox.addEventListener('click', (e) => {
        e.preventDefault()
        const newChat = {
            message: message.value
        }
         
        Chat.create(newChat)
        
    })
    //     var eventHandlers = {
    //         deleteAll: function() {
    //             myDiary.deleteAll();
    //             view.displayEntries()
    //         },

})