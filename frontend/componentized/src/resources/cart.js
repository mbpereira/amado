
let cart = null

class Cart {

    constructor () {
        const stored = localStorage.getItem("cart")
        this._items = stored ? JSON.parse(stored).items : []
    }

    total () {
        let price = 0

        for(let item of this._items)
          price += Number(item.quantity || 0) * Number(item.price)
        
        return price
    }

    set(item){
        // verifica se o item existe e recupera sua posição no carrinho
        const index = this._items.findIndex(savedItem => Number(savedItem.id_stock) === Number(item.id_stock))
        // se existir, substitui; senão, guarda na lista
        if(index === -1)
            this._items.push(item)
        else
            this._items[index] = item

        this._save()
    }

    remove(id){
        this._items = this._items.filter(item => item.id_stock !== id)
        this._save()
    }

    clear(){
        this._items = []
        this._save()
    }

    show(id){
        return this._items.find(item => Number(item.id_stock) === Number(id))
    }

    all() {
        return this._items.slice()
    }

    _save(){
        localStorage.setItem("cart", JSON.stringify({ 
            items: this._items
        }))
    }
}

export default function getCart() {
    if(!cart)
        cart = new Cart()

    return cart
}