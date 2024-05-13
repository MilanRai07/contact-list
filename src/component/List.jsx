import React, { useContext } from "react";
import '../styles/list.css';
import { parentData } from "./ContactIndex";
import { ReactComponent as Empty } from '../assets/empty.svg';

const List = () => {
    const context = useContext(parentData);
    const { list, beforeEdit, remove, search } = context;

    const searchFilter = () => {
        if (search) {
            return (list.filter((ele) => ele.person.toLowerCase().includes(search) || ele.number.toLowerCase().includes(search)));
        } else {
            return list;
        }
    }
    return (
        <>
            <div className="list-container">
                {
                    list.length === 0 ?
                        <div className="empty">
                            <Empty className="empty-box" />
                            <h3>You don't have any contact</h3>
                        </div>
                        :
                        searchFilter().map((ele, index) => {
                            const { id, image, person, number } = ele;
                            return (
                                <div className="contact-list" key={index}>
                                    <div className="detail">
                                        <div className="img-container">
                                            <img src={image} alt="" className="image" />

                                        </div>
                                        <div className="detail-info">
                                            <h3 className="name">{person}</h3>
                                            <p className="number">{number}</p>
                                        </div>
                                    </div>
                                    <div className="list-event">
                                        <button className="edit-buton" onClick={() => beforeEdit(id)}>Edit</button>
                                        <button className="del-buton" onClick={() => remove(id)}>Delete</button>
                                    </div>
                                </div>
                            )
                        })

                }
            </div>
        </>
    )
}
export default List;