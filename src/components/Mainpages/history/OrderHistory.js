import React, { useContext, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function OrderHistory() {

    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [token] = state.token
    const [isAdmin] = state.userAPI.isAdmin

    useEffect(() => {

        if (token) {
            const getHistory = async() => {

                try {

                    if (isAdmin) {

                        const res = await axios.get('/api/payment', {
                            headers: {Authorization: token}
                        })
        
                        setHistory(res.data.payments)
    
                    } else {
    
                        const res = await axios.get('/user/history', {
                            headers: {Authorization: token}
                        })
        
                        setHistory(res.data)
                    }

                } catch (err) {

                    alert(err)
                    window.location.href = "/"

                }

            }

            getHistory()

        }

    }, [token, isAdmin, setHistory])

    return (
        <div className="history-page">
            <h2>History</h2>

            
                {
                    history.length === 1 ?
                    <h4>You have {history.length} order</h4> :
                    <h4>You have {history.length} orders</h4>
                }
            

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => {
                            return (<tr key={items._id}>
                                <td>{items.paymentId}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
