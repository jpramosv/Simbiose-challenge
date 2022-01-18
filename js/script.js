class Produto{



    constructor(){
        this.id = 1;
    }

    addProduct(){        
        let produto = {}    
        produto.name = document.getElementById('name').value;
        produto.valor = document.getElementById('valor').value;
        produto.id = this.id;       
        localStorage.setItem(this.id, JSON.stringify(produto));  
        this.id ++;      
        this.listProduct();
        alert('Product added');
        
    }
 
    
    alterProduct(){
        alert('Product Altered');
    }

    deleteProduct(){
        alert('Product Deleted')
    }

    deleteAllProduct(){
        alert('Products Deleted')
    }

    listProduct(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
        for (let i = 1; i <= localStorage.length; i++) {            
            let tr = tbody.insertRow();

            let tdId = tr.insertCell();
            let tdName = tr.insertCell();
            let tdValor = tr.insertCell();
            let tdAction = tr.insertCell();            
            let item = JSON.parse(localStorage.getItem(i));
            
            
            tdId.innerText = item.id;
            tdName.innerText = item.name;            
            tdValor.innerText = item.valor;
            

        }
       
        
        
    }
}

var produto = new Produto();

