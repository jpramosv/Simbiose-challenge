class Produto {



    constructor() {
        this.id = 0;
        this.edit = null;
    }

    addProduct() {

        if (this.edit == null) {
            let produto = {}
            produto.name = document.getElementById('name').value;
            produto.valor = document.getElementById('valor').value;
            produto.qtd = document.getElementById('qtd').value;
            produto.id = this.id;
            if (this.validaCampos(produto)) {
                localStorage.setItem(this.id, JSON.stringify(produto));
                this.id++;
                this.limpaCampos();
                this.listProduct();
                alert("Produto adicionado com sucesso!")
            }

        } else {
            let produto = {}
            produto.name = document.getElementById('name').value;
            produto.valor = document.getElementById('valor').value;
            produto.qtd = document.getElementById('qtd').value;
            produto.id = this.edit;
            if (this.validaCampos(produto)) {
                localStorage.setItem(this.edit, JSON.stringify(produto));
                this.edit = null;
                document.getElementById('btn1').innerText = 'Adicionar';
                this.limpaCampos();
                this.listProduct();
                alert("Produto alterado com sucesso!")
            }
        }



    }


    editProduct(id) {
        document.getElementById('btn1').innerText = 'Atualizar';
        this.edit = id;

        for (let i = 0; i <= localStorage.length; i++) {

            if (localStorage.key(i) == id) {

                let item = JSON.parse(localStorage.getItem(localStorage.key(i)));

                document.getElementById('name').value = item.name;
                document.getElementById('valor').value = item.valor;
                document.getElementById('qtd').value = item.qtd;




            }

        }
    }

    deleteProduct(id) {
        let text = 'Confirma a exclusão do produto?'
        if (confirm(text) == true) {
            for (let i = 0; i <= localStorage.length; i++) {

                if (localStorage.key(i) == id) {
                    localStorage.removeItem(id);

                }
            }
        }

        alert('Produto deletado ');
        this.listProduct();

    }

    deleteAllProduct() {
        let text = 'Confirma a exclusão dos produtos?'
        if (confirm(text) == true) {
            localStorage.clear();
            alert('Todos produtos foram deletados')
            this.listProduct();

        }

    }

    listProduct() {
        let totalCarrinho = 0;
        let totalProduto = 0;
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            let tr = tbody.insertRow();
            let tdName = tr.insertCell();
            let tdQtd = tr.insertCell();
            let tdValor = tr.insertCell();
            let tdResponsavel = tr.insertCell();
            let tdEmail = tr.insertCell();
            let tdAction = tr.insertCell();
            let item = JSON.parse(localStorage.getItem(localStorage.key(i)));


            tdName.innerText = item.name;
            tdQtd.innerText = item.qtd;
            tdValor.innerText = 'R$ '+ item.valor;
            tdResponsavel.innerText = this.getApi().name.first;
            tdEmail.innerText = this.getApi().email;

            let imgPessoa = document.createElement('img');
            let imgEdit = document.createElement('img');
            let imgDelete = document.createElement('img');
            imgPessoa.src = this.getApi().picture.thumbnail;
            imgEdit.src = 'img/editar.png';
            imgDelete.src = 'img/excluir.png';
            imgDelete.setAttribute("onclick", "produto.deleteProduct(" + item.id + ")");
            imgEdit.setAttribute("onclick", "produto.editProduct(" + item.id + ")");
            tdAction.appendChild(imgEdit);
            tdAction.appendChild(imgDelete);
            tdResponsavel.appendChild(imgPessoa);

            totalProduto = item.qtd * parseInt(item.valor);

            totalCarrinho += totalProduto;




        }
        let tr = tbody.insertRow();
        let tdName = tr.insertCell();
        let tdValor = tr.insertCell();

        tdName.innerText = "Total";
        tdValor.innerText = totalCarrinho;

    }

    getApi() {
        let request = new XMLHttpRequest();
        request.open("GET", "https://randomuser.me/api/", false);
        request.send();
        let pessoas = JSON.parse(request.response);


        return pessoas.results[0];
    }

    getApiFetch() {

        const url = "https://randomuser.me/api/";
        fetch(url)
            .then(resp => resp.json())
            .then(pessoas => {
                console.log(pessoas.results[0].email);
            })
    }

    validaCampos(item) {

        let msg = '';

        if (item.name == '') {
            msg += 'Informe o nome do produto \n'
        } if (item.valor == '') {
            msg += 'Informe o valor do produto \n'
        } if (item.qtd == '') {
            msg += 'Informe a quantidade do produto'
        }
        if (msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    limpaCampos() {

        document.getElementById('name').value = '';
        document.getElementById('qtd').value = '';
        document.getElementById('valor').value = '';

    }


}

var produto = new Produto();

