import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMemo, useState } from "react";
import { useLocalStorage } from "../../services/useStorage";
import styles from './ProductOptions.module.css'
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg";


export default function ProductOptions({ active, setActive, stock, name, price}) {
    const { isAuthenticated } = useAuth0();
    const [ cartLS, setCartLS ] = useLocalStorage('cart', [])
    const [ colorSelected, setColorSelected ] = useState('')
    const [ sizeSelected, setSizeSelected ] = useState('')
    const [ filterByColor, setFilterByColor ] = useState([])
    const [ filterBySize, setFilterBySize ] = useState([])
    const [ quantity, setQuantity ] = useState(1)

    let colors = []
    let sizes = []
    
    let stockFiltered = useMemo(() => {
        return [...filterByColor, ...filterBySize]
    }, [filterByColor, filterBySize])

    let sizesFiltered = useMemo(() => {
        return filterByColor.map(el => el.Size?.name)
    }, [filterByColor])

    let colorsFiltered = useMemo(() => {
        return filterBySize.map(el => el.MainColor?.name)
    }, [filterBySize])
    
    let idStockSelected = useMemo(() => {
        if(colorSelected.length !== 0 && sizeSelected.length !== 0) {
            return stockFiltered.find(el => el.MainColor.name === colorSelected && el.Size?.name === sizeSelected)
        } else return {}
    }, [sizeSelected, colorSelected])


    stock.forEach(el => {
        if(sizes.length === 0) sizes.push(el.Size?.name)
        if(colors.length === 0) colors.push(el.MainColor?.name)
        if(!colors?.includes(el.MainColor?.name)) colors.push(el.MainColor?.name)
        if(!sizes?.includes(el.Size?.name)) sizes.push(el.Size?.name)
    })

    sizes.sort((a, b) => a - b)

    function colorOptions(e, color){
        console.log(e.target.value)
        e.preventDefault()
        if(colorSelected !== color){ 
        setColorSelected(color)
        setFilterByColor(stock.filter(el => el.MainColor.name === color))
        } else {
            setColorSelected('')
            setFilterByColor([])
        }
    }

    function sizeOptions(e){
        e.preventDefault()
        if(sizeSelected !== e.target.value){ 
            setSizeSelected(e.target.value)
            setFilterBySize(stock.filter(el => el.Size?.name === e.target.value))
        } else {
            setSizeSelected('')
            setFilterBySize([])
        }
    }

    let addQuantity = (e) => {
        e.preventDefault()
        if(quantity < idStockSelected.stock_product) setQuantity(quantity + 1);
        else return;
    }

    let deleteQuantity = (e) => {
        if(quantity > 1) setQuantity(quantity - 1);
        else return;
    }

    async function addProductToCart() {
        if(isAuthenticated){
            try {
                await axios.post(`http://localhost:3001/line_cart/${idStockSelected.id}?quantity=${quantity}`)
                setActive(!active)
            } catch(err){
                console.log(err)
            }
        } else {
            let validateCart = cartLS.find(el => el.id === idStockSelected.id) 
            console.log(validateCart)
            if(validateCart) return;
            else {
            setCartLS([...cartLS, {
                ...idStockSelected,
                quantity: quantity,
                name: name,
                price: price
            }])
            setActive(!active)
            }
        }
    }

    let spanQuantity = useMemo(() => {
        return <span>{quantity}</span>
    }, [quantity])

    console.log(idStockSelected)

    return (
        <> 
            {
                active &&
                <div className={styles.modalContainer}>
                    <div className={styles.divColor}>
                        {colors?.map(color => {
                            let codeColor = stock.find(el => el.MainColor.name === color)
                            return (
                                <button 
                                className={
                                    colorsFiltered.length === 0 ? styles.stockColor :
                                    colorsFiltered?.includes(color) ? styles.stockColor : styles.noStockColor}
                                onClick={
                                    colorsFiltered.length === 0 ? (e) => colorOptions(e, color) :
                                    colorsFiltered?.includes(color) ? (e) => colorOptions(e, color) : undefined}
                                value={color}
                                >
                                    <span
                                    className={styles.buttonColor}
                                    style={{background: codeColor.MainColor.code}}
                                    value={color}
                                    ></span>
                                </button>
                            )
                        })}
                    </div>
                    <div className={styles.divSize}>
                        {sizes?.map(size => {
                            return (
                                <button
                                className={sizesFiltered.length === 0 ? styles.stockSize :
                                    sizesFiltered?.includes(size) ? styles.stockSize : styles.noStockSize}
                                value={size}
                                onClick={
                                    sizesFiltered.length === 0 ? sizeOptions :
                                    sizesFiltered?.includes(size) ? sizeOptions : undefined }
                                >{size}</button>
                            )
                        })}
                    </div>
                    <div>
                        <button className={styles.btnQuantity} onClick={deleteQuantity}><CgChevronDoubleLeft/></button>
                        {spanQuantity}
                        <button className={styles.btnQuantity} onClick={addQuantity}><CgChevronDoubleRight/></button>
                    </div>
                    <button className={styles.addButton}
                    onClick={idStockSelected.id ? addProductToCart : undefined}
                    >Añadir al carrito</button>
                </div>
                }
            </>
        )
}