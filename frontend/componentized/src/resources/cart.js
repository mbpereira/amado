
let cart = null

class Cart {

    constructor() {
        const stored = localStorage.getItem("cart")
        this._items = stored ? JSON.parse(stored).items : []
    }

    set(item){
        const index = this._items.findIndex(savedItem => savedItem.id_stock == item.id_stock)

        console.log(item)

        if(index === -1)
            this._items.push(item)
        else
            this._items[index] = item

        this._save()
    }

    remove(id){
        this._items = this._items.filter(item => item.id_stock != id)
        this._save()
    }

    clear(){
        this._items = []
        this._save()
    }

    show(id){
        return this._items.find(item => item.id_stock == id)
    }

    all() {
        return this._items
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