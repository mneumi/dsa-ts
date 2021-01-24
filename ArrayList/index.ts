class ArrayList<T> {
    private readonly ELEMENT_NOT_FOUND: number = -1
    private readonly DEFAULT_CAPACITY: number = 10

    private _size: number
    private _elements: T[]

    constructor(capacity?: number) {
        if (!capacity || capacity < this.DEFAULT_CAPACITY) {
            capacity = this.DEFAULT_CAPACITY
        }

        this._elements = new Array<T>(capacity)
        this._size = 0
    }

    size(): number {
        return this._size
    }

    isEmpty(): boolean {
        return this._size === 0
    }

    get(index: number): T {
        this.rangeCheck(index)

        return this._elements[index]
    }

    set(index: number, elem: T): T {
        this.rangeCheck(index)

        const oldValue: T = this._elements[index]
        this._elements[index] = elem

        return oldValue
    }

    indexOf(elem: T): number {
        for (let i = 0; i < this._size; i++) {
            if (this._elements[i] === elem) {
                return i
            }
        }

        return this.ELEMENT_NOT_FOUND
    }

    contains(elem: T): boolean {
        return this.indexOf(elem) !== this.ELEMENT_NOT_FOUND
    }

    clear(): void {
        for (let i = 0; i < this._size; i++) {
            this._elements[i] = null as any
        }
        this._size = 0
    }

    add(elem: T): void {
        this.insert(this._size, elem)
    }

    insert(index: number, elem: T): void {
        this.rangeCheck(index, true)

        this.ensureCapacity(index)

        for (let i = this._size; i > index; i--) {
            this._elements[i] = this._elements[i-1]
        }
        this._elements[index] = elem
        this._size++
    }

    toString(): string {
        return `size: ${this._size}  [${this._elements.slice(0, this._size).join(", ")}]`
    }

    removeByIndex(index: number): T {
        this.rangeCheck(index)

        const oldValue: T = this._elements[index]
        for (let i = index + 1; i < this._size; i++) {
            this._elements[i-1] = this._elements[i]
        }
        this._elements[--this._size] = null as any
        this.shrinkCapacity()

        return oldValue
    }

    removeByElement(elem: T): number {
        const index = this.indexOf(elem)
        if (index < 0) {
            return index
        }
        this.removeByIndex(index)
        this.shrinkCapacity()

        return index
    }

    private ensureCapacity(targetCapacity: number): void {
        const currentCapacity = this._elements.length

        if (currentCapacity >= targetCapacity) {
            return
        }

        this.migrateElements(currentCapacity + (currentCapacity >> 1)) // 1.5
    }

    private shrinkCapacity() {
        const currentCapacity = this._elements.length
        
        if ((this._size >> 1) >= currentCapacity || currentCapacity <= this.DEFAULT_CAPACITY) {
            return
        }

        this.migrateElements(currentCapacity >> 1) // 0.5
    }

    private migrateElements(newCapacity: number) {
        const newElements = new Array(newCapacity)
        for (let i = 0; i < this._size; i++) {
            newElements[i] = this._elements[i]
        }
        this._elements = newElements
    }

    private rangeCheck(index: number, includeTail: boolean = false): void {
        const lastIndex = includeTail ? this._size + 1 : this._size

        if (index < 0 || index >= lastIndex) {
            console.log(`index ${index} out of range ${this._size}`)
            throw new RangeError()
        }
    }
}