"use client"
import React from "react"
import { useState,useEffect } from "react"
import { collection, addDoc, getDoc, QuerySnapshot, onSnapshot, queryEqual,query,deleteDoc,doc} from "firebase/firestore";
import { db } from "./firebase";


export default function Home() {
  const [items,setItems] = useState([
    // {
    //   name:"coffee",
    //   price: 4.99
    // },
    // {
    //   name:"Movie",
    //   price: 25
    // },
    // {
    //   name:"Candy",
    //   price: 7.95
    // }
  ])
  
  const [newItem,setNewItem] = useState({name: '',price: ''})

  //Add items to database 
  const addItem = async (e) => {
    e.preventDefault()  
    if (newItem.name !== '' && newItem.price !== ''){
      //setItems([...items, newItem])
      await addDoc(collection(db,'items'),{
      name: newItem.name.trim(),
      price: newItem.price,
    }
      )
    }
    setNewItem({name: '',price: ''})
  }


  //Read items from database
  useEffect(() => {
    const q = query(collection(db,'items'))
    const unsubscribe = onSnapshot(q,(QuerySnapshot) =>{
      let itemsArr = []
      QuerySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id:doc.id})
      })
      setItems(itemsArr)


      //Total calc
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  },[])


  //Delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };


  const [total,setTotal] = useState(0)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
        <div className='bg-slate-800 p-4 rounded-lg'>  
          <form className='grid grid-cols-6 items-center text-black'>
            <input className='col-span-3 p-3 rounded-md focus:font-bold focus:placeholder:text-black border focus:outline-none'  type='text' placeholder='Enter Item' value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})}/>
            <input className='col-span-2 p-3 rounded-md focus:font-bold focus:placeholder:text-black mx-2 border focus:outline-none' type='Number' placeholder='Enter Amount' value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})}/>
            <button className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl hover:text-green-300 transition-all' type='submit' onClick={addItem}>+</button>
          </form>
          <ul>
            {items.map((item,id) => (
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between items-center">
                  <span className="capitalize font-bold text-xl">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16 hover:text-red-300 transition-all" onClick={() => deleteItem(item.id)}>X</button>
              </li>
            ))}
          </ul>
          {
            items.length < 1 ? ("") : (
              <div className="flex justify-between p-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            )
            
          }
        </div>
          
      </div>
    </main>
  )
}
