import { useEffect, useRef, useState } from "react"
import animateName from "./hooks/useAnimateName"

const App = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const pages = useRef([])
    const { name, isAnimating, erase, write } = animateName({ text: "JOHN THOMAS ALOG", speedMili: 40 })

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentPage(pages.current.indexOf(entry.target))
                }
            })
        }, { threshold: 0.6 })

        pages.current.forEach(page => {
            observer.observe(page)
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        write()
    }, [])

    const scrollTo = (i) => {
        pages.current[i].scrollIntoView({
            behavior: 'smooth'
        })
    }

    const applyStyle = (i) => {
        return currentPage === i ? { color: "#fff" } : null
    }

    const handleAnimateClick = async () => {
        erase().then(() => {
            write()
        })
    }

    return (
        <div className='app'>
            <div className="slider">
                <div className="icons">
                    <i style={applyStyle(0)} onClick={() => scrollTo(0)} className="fa-solid fa-house" />
                    <i style={applyStyle(1)} onClick={() => scrollTo(1)} className="fa-solid fa-address-card" />
                    <i style={applyStyle(2)} onClick={() => scrollTo(2)} className="fa-solid fa-code" />
                    <i style={applyStyle(3)} onClick={() => scrollTo(3)} className="fa-solid fa-layer-group" />
                    <i style={applyStyle(4)} onClick={() => scrollTo(4)} className="fa-solid fa-phone" />
                </div>
            </div>
            <div className="cont-1" ref={e => pages.current[0] = e}>
                <h1>Hi, I am <b onClick={handleAnimateClick}>{name}<span style={!isAnimating ? { animation: "blink 1.2s ease-in-out infinite" } : null}>|</span></b></h1>
                <div>
                    <h2>Welcome to my portfolio</h2>
                    <p>
                        I am a Full  Stack Developer with a passion for creating innovative solutions.
                    </p>
                    <p>
                        I specialize in building responsive and user-friendly web applications using modern technologies.
                    </p>
                    <p>
                        Feel free to reach out if you would like to collaborate!
                    </p>
                </div>
            </div>
            <div className="cont-2" ref={e => pages.current[1] = e}>
                <h1>tae1</h1>
            </div>
            <div className="cont-3" ref={e => pages.current[2] = e}>
                <h1>tae2</h1>
            </div>
            <div className="cont-4" ref={e => pages.current[3] = e}>
                <h1>tae3</h1>
            </div>
            <div className="cont-5" ref={e => pages.current[4] = e}>
                <h1>tae4</h1>
            </div>
        </div>
    )
}

export default App