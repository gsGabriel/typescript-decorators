"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Classe genérica com operações simples de crud
var Operators = (function () {
    function Operators() {
        this.itens = new Array();
    }
    Operators.prototype.add = function (entity) {
        this.itens.push(entity);
    };
    Operators.prototype.remove = function (id) {
        this.itens.splice(id, 1);
    };
    Operators.prototype.getAll = function () {
        return this.itens;
    };
    return Operators;
}());
//Classe carrinho
var Cart = (function (_super) {
    __extends(Cart, _super);
    function Cart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cart.prototype.addItem = function (id, name) {
        this.add({ id: id, name: name });
    };
    __decorate([
        required,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String]),
        __metadata("design:returntype", void 0)
    ], Cart.prototype, "addItem", null);
    return Cart;
}(Operators));
//Implementação do decorators
function required(target, key, descriptor) {
    //Preserva o valor original do pai que chama o decorator
    var originalMethod = descriptor.value;
    //Atribui uma nova função a ser executada
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //Validação da obrigatoriedade de acordo com os argumentos passados
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var i = args_1[_a];
            switch (typeof i) {
                case 'number':
                    if (i === 0 || i === undefined)
                        throw new Error("the method " + key + " have a number required.");
                    break;
                case 'string':
                    if (i === '' || i === undefined)
                        throw new Error("the method " + key + " have a string required.");
                    break;
            }
        }
        //Executa a função do pai que chama o decorator
        var result = originalMethod.apply(this, args);
    };
    return descriptor;
}
//Teste que retorna um erro no console
var carrinho = new Cart();
carrinho.addItem(1, '');
