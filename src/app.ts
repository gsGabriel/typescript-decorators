//Classe genérica com operações simples de crud
class Operators<T>{
    itens : T[];

    constructor(){
        this.itens = new Array<T>();
    }

    add(entity: T){
        this.itens.push(entity);
    }

    remove(id:number){
        this.itens.splice(id, 1);
    }

    getAll(){
        return this.itens;
    }
}

//Interface do item
interface Item{
    id: number,
    name: string
}

//Classe carrinho
class Cart extends Operators<Item>{
    @required
    addItem(id:number, name:string){
        this.add({id: id, name: name});
    }
}

//Implementação do decorators
function required(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>){

    //Preserva o valor original do pai que chama o decorator
    let originalMethod = descriptor.value;

    //Atribui uma nova função a ser executada
    descriptor.value = function(...args: any[]){
        //Validação da obrigatoriedade de acordo com os argumentos passados
        for (let i of args) {
            switch (typeof i) {
                case 'number':
                    if(i === 0 || i === undefined)
                        throw new Error("the method " + key + " have a number required.");
                    break;
                case 'string':
                    if(i === '' || i === undefined)
                        throw new Error("the method " + key + " have a string required.");
                    break;
            }  
         }

        //Executa a função do pai que chama o decorator
        let result = originalMethod.apply(this, args);
    }

    return descriptor;
}

//Teste que retorna um erro no console
let carrinho = new Cart();
carrinho.addItem(1, '');