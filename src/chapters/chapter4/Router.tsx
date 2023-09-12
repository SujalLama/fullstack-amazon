import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import Public from './Public'
import Profile from './Profile'
import Protected from './Protected'

const Router = () => {
    const [current, setCurrent] = useState('home')
    useEffect(() => {
        setRoute()
        window.addEventListener('hashchange', setRoute)
        return () =>  window.removeEventListener('hashchange', setRoute)
    }, [])
    function setRoute() {
        const location = window.location.href.split('/')
        const pathname = location[location.length-1]
        setCurrent(pathname ? pathname : 'home')
} return (
        <BrowserRouter>
        <Nav current={current} />
        <Routes>
            <Route path="/" element={<Public />}/>
            <Route path="/protected" element={<Protected />} />
            <Route path="/profile" element={<Profile />}/>
            <Route element={<Public />}/>
        </Routes>
        </BrowserRouter>
) }

export default Router