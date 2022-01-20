class Produto{



    constructor(){
        this.id = 0;
        this.edit = null;
    }

    addProduct(){ 
         
        if(this.edit==null){
            let produto = {}    
            produto.name = document.getElementById('name').value;
            produto.valor = document.getElementById('valor').value;
            produto.id = this.id;       
            localStorage.setItem(this.id, JSON.stringify(produto));  
            this.id ++;      
            this.listProduct();
        }else{
            let produto = {}    
            produto.name = document.getElementById('name').value;
            produto.valor = document.getElementById('valor').value;
            produto.id = this.edit;
            console.log(this.edit)
            localStorage.setItem(this.edit, JSON.stringify(produto)); 
            this.edit = null;
            document.getElementById('btn1').innerText = 'Adicionar';
            this.listProduct();
        }
        
  
        
    }
    
    
    editProduct(id){
        document.getElementById('btn1').innerText = 'Atualizar';
        this.edit = id;

        for(let i = 0; i<= localStorage.length; i++){
          
            if(localStorage.key(i) == id){

            let item = JSON.parse(localStorage.getItem( localStorage.key( i ) )) ;

            document.getElementById('name').value = item.name;
            document.getElementById('valor').value = item.valor;

            

                
            }
 
         }
    }

    deleteProduct(id){
        
        for(let i = 0; i<= localStorage.length; i++){
          
           if(localStorage.key(i) == id){
               localStorage.removeItem(id);
               
           }

        }
       
        alert('Product Deleted ' +id);
        this.listProduct();

    }

    deleteAllProduct(){
        localStorage.clear();
        this.listProduct();
        alert('All the Products are Deleted')
       
    }

    listProduct(){
        let totalCarrinho = 0;
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {    
            let tr = tbody.insertRow();
            let tdName = tr.insertCell();
            let tdValor = tr.insertCell();
            let tdAction = tr.insertCell();            
            let item = JSON.parse(localStorage.getItem( localStorage.key( i ) )) ;
            
            
            tdName.innerText = item.name;            
            tdValor.innerText = item.valor;

            let imgEdit = document.createElement('img');
            let imgDelete = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgDelete.src = 'img/excluir.png';
            imgDelete.setAttribute("onclick","produto.deleteProduct("+item.id+")");
            imgEdit.setAttribute("onclick","produto.editProduct("+item.id+")");
            tdAction.appendChild(imgEdit);
            tdAction.appendChild(imgDelete);

            
            totalCarrinho += parseInt(item.valor);   		          
            

            
        }
        let tr = tbody.insertRow();
            let tdName = tr.insertCell();
            let tdValor = tr.insertCell();
            
            tdName.innerText = "Total";            
            tdValor.innerText = totalCarrinho; 

            
        console.log(totalCarrinho);
       
        
        
    }
}

var produto = new Produto();

