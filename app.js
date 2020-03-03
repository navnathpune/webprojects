// book class: represent a book


class  Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI CLASS  handle ui tasks
class UI{
static displaybooks(){
    const books= store.getbooks();

//aboe array object are store in books variable


// varti je hardcoded books ghetlet te listitem mde add karnyasathi addbooklist method use keli ahe
books.forEach((book)=> UI.addbooklist(book));
}

static addbooklist(book){
    
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML =
    `<td> ${book.title}</td>
    <td> ${book.author}</td>
    <td> ${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
    list.appendChild(row);

    

 }
 static clearFields(){
     document.querySelector("#title").value="";
     document.querySelector("#author").value="";
     document.querySelector("#isbn").value="";
 }



 static showalert(message,classname){
     const div= document.createElement("div");
     div.className=`alert alert-${classname}`;
    div.appendChild(document.createTextNode(message));
     const container = document.querySelector(".container");
     const form =  document.querySelector("#book-form");
     container.insertBefore(div,form);
    //  disappear in 3 seconds
    setTimeout(()=> document.querySelector('.alert').remove(),3000);


    
}



 static deletebook(el){
     if(el.classList.contains('delete')){
         el.parentElement.parentElement.remove();
     }

 }
}


// display books:
document.addEventListener('DOMContentLoaded',UI.displaybooks)
///show successs mesage




// event to add a book
document.querySelector("#book-form").addEventListener('submit',(e)=>{
//prevent actual submit 
e.preventDefault();
    
    // get the values  from form
    const title =document.querySelector("#title").value;
    const author =document.querySelector("#author").value;
     const isbn =document.querySelector("#isbn").value;


  

    // validate
    if(title ==="" || author ==="" || isbn==="")
    {
        UI.showalert("please fill in the all fields",'danger');
    }
    else{ 
         // instantiated book from ui class
        const book  = new Book(title,author,isbn)
        console.log(book);
    
    
    
        // add book to UI
        UI.addbooklist(book);
    // addd book to store
    store.addbook(book);
1
    // remoe book from store   
    store.removebook(e.target.parentElement.previousElementSibling.textContent);


//addd book to store
 store.addbook(book);
        // clear fields
    
        UI.clearFields();
    


    }
    UI.showalert();
    UI.showalert("Book Added",'success');

})

//  remoe a book
document.querySelector("#book-list").addEventListener("click",(e)=>{
    UI.deletebook(e.target);
    UI.showalert("Book Removed",'success');


})



//store clas:  handle store

class store{
    static  getbooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
return books;
    }


  static  addbook(book)
    {
const books  = store.getbooks();
books.push(book);
localStorage.setItem('books',JSON.stringify(books));
    

}
    

static removebook(isbn){
                    const books = store.getbooks();
                    books.forEach((book,index) => {
                                    if(book.isbn === isbn)
                                {
                                         books.splice(index,1);

                                }
                            });
                            localStorage.setItem('books',JSON.stringify(books));
                        }
}


