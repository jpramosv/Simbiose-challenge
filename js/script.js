class Produto{



    constructor(){
        this.id = 0;
    }

    addProduct(){        
        let produto = {}    
        produto.name = document.getElementById('name').value;
        produto.valor = document.getElementById('valor').value;
        produto.id = this.id;       
        localStorage.setItem(this.id, JSON.stringify(produto));  
        this.id ++;      
        this.listProduct();
  
        
    }
 
    
    alterProduct(){
                alert('Product Altered');
    }

    deleteProduct(id){
        debugger;
        for(let i = 0; i<= localStorage.length; i++){
          
           if(localStorage.key(i) == id){
               localStorage.removeItem(id);
               
           }

        }
       
        alert('Product Deleted ' +id);
        this.listProduct();

    }

    deleteAllProduct(){
        alert('Products Deleted')
       
    }

    listProduct(){
        debugger;
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {    
            let tr = tbody.insertRow();
            let tdId = tr.insertCell();
            let tdName = tr.insertCell();
            let tdValor = tr.insertCell();
            let tdAction = tr.insertCell();            
            let item = JSON.parse(localStorage.getItem( localStorage.key( i ) )) ;
            
            
            tdId.innerText = item.id;
            tdName.innerText = item.name;            
            tdValor.innerText = item.valor;

            let imgEdit = document.createElement('img');
            let imgDelete = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgDelete.src = 'img/excluir.png';
            imgDelete.setAttribute("onclick","produto.deleteProduct("+item.id+")");

            tdAction.appendChild(imgEdit);
            tdAction.appendChild(imgDelete);

            
            

        }
       
        
        
    }
}

var produto = new Produto();

