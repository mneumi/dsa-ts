class LinkedListNode<T> {
    constructor(public data: T, public next: LinkedListNode<T>) {}
}

class LinkedList<T> {
    private readonly ELEMENT_NOT_FOUND: number = -1
    private readonly DEFAULT_CAPACITY: number = 10

    private _size: number
    private _first: LinkedListNode<T>

    constructor() {
        this._size = 0
        this._first = new LinkedListNode<T>(null as any, null as any)
    }

    size(): number {
        return this._size
    }

    isEmpty(): boolean {
        return this._size === 0
    }

    contains(elem: T): boolean {
        return this.indexOf(elem) !== this.ELEMENT_NOT_FOUND
    }

    add(elem: T): void {
        this.insert(this._size, elem)
    }

    clear(): void {
        this._first.next = null as any
        this._size = 0
    }

    indexOf(elem: T): number {
        let node = this._first.next
        
        for (let i=0; i<this._size; i++) {
            if (node.data === elem) {
                return i
            }
        }

        return -1
    }

    insert(index: number, elem: T): void {
        this.rangeCheck(index)

        const node = index === 0 ? this._first : this.nodeByIndex(index - 1)
        node.next = new LinkedListNode(elem, node.next)

        this._size++
    }

    get(index: number): T {
        return this.nodeByIndex(index).data
    }

    set(index: number, elem: T): T {
        const node = this.nodeByIndex(index)
        const oldValue = node.data
        node.data = elem

        return oldValue
    }

    remove(index: number): T {
        this.rangeCheck(index)

        const node = index === 0 ? this._first : this.nodeByIndex(index - 1)
        const oldNode = node.next
        node.next = oldNode.next
        this._size--
        
        return oldNode.data
    }

    toString(): string {
        const datas: T[] = []
        let node = this._first.next

        for (let i=0; i<this._size; i++) {
            datas.push(node.data)
            node = node.next
        }

        return `[${datas.join(", ")}]`
    }

    private nodeByIndex(index: number): LinkedListNode<T> {
        this.rangeCheck(index)

        let node = this._first.next
        for (let i=0; i<index; i++) {
            node = node.next
        }

        return node
    }

    private rangeCheck(index: number): void {
        if (index < 0 || index >= this._size) {
            console.log(`index ${index} out of range ${this._size}`)
            throw new RangeError()
        }
    }
}