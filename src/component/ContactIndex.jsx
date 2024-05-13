import React from 'react'

import { createContext, useEffect, useState } from 'react';
import '../styles/Contact.css';
import List from './List';
import { ReactComponent as Search } from '../assets/search.svg';
import { ReactComponent as Pluss } from "../assets/pluss.svg";
import { ReactComponent as Cancel } from "../assets/cancel.svg";
import cosplay from '../assets/cosplay.png';

import AddContact from './AddContact';

const parentData = createContext();   //creation for context ApI
const getLocalList = () => {              //function to get items from localStorage
  let list = localStorage.getItem('localList');
  console.log(list)
  if (list) {
    return JSON.parse(localStorage.getItem('localList'));
  } else {
    return [];
  }
}
const ContactIndex = () => {
  const [show, setShow] = useState(true);                   // show list or addcontact component form
  const [addchange, setAddchange] = useState(true);         //show add button or done button before and after edit
  const [back, setBack] = useState(true);                   //show plus or add button
  const [defaultImg, setDefaultImg] = useState(true);       //show default add image icon or uploadedpicture
  const [image, setImage] = useState(cosplay);              //store image uploaded 
  const [person, setPerson] = useState();                   //for name
  const [number, setNumber] = useState();                   //for phone number
  const [list, setList] = useState(getLocalList());          //store datas
  const [selectId, setSelectId] = useState();               //store id of selected items in array
  const [search, setSearch] = useState();                      //for search items  


  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setDefaultImg(false);
  }

  useEffect(() => {                      // to set item in local storage
    localStorage.setItem("localList", JSON.stringify(list));
  }, [list])

  const addCircle = () => {            //circel button to redirect to add/edit contact component
    setShow(false);
    setBack(false);
    setAddchange(true);
    setSearch("");
  }
  const backCircle = () => {                      //to cancel the ongoing task either editing or adding 
    setShow(true);
    setBack(true);
    setDefaultImg(true);
    setNumber("");
    setPerson("");
    setSearch("");
  }
  const add = () => {                           //store datas into array
    let id = new Date().toLocaleTimeString();

    if (person && number !== null) {
      setList((olditems) => {
        return [...olditems, { id: id, image: image, person: person, number: number }]
      })

      setShow(true);
      setBack(true);
      setPerson("");
      setNumber("");
      setDefaultImg(true);
      setSearch("");
    } else {
      console.log("name is required");
    }
  }

  const beforeEdit = (index, event) => {        // function to find selcted items 
    setShow(false);
    setAddchange(false);
    setBack(false);
    const findItem = list.find((ele) => {
      return ele.id === index;
    })
    setPerson(findItem.person);
    setNumber(findItem.number);
    setSelectId(findItem.id);
    setImage(findItem.image);
    setSearch("");
  }
  const afterEdit = (event) => {           //after editing array is updated
    setShow(true);
    const updated = list.map((ele) => {
      if (ele.id === selectId) {
        return { ...ele, image: image, person: person, number: number }
      } else {
        return ele;
      }
    })
    setList(updated);
    setBack(true);
    setSearch("");

  }
  const remove = (index) => {
    const updated = list.filter((ele) => {
      return ele.id !== index;
    })
    setList(updated);
  }
  const searchHandle = (event) => {
    setSearch(event.target.value);
  }
  const contextValue = {                //values to be send to child components
    imgDefault: defaultImg,
    image: image,
    person: person,
    number: number,
    setPerson: setPerson,
    setNumber: setNumber,
    add: add,
    list: list,
    handleChange: handleChange,
    beforeEdit: beforeEdit,
    afterEdit: afterEdit,
    addchange: addchange,
    remove: remove,
    search: search

  }
  return (
    <>
      <div className='contact-container'>
        <div className='contact'>
          <parentData.Provider value={contextValue}>             {/* provider tag*/}
            <div className='contact-head'>
              <h2>
                Contact List
              </h2>
              <div className='search-section'>
                <input placeholder='search' className='search'
                  type='text'
                  value={search}
                  onChange={searchHandle}
                ></input>
                <Search style={{ cursor: "pointer" }} className='searchIcon' />
              </div>
            </div>
            {show ?
              <List />
              :
              <AddContact />
            }
            {back ?
              <Pluss className='contact-adder' onClick={addCircle} />
              :
              <Cancel className='contact-back' onClick={backCircle} />
            }
          </parentData.Provider>
        </div>
      </div>
    </>
  )
}
export default ContactIndex;
export { parentData };